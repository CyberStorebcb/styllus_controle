const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Sale = require('../models/Sale')

// POST /api/sales - registra uma venda e atualiza o estoque
router.post('/', async (req, res) => {
  try {
    const { productId, quantity, price, paymentMethod } = req.body
    if (!productId || !quantity || quantity <= 0 || !price || !paymentMethod) {
      return res.status(400).json({ error: 'Dados inválidos' })
    }
    const product = await Product.findByPk(productId)
    if (!product) return res.status(404).json({ error: 'Produto não encontrado' })
    if (product.quantity < quantity) {
      return res.status(400).json({ error: 'Estoque insuficiente' })
    }
    // Salva a venda
    await Sale.create({
      productId,
      name: product.name,
      quantity,
      price,
      total: price * quantity,
      method: paymentMethod,
      date: new Date(),
    })
    product.quantity -= quantity
    await product.save()
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao registrar venda' })
  }
})

router.get('/', async (req, res) => {
  try {
    const sales = await Sale.findAll({ order: [['date', 'DESC']] })
    res.json(sales)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao buscar vendas' })
  }
})

module.exports = router
