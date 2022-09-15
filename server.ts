import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.post('/reportData', (req: any, res: any) => {
  console.log(req.body)
  res.status(200).send('')
})

app.listen(8080, () => {
  console.log('server listen on port 8080...')
})
