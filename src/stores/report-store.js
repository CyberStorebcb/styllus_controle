import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReportStore = defineStore('report', () => {
  const reports = ref([
    { id: 1, name: 'Relatório Mensal' },
    { id: 2, name: 'Relatório de Estoque' },
  ])
  return { reports }
})
