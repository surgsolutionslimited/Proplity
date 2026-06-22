import { NextResponse } from 'next/server';

const EPC_API_BASE = 'https://api.get-energy-performance-data.communities.gov.uk/api/domestic/search';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get('postcode');
  
  if (!postcode) {
    return NextResponse.json({ error: 'Postcode is required' }, { status: 400 });
  }

  const token = process.env.EPC_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'Server misconfiguration: EPC_API_TOKEN is missing' }, { status: 500 });
  }

  try {
    const apiParams = new URLSearchParams({
      postcode: postcode.trim().toUpperCase(),
      current_page: '1',
      page_size: '10'
    });

    const res = await fetch(`${EPC_API_BASE}?${apiParams}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      next: { revalidate: 86400 } // cache for 24 hours
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('EPC API Error:', res.status, errorText);
      return NextResponse.json({ error: `EPC API returned status ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('EPC Route Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch EPC data' }, { status: 500 });
  }
}
