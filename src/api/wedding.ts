export function getWedding() {
  return fetch(
    'https://67ff4bd658f18d7209f0a126.mockapi.io/api/wedding/guests/1',
  ).then((res) => res.json())
}
