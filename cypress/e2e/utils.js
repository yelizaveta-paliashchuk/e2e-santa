// delete the box via API
export const deleteBoxViaApi = (boxId) => {
  return cy
    .request({
      method: 'DELETE',
      headers: {
        Cookie:
          '_ym_uid=1716292751466331321; _ym_d=1716292751; adrcid=AgsBL60Nict60XoIGeSVVgQ; uuid=b2264b2b91830b82%3A1; __upin=tfKrJTBOwGcjNAWRvyWfqg; _buzz_fpc=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjIxYmEzMmIyYmI5NTZmN2JlM2JiM2U2YzhhNGJhYmUwMyUyMiUyQyUyMmJyb3dzZXJWZXJzaW9uJTIyJTNBJTIyMTI1LjAlMjIlMkMlMjJ0c0NyZWF0ZWQlMjIlM0ExNzE2Mjk1Mzc0ODk1JTdEJTJDJTIycGF0aCUyMiUzQSUyMiUyRiUyMiUyQyUyMmRvbWFpbiUyMiUzQSUyMi5zYW50YS1zZWNyZXQucnUlMjIlMkMlMjJleHBpcmVzJTIyJTNBJTIyV2VkJTJDJTIwMjElMjBNYXklMjAyMDI1JTIwMTIlM0E0MiUzQTU1JTIwR01UJTIyJTJDJTIyU2FtZVNpdGUlMjIlM0ElMjJMYXglMjIlN0Q=; _buzz_aidata=JTdCJTIydmFsdWUlMjIlM0ElN0IlMjJ1ZnAlMjIlM0ElMjJ0ZktySlRCT3dHY2pOQVdSdnlXZnFnJTIyJTJDJTIyYnJvd3NlclZlcnNpb24lMjIlM0ElMjIxMjUuMCUyMiUyQyUyMnRzQ3JlYXRlZCUyMiUzQTE3MTYyOTUzNjQxMjMlN0QlMkMlMjJwYXRoJTIyJTNBJTIyJTJGJTIyJTJDJTIyZG9tYWluJTIyJTNBJTIyLnNhbnRhLXNlY3JldC5ydSUyMiUyQyUyMmV4cGlyZXMlMjIlM0ElMjJXZWQlMkMlMjAyMSUyME1heSUyMDIwMjUlMjAxMiUzQTQyJTNBNTUlMjBHTVQlMjIlMkMlMjJTYW1lU2l0ZSUyMiUzQSUyMkxheCUyMiU3RA==; lang=ru; acs_3=%7B%22hash%22%3A%223c8f85edb06b1f745fbd%22%2C%22nextSyncTime%22%3A1716541610587%2C%22syncLog%22%3A%7B%22224%22%3A1716455210587%2C%221228%22%3A1716455210587%2C%221230%22%3A1716455210587%7D%7D; adrdel=1716455210802; jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjY1NTY4MDYsImlhdCI6MTcxNjQ3NTkwNywiZXhwIjoxNzE5MDY3OTA3fQ.QJ44N69vLm1xifa24ndgxYlMsM9qiA9ZeyoFc5n7F1Q; _ym_isad=2; domain_sid=zKpFIUOPG04lonD1zl5aR%3A1716535842958',
      },
      url: `https://santa-secret.ru/api/box/${boxId}`,
    })
    .then((response) => {
      expect(response.status).to.equal(200)
    })
}
