import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSalesStore = defineStore('sales', () => {
  const totalSalesValue = ref(12000) // valor inicial fictício

  // Exemplo de vendas dos últimos 7 dias
  function getSalesLast7Days() {
    return [
      { date: 'Seg', value: 10 },
      { date: 'Ter', value: 20 },
      { date: 'Qua', value: 15 },
      { date: 'Qui', value: 30 },
      { date: 'Sex', value: 25 },
      { date: 'Sáb', value: 18 },
      { date: 'Dom', value: 12 },
    ]
  }

  return { totalSalesValue, getSalesLast7Days }
})
