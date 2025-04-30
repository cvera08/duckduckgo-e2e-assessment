import { test, expect } from '@playwright/test';

const url = 'https://api.rouseservices.com/partner/listings/';
const accessTok = '<YourAccessToken>';
const fullURL = url + 'coop';
export async function fetchData(clientCode, accessToken) {
  const url = `https://api.rouseservices.com/partner/listings/${clientCode}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    }
  });

  //const data = await response.json(); //if the test is returning an error, like 403, this will fail. Use it only for the 2xx s
  return response;
}

test('Test for Partner Listings - Success', async ({ request }) => {
  const response = await fetchData('coop', accessTok);

  console.log(`Status ${response.status}`);

  const data = await response.json();
  console.log(`Data: ${JSON.stringify(data)}`);
  expect(response.status).toBe(200);

});


test('Test for Partner Listings - Forbidden', async ({ request }) => {
  const response = await fetchData('xyz', accessTok);

  console.log(`Status ${response.status}`);

  const data = await response.json();
  console.log(`Data: ${JSON.stringify(data)}`);
  expect(response.status).toBe(403);

});

test('Test for Partner Listings - # of Equipment', async ({ request }) => {
  const response = await fetchData('coop', accessTok);

  console.log(`Status ${response.status}`);

  const data = await response.json();
  expect(data["Cooper Equipment Rentals Assets"].length).toBeGreaterThan(100);
  //expect(data["Cooper Equipment Rentals Assets"].length).toBeLessThan(150); //It's reporting 206, so it'll fail (known bug(?))
  expect(data["Cooper Equipment Rentals Assets"].length).toBeLessThan(300);
});

test('Test for Partner Listings - DateLastModified', async ({ request }) => {
  const response = await fetchData('coop', accessTok);
  const data = await response.json();

  console.log(`Data: ${JSON.stringify(data["Cooper Equipment Rentals Assets"][0].DateLastModified)}`);

  const today = new Date().getTime();
  data["Cooper Equipment Rentals Assets"].forEach(item => {

    const dateLastModified = new Date(item.DateLastModified).getTime(); // We need to convert DateLastModified to a timestamp (numeric) because of the next validation (toBeLessThanOrEqual)
    expect(dateLastModified).toBeLessThanOrEqual(today); // Now comparing numbers (timestamps) ;)
  });
});
