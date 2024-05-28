const Cookie = require('./cookies.json')
// delete the box via API
export const deleteBoxViaApi = (boxId) => {
  return cy
    .request({
      method: 'DELETE',
      headers: {
        Cookie: Cookie,
      },
      url: `/api/box/${boxId}`,
    })
    .then((response) => {
      expect(response.status).to.equal(200)
    })
}
