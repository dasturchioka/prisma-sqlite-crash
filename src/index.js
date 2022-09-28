require("dotenv").config()

const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors({origin: "*"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})