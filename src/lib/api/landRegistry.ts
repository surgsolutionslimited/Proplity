// UK Land Registry Price Paid Data API — free, no API key required
// SPARQL endpoint: https://landregistry.data.gov.uk/landregistry/query

export interface SoldTransaction {
  address: string;
  price: number;
  date: string;
  propertyType: string;
  newBuild: boolean;
  tenure: string;
}

function buildSparqlQuery(postcode: string) {
  // Normalise postcode: uppercase, single space
  const pc = postcode.trim().toUpperCase();
  // Use the postcode district (e.g. "NW1") for broader results if full postcode yields nothing
  return `
PREFIX lrppi: <http://landregistry.data.gov.uk/def/ppi/>
PREFIX lrcommon: <http://landregistry.data.gov.uk/def/common/>
SELECT ?paon ?saon ?street ?town ?postcode ?amount ?date ?propertyType ?newBuild ?tenure WHERE {
  ?transx lrppi:pricePaid ?amount ;
          lrppi:transactionDate ?date ;
          lrppi:propertyType ?propertyType ;
          lrppi:newBuild ?newBuild ;
          lrppi:estateType ?tenure ;
          lrppi:propertyAddress ?addr .
  ?addr lrcommon:postcode "${pc}" ;
        lrcommon:paon ?paon ;
        lrcommon:street ?street .
  OPTIONAL { ?addr lrcommon:saon ?saon }
  OPTIONAL { ?addr lrcommon:town ?town }
}
ORDER BY DESC(?date)
LIMIT 20
`.trim();
}

function buildDistrictQuery(district: string) {
  return `
PREFIX lrppi: <http://landregistry.data.gov.uk/def/ppi/>
PREFIX lrcommon: <http://landregistry.data.gov.uk/def/common/>
SELECT ?paon ?saon ?street ?postcode ?amount ?date ?propertyType ?newBuild ?tenure WHERE {
  ?transx lrppi:pricePaid ?amount ;
          lrppi:transactionDate ?date ;
          lrppi:propertyType ?propertyType ;
          lrppi:newBuild ?newBuild ;
          lrppi:estateType ?tenure ;
          lrppi:propertyAddress ?addr .
  ?addr lrcommon:postcode ?postcode ;
        lrcommon:paon ?paon ;
        lrcommon:street ?street .
  OPTIONAL { ?addr lrcommon:saon ?saon }
  FILTER(STRSTARTS(?postcode, "${district}"))
}
ORDER BY DESC(?date)
LIMIT 20
`.trim();
}

function buildTownQuery(town: string) {
  return `
PREFIX lrppi: <http://landregistry.data.gov.uk/def/ppi/>
PREFIX lrcommon: <http://landregistry.data.gov.uk/def/common/>
SELECT ?paon ?saon ?street ?postcode ?town ?amount ?date ?propertyType ?newBuild ?tenure WHERE {
  ?transx lrppi:pricePaid ?amount ;
          lrppi:transactionDate ?date ;
          lrppi:propertyType ?propertyType ;
          lrppi:newBuild ?newBuild ;
          lrppi:estateType ?tenure ;
          lrppi:propertyAddress ?addr .
  ?addr lrcommon:town "${town.toUpperCase()}" ;
        lrcommon:postcode ?postcode ;
        lrcommon:paon ?paon ;
        lrcommon:street ?street .
  OPTIONAL { ?addr lrcommon:saon ?saon }
}
ORDER BY DESC(?date)
LIMIT 20
`.trim();
}

function parsePropertyType(uri: string): string {
  if (uri.includes('detached')) return 'Detached House';
  if (uri.includes('semi-detached')) return 'Semi-Detached House';
  if (uri.includes('terraced')) return 'Terraced House';
  if (uri.includes('flat')) return 'Flat / Apartment';
  if (uri.includes('otherPropertyType')) return 'Other';
  return 'Property';
}

function parseTenure(uri: string): string {
  if (uri.includes('freehold')) return 'Freehold';
  if (uri.includes('leasehold')) return 'Leasehold';
  return 'Unknown';
}

async function runSparql(sparql: string): Promise<SoldTransaction[]> {
  const url = 'https://landregistry.data.gov.uk/landregistry/query';
  const res = await fetch(`${url}?query=${encodeURIComponent(sparql)}&output=json`, {
    headers: { Accept: 'application/sparql-results+json' },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Land Registry API error: ${res.status}`);
  const data = await res.json();
  const bindings: Array<Record<string, { value: string }>> = data?.results?.bindings ?? [];
  return bindings.map((b) => {
    const paon = b.paon?.value ?? '';
    const saon = b.saon?.value ? `${b.saon.value}, ` : '';
    const street = b.street?.value ?? '';
    const postcode = b.postcode?.value ?? '';
    const address = [saon + paon, street, postcode].filter(Boolean).join(', ');
    return {
      address,
      price: parseInt(b.amount?.value ?? '0', 10),
      date: b.date?.value?.substring(0, 10) ?? '',
      propertyType: parsePropertyType(b.propertyType?.value ?? ''),
      newBuild: b.newBuild?.value === 'true',
      tenure: parseTenure(b.tenure?.value ?? ''),
    };
  });
}

export async function getSoldPrices(query: string): Promise<SoldTransaction[]> {
  try {
    const isPostcode = /^[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}$/i.test(query.trim()) || /^[A-Z]{1,2}[0-9][A-Z0-9]?$/i.test(query.trim());

    if (!isPostcode) {
      // It's a town/city
      return await runSparql(buildTownQuery(query.trim()));
    }

    // Try full postcode
    const results = await runSparql(buildSparqlQuery(query));
    if (results.length > 0) return results;

    // Fall back to district (first part of postcode e.g. "SW1A")
    const district = query.trim().toUpperCase().split(' ')[0];
    return await runSparql(buildDistrictQuery(district));
  } catch {
    return [];
  }
}

export function getMedianPrice(transactions: SoldTransaction[]): number | null {
  if (transactions.length === 0) return null;
  const prices = transactions.map((t) => t.price).sort((a, b) => a - b);
  const mid = Math.floor(prices.length / 2);
  return prices.length % 2 !== 0 ? prices[mid] : Math.round((prices[mid - 1] + prices[mid]) / 2);
}

export function getPriceHistory(transactions: SoldTransaction[]): { month: string; avg: number }[] {
  const byMonth: Record<string, number[]> = {};
  transactions.forEach((t) => {
    const month = t.date.substring(0, 7); // "YYYY-MM"
    if (!byMonth[month]) byMonth[month] = [];
    byMonth[month].push(t.price);
  });
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, prices]) => ({
      month,
      avg: Math.round(prices.reduce((s, p) => s + p, 0) / prices.length),
    }));
}
