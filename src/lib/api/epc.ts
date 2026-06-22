// EPC (Energy Performance Certificate) API — requires bearer token
// Docs: https://epc.opendatacommunities.org/docs/api/domestic

export interface EpcRecord {
  address: string;
  postcode: string;
  propertyType: string;
  builtForm: string;
  floorArea: number | null;
  bedrooms: number | null;
  energyRating: string;
  energyScore: number | null;
  tenure: string;
  inspectionDate: string;
  lodgementDate: string;
}

const EPC_API_BASE = 'https://api.get-energy-performance-data.communities.gov.uk/api/domestic/search';

export async function getEpcDataClient(postcode: string): Promise<EpcRecord[]> {
  try {
    const params = new URLSearchParams({ postcode: postcode.trim().toUpperCase() });
    
    // Call the local Next.js proxy route
    const res = await fetch(`/api/epc/search?${params}`);

    if (!res.ok) {
      console.error('EPC Proxy Error:', res.status, await res.text());
      return [];
    }

    const json = await res.json();
    const rows: Array<Record<string, any>> = json?.data ?? [];

    return rows.map((r) => ({
      address: [r['addressLine1'], r['addressLine2'], r['addressLine3']].filter(Boolean).join(', ') || r['address'] || '',
      postcode: r['postcode'] ?? postcode,
      propertyType: r['propertyType'] ?? '',
      builtForm: r['builtForm'] ?? '',
      floorArea: r['totalFloorArea'] ? parseFloat(r['totalFloorArea']) : null,
      bedrooms: r['numberHabitableRooms'] ? Math.max(0, parseInt(r['numberHabitableRooms'], 10) - 1) : null,
      energyRating: r['currentEnergyEfficiencyBand'] ?? r['currentEnergyRating'] ?? '',
      energyScore: r['currentEnergyEfficiency'] ? parseInt(r['currentEnergyEfficiency'], 10) : null,
      tenure: r['tenure'] ?? '',
      inspectionDate: r['inspectionDate'] ?? '',
      lodgementDate: r['registrationDate'] ?? r['lodgementDate'] ?? '',
    }));
  } catch (err) {
    console.error('EPC client fetch error:', err);
    return [];
  }
}

export async function getEpcDataServer(postcode: string): Promise<EpcRecord[]> {
  const token = process.env.EPC_API_TOKEN;
  if (!token) {
    console.warn('EPC_API_TOKEN not set');
    return [];
  }

  try {
    const params = new URLSearchParams({
      postcode: postcode.trim().toUpperCase(),
      current_page: '1',
      page_size: '10'
    });

    const res = await fetch(`${EPC_API_BASE}?${params}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      next: { revalidate: 86400 } // cache 24 hours
    });

    if (!res.ok) {
      console.error('EPC Server API error:', res.status, await res.text());
      return [];
    }

    const json = await res.json();
    const rows: Array<Record<string, any>> = json?.data ?? [];

    return rows.map((r) => ({
      address: [r['addressLine1'], r['addressLine2'], r['addressLine3']].filter(Boolean).join(', ') || r['address'] || '',
      postcode: r['postcode'] ?? postcode,
      propertyType: r['propertyType'] ?? '',
      builtForm: r['builtForm'] ?? '',
      floorArea: r['totalFloorArea'] ? parseFloat(r['totalFloorArea']) : null,
      bedrooms: r['numberHabitableRooms'] ? Math.max(0, parseInt(r['numberHabitableRooms'], 10) - 1) : null,
      energyRating: r['currentEnergyEfficiencyBand'] ?? r['currentEnergyRating'] ?? '',
      energyScore: r['currentEnergyEfficiency'] ? parseInt(r['currentEnergyEfficiency'], 10) : null,
      tenure: r['tenure'] ?? '',
      inspectionDate: r['inspectionDate'] ?? '',
      lodgementDate: r['registrationDate'] ?? r['lodgementDate'] ?? '',
    }));
  } catch (err) {
    console.error('EPC server fetch error:', err);
    return [];
  }
}

