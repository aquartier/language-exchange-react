const { GoogleSpreadsheet } = require('google-spreadsheet')

const questions = async (_, res) => {
  const doc = new GoogleSpreadsheet(process.env.SHEET_ID)

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
  })
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows({ offset: 1 })
  const data = rows.map(row => row._rawData)

  res.json(data)
}

module.exports = questions
