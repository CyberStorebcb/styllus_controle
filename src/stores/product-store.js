import { defineStore } from 'pinia'
import { Notify } from 'quasar'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [
      { id: 1, name: 'Produto A', quantity: 10 },
      { id: 2, name: 'Produto B', quantity: 5 },
    ],
    salesHistory: JSON.parse(localStorage.getItem('salesHistory')) || [], // Histórico de vendas
  }),

  getters: {
    availableProducts: (state) => state.products.filter((product) => product.quantity > 0),
  },

  actions: {
    sellProduct(productId, quantity, price) {
      const product = this.products.find((p) => p.id === productId)
      if (product && product.quantity >= quantity) {
        product.quantity -= quantity
        const sale = {
          id: Date.now(),
          name: product.name,
          quantity,
          price,
          total: quantity * price,
          date: new Date().toLocaleString(),
        }
        this.salesHistory.push(sale)
        localStorage.setItem('salesHistory', JSON.stringify(this.salesHistory))
        localStorage.setItem('products', JSON.stringify(this.products))
      } else {
        throw new Error('Quantidade insuficiente no estoque.')
      }
    },
    restockProduct(productId, quantity) {
      const product = this.products.find((p) => p.id === productId)
      if (product) {
        product.quantity += quantity
        localStorage.setItem('products', JSON.stringify(this.products))
        Notify.create({
          type: 'positive',
          message: `Produto "${product.name}" reabastecido com sucesso!`,
        })
      }
    },
    addProduct(product) {
      const newId = this.products.length ? Math.max(...this.products.map((p) => p.id)) + 1 : 1
      this.products.push({ id: newId, ...product })
      localStorage.setItem('products', JSON.stringify(this.products))
      Notify.create({
        type: 'positive',
        message: `Produto "${product.name}" adicionado com sucesso!`,
      })
    },
    deleteProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId)
      localStorage.setItem('products', JSON.stringify(this.products))
      Notify.create({
        type: 'positive',
        message: 'Produto excluído com sucesso!',
      })
    },
    loadProducts() {
      this.products = JSON.parse(localStorage.getItem('products')) || []
      this.salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || []
    },
  },
})
