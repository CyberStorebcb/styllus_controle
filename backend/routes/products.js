const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

// State

// Listar todos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch {
    res.status(500).json({ error: 'Erro ao buscar produtos' })
  }
})

// Adicionar
router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body
    if (!name || quantity == null || isNaN(quantity) || quantity < 0) {
      return res.status(400).json({ error: 'Nome e quantidade válida são obrigatórios' })
    }
    const product = await Product.create({ name, quantity })
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao adicionar produto' })
  }
})

// Editar
router.put('/:id', async (req, res) => {
  const { name, quantity } = req.body
  const product = await Product.findByPk(req.params.id)
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' })
  if (name !== undefined) product.name = name
  if (quantity !== undefined) product.quantity = quantity
  await product.save()
  res.json(product)
})

// Remover
router.delete('/:id', async (req, res) => {
  const product = await Product.findByPk(req.params.id)
  if (!product) return res.status(404).json({ error: 'Produto não encontrado' })
  await product.destroy()
  res.json({ success: true })
})

module.exports = router
