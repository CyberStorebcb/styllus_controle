const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Sale = require('../models/Sale')
const { Op } = require('sequelize')

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

// Limpar vendas por dia
router.delete('/clear/day', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    await Sale.destroy({
      where: {
        date: {
          [Op.gte]: today,
          [Op.lt]: tomorrow,
        },
      },
    })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao limpar vendas do dia' })
  }
})

// Limpar vendas por semana
router.delete('/clear/week', async (req, res) => {
  try {
    const now = new Date()
    const firstDay = new Date(now.setDate(now.getDate() - now.getDay()))
    firstDay.setHours(0, 0, 0, 0)
    const nextWeek = new Date(firstDay)
    nextWeek.setDate(firstDay.getDate() + 7)
    await Sale.destroy({
      where: {
        date: {
          [Op.gte]: firstDay,
          [Op.lt]: nextWeek,
        },
      },
    })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao limpar vendas da semana' })
  }
})

// Limpar vendas por mês
router.delete('/clear/month', async (req, res) => {
  try {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    await Sale.destroy({
      where: {
        date: {
          [Op.gte]: firstDay,
          [Op.lt]: nextMonth,
        },
      },
    })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erro ao limpar vendas do mês' })
  }
})

module.exports = router
