import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePaymentStore = defineStore('payment', () => {
  const payments = ref([])

  function addPayment(payment) {
    payments.value.push(payment)
  }

  return { payments, addPayment }
})
