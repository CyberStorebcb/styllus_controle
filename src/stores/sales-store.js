import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSalesStore = defineStore('sales', () => {
  const totalSalesValue = ref(0)

  // Exemplo de vendas dos últimos 7 dias (mantenha ou remova conforme uso real)
  function getSalesLast7Days() {
    return [
      { date: 'Seg', value: 0 },
      { date: 'Ter', value: 0 },
      { date: 'Qua', value: 0 },
      { date: 'Qui', value: 0 },
      { date: 'Sex', value: 0 },
      { date: 'Sáb', value: 0 },
      { date: 'Dom', value: 0 },
    ]
  }

  // Produtos começam vazios
  const products = ref([])

  const salesHistoryData = ref([])

  const availableProducts = computed(() => products.value.filter((p) => p.quantity > 0))

  function sellProduct(productId, quantity, price, method) {
    const product = products.value.find((p) => p.id === productId)
    if (!product || product.quantity < quantity) {
      return { success: false, message: 'Produto não encontrado ou estoque insuficiente' }
    }

    product.quantity -= quantity
    salesHistoryData.value.push({
      id: Date.now(),
      name: product.name,
      quantity,
      price,
      total: price * quantity,
      date: new Date().toLocaleDateString('pt-BR'),
      method,
    })
    return { success: true }
  }

  const salesHistory = computed(() => salesHistoryData.value || [])

  return {
    totalSalesValue,
    getSalesLast7Days,
    products,
    availableProducts,
    salesHistory,
    sellProduct,
  }
})
