export interface GeoData {
  ip: string;
  location: {
    city: string;
    region: string;
    postalCode: string;
    timezone: string;
    lat: number;
    lng: number;
  };
  isp: string;
}

// ip-api.com — free, no API key, no signup, 45 req/min
// Note: free tier only supports HTTP (not HTTPS)
const BASE_URL = "http://ip-api.com/json";

export async function fetchGeoData(query?: string): Promise<GeoData> {
  const target = query?.trim() || "";
  const url = `${BASE_URL}/${encodeURIComponent(target)}?fields=query,city,regionName,zip,timezone,isp,lat,lon,status,message`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Network error (${res.status})`);
  }

  const data = await res.json();

  if (data.status === "fail") {
    throw new Error(data.message || "Invalid query");
  }

  // timezone comes as "America/New_York" — convert to UTC offset
  const utcOffset = getUtcOffset(data.timezone);

  return {
    ip: data.query,
    location: {
      city: data.city,
      region: data.regionName,
      postalCode: data.zip,
      timezone: utcOffset,
      lat: data.lat,
      lng: data.lon,
    },
    isp: data.isp,
  };
}

function getUtcOffset(timezoneName: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezoneName,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(now);
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    if (tzPart) {
      // Converts "GMT-5" to "-05:00"
      const match = tzPart.value.match(/GMT([+-]?)(\d+)?(?::(\d+))?/);
      if (match) {
        const sign = match[1] || "+";
        const hours = (match[2] || "0").padStart(2, "0");
        const minutes = (match[3] || "0").padStart(2, "0");
        return `${sign}${hours}:${minutes}`;
      }
    }
  } catch {
    // fall through
  }
  return timezoneName;
}
