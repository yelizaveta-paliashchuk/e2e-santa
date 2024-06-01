describe('connect to the test DB', () => {
  it('can connect to the DB', () => {
    cy.task(
      'queryDb',
      'CREATE TABLE Students(StudentID int, FirstName varchar(255), StudentGroup varchar(255), City varchar(255))'
    )
  })

  it('Input entries', () => {
    cy.task(
      'queryDb',
      `INSERT INTO Students (StudentID, FirstName, StudentGroup, City varchar) VALUES 
            (1, "Oxana", "04-2024", "Barcelona"),
            (2, "Lisa", "06-2024", "Prague"),
            (3, "Savannah", "05-2024", "London"),
            (4, "Aurelien", "06-2024", "Paris"),
            (5, "Anthony", "06-2024", "Brugges")`
    ).then((result) => {
      cy.log(JSON.stringify(result))
      expect(result.affectedRows).to.equal(3)
    })
  })
  it('Input entries', () => {
    cy.task(
      'queryDb',
      `SELECT FirstName FROM Students WHERE StudentGroup = "06-2024")`
    ).then((result) => {
      cy.log(JSON.stringify(result))
    })
  })

  it('select', () => {
    cy.task(
      'queryDb',
      `SELECT FirstName FROM Students WHERE City = "Prague"`
    ).then((result) => {
      cy.log(JSON.stringify(result))
      expect(result[0].FirstName).to.equal('Lisa')
    })
  })

  it('can delete the DB', () => {
    cy.task('queryDb', 'DROP TABLE Students')
  })
})
