// postcodes.io — free, no API key required

export interface PostcodeSuggestion {
  postcode: string;
  district: string;
  ward: string;
  adminDistrict: string;
  country: string;
  type: 'postcode' | 'area';
  displayName: string;
}

export interface PostcodeDetails extends PostcodeSuggestion {
  latitude: number;
  longitude: number;
  region: string;
  parliamentaryConstituency: string;
}

export async function searchPostcodes(query: string): Promise<PostcodeSuggestion[]> {
  if (!query || query.length < 2) return [];
  const results: PostcodeSuggestion[] = [];

  try {
    // 1. Try postcodes.io for exact/partial postcodes
    const pcRes = await fetch(`https://api.postcodes.io/postcodes?q=${encodeURIComponent(query)}&limit=4`);
    if (pcRes.ok) {
      const pcData = await pcRes.json();
      if (pcData.result) {
        (pcData.result as Array<Record<string, unknown>>).forEach((p) => {
          results.push({
            postcode: p.postcode as string,
            district: (p.admin_district as string) ?? '',
            ward: (p.admin_ward as string) ?? '',
            adminDistrict: (p.admin_district as string) ?? '',
            country: (p.country as string) ?? 'England',
            type: 'postcode',
            displayName: p.postcode as string,
          });
        });
      }
    }

    // 2. Try Nominatim for Areas / Cities
    const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=gb&format=json&addressdetails=1&limit=4`);
    if (nomRes.ok) {
      const nomData = await nomRes.json();
      nomData.forEach((item: any) => {
        // Ensure it's a city/town/village and not a random point
        const address = item.address;
        const name = address.city || address.town || address.village || address.suburb || item.name;
        const county = address.county || address.state_district || '';
        if (name && !results.some(r => r.displayName === name)) {
          results.push({
            postcode: name, // We use the city name as the primary search token for land registry
            district: county,
            ward: '',
            adminDistrict: county,
            country: address.country || 'United Kingdom',
            type: 'area',
            displayName: name,
          });
        }
      });
    }

    return results;
  } catch {
    return results;
  }
}

export async function lookupPostcode(postcode: string): Promise<PostcodeDetails | null> {
  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
    if (!res.ok) return null;
    const data = await res.json();
    const p = data.result;
    if (!p) return null;
    return {
      postcode: p.postcode,
      district: p.admin_district ?? '',
      ward: p.admin_ward ?? '',
      adminDistrict: p.admin_district ?? '',
      country: p.country ?? 'England',
      latitude: p.latitude,
      longitude: p.longitude,
      region: p.region ?? '',
      parliamentaryConstituency: p.parliamentary_constituency ?? '',
    };
  } catch {
    return null;
  }
}
