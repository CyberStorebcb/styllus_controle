import { defineStore } from 'pinia'
import axios from 'axios'
import { Notify } from 'quasar'

const API_URL = 'http://localhost:3001/api/products'

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
  }),

  actions: {
    async loadProducts() {
      try {
        const { data } = await axios.get(API_URL)
        this.products = data
      } catch {
        Notify.create({ type: 'negative', message: 'Erro ao carregar produtos.' })
      }
    },
    async addProduct(product) {
      try {
        await axios.post(API_URL, product)
        await this.loadProducts()
        Notify.create({ type: 'positive', message: `Produto "${product.name}" adicionado!` })
      } catch {
        Notify.create({ type: 'negative', message: 'Erro ao adicionar produto.' })
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`${API_URL}/${productId}`)
        await this.loadProducts()
        Notify.create({ type: 'positive', message: 'Produto excluído com sucesso!' })
      } catch {
        Notify.create({ type: 'negative', message: 'Erro ao excluir produto.' })
      }
    },
    async restockProduct(productId, quantity) {
      try {
        const product = this.products.find((p) => p.id === productId)
        if (!product) {
          Notify.create({ type: 'negative', message: 'Produto não encontrado.' })
          return
        }
        await axios.put(`${API_URL}/${productId}`, {
          quantity: product.quantity + quantity,
        })
        await this.loadProducts()
        Notify.create({ type: 'positive', message: `Produto "${product.name}" reabastecido!` })
      } catch {
        Notify.create({ type: 'negative', message: 'Erro ao reabastecer produto.' })
      }
    },
  },
})
