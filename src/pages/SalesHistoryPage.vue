<template>
  <q-page>
    <div class="q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 custom-font-bold">Vendas Registradas</div>
        </q-card-section>
        <q-card-section>
          <template v-if="loading">
            <div class="text-center q-mt-md text-grey">Carregando vendas...</div>
          </template>
          <template v-else-if="!salesHistory.length">
            <div class="text-center q-mt-md text-grey">Nenhuma venda registrada até o momento.</div>
          </template>
          <div v-else>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="sale in salesHistory"
                :key="sale.id"
                :title="sale.name"
                :subtitle="sale.date"
                icon="shopping_cart"
                class="q-mb-md"
              >
                <div class="row items-center q-gutter-md">
                  <q-badge color="blue" align="top">
                    Quantidade: <span class="q-ml-xs">{{ sale.quantity }}</span>
                  </q-badge>
                  <q-badge color="green" align="top">
                    Unitário: {{ formatCurrency(sale.price) }}
                  </q-badge>
                  <q-badge color="deep-orange" align="top">
                    Total: <b>{{ formatCurrency(sale.total ?? sale.price * sale.quantity) }}</b>
                  </q-badge>
                  <q-badge v-if="sale.method" color="grey-8" align="top">
                    {{ sale.method }}
                  </q-badge>
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const salesHistory = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/sales')
    salesHistory.value = response.data
  } catch {
    salesHistory.value = []
  }
  loading.value = false
})

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<style scoped>
.custom-font-bold {
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
}
.q-badge {
  font-size: 1rem;
}
</style>
