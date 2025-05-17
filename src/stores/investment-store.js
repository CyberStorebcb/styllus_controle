import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useInvestmentStore = defineStore('investment', () => {
  const totalInvested = ref(5000) // valor inicial fictício
  // Você pode adicionar mais dados conforme necessário
  return { totalInvested }
})
