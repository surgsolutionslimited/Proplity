// Server-side API route — keeps EPC token out of the browser
import { NextRequest, NextResponse } from 'next/server';
import { getSoldPrices, getMedianPrice, getPriceHistory } from '@/lib/api/landRegistry';
import { getEpcDataServer } from '@/lib/api/epc';
import { lookupPostcode } from '@/lib/api/postcodes';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('postcode');
  if (!query) {
    return NextResponse.json({ error: 'query required' }, { status: 400 });
  }

  try {
    const isPostcode = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i.test(query.trim()) || /^[A-Z]{1,2}[0-9][A-Z0-9]?$/i.test(query.trim());
    
    let details = null;
    if (isPostcode) {
      details = await lookupPostcode(query);
    } else {
      const nomRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&countrycodes=gb&format=json&limit=1`);
      if (nomRes.ok) {
        const nomData = await nomRes.json();
        if (nomData.length > 0) {
          details = {
            postcode: query.toUpperCase(),
            adminDistrict: '',
            region: '',
            latitude: parseFloat(nomData[0].lat),
            longitude: parseFloat(nomData[0].lon),
          };
        }
      }
    }

    const [soldPrices, epcRecords] = await Promise.all([
      getSoldPrices(query),
      isPostcode ? getEpcDataServer(query) : Promise.resolve([]),
    ]);

    const medianPrice = getMedianPrice(soldPrices);
    const priceHistory = getPriceHistory(soldPrices);
    const topEpc = epcRecords[0] ?? null;

    return NextResponse.json({
      postcode: details?.postcode ?? query.toUpperCase(),
      district: details?.adminDistrict ?? '',
      region: details?.region ?? '',
      latitude: details?.latitude ?? null,
      longitude: details?.longitude ?? null,
      medianPrice,
      priceHistory,
      soldTransactions: soldPrices.slice(0, 6).map((t) => ({
        ...t,
        lat: details?.latitude ? details.latitude + (Math.random() - 0.5) * 0.0015 : 51.505,
        lng: details?.longitude ? details.longitude + (Math.random() - 0.5) * 0.0015 : -0.09,
      })),
      epc: topEpc,
    });
  } catch (err) {
    console.error('Property data error:', err);
    return NextResponse.json({ error: 'Failed to fetch property data' }, { status: 500 });
  }
}
