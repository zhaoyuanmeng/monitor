import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.post('/reportData', (req, res) => {
  console.log(req.body.length)
  res.status(200).send('')
})

app.listen(8080, () => {
  console.log('server listen on port 8080...')
})
