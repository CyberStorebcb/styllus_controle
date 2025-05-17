<template>
  <q-page>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Histórico de Pagamentos</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md">
      <q-card flat bordered class="q-mb-md shadow-2">
        <q-card-section>
          <div class="text-h6">Pagamentos Realizados</div>
        </q-card-section>
        <q-card-section>
          <q-table :rows="payments" :columns="columns" row-key="date" flat bordered dense />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { usePaymentStore } from 'src/stores/payment-store'
import { computed } from 'vue'

const paymentStore = usePaymentStore()
const payments = computed(() => paymentStore.payments)

const columns = [
  { name: 'name', label: 'Nome do Pagador', field: 'name', align: 'left' },
  { name: 'amount', label: 'Valor (R$)', field: 'amount', align: 'center' },
  { name: 'date', label: 'Data', field: 'date', align: 'center' },
]
</script>

<style scoped>
.shadow-2 {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
}
</style>
