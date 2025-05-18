const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const productsRouter = require('./routes/products')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.')
    return sequelize.sync()
  })
  .then(() => {
    app.listen(3001, () => {
      console.log('API rodando em http://localhost:3001/api/products')
    })
  })
  .catch((err) => {
    console.error('Erro ao conectar com o banco de dados:', err)
  })
