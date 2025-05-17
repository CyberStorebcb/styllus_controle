<template>
  <q-page class="reports-bg flex flex-center">
    <div class="report-card q-pa-lg">
      <div class="row items-center justify-between q-mb-md report-header">
        <div class="col-auto flex items-center">
          <q-icon name="bar_chart" size="36px" color="primary" class="q-mr-sm animate-icon" />
          <span class="report-title gradient-title">Relatório de Vendas</span>
        </div>
        <div class="col-auto">
          <q-input
            v-model="selectedDate"
            mask="##/##/####"
            filled
            dense
            class="date-input"
            :rules="['date']"
            :readonly="true"
            :input-style="{ color: '#cfd8dc', fontWeight: 500 }"
          >
            <template #prepend>
              <q-icon name="event" color="primary" />
            </template>
            <template #append>
              <q-btn flat dense round icon="arrow_drop_down" @click="showDate = true" />
            </template>
          </q-input>
          <q-popup-proxy v-model="showDate" transition-show="scale" transition-hide="scale">
            <q-date v-model="selectedDate" mask="DD/MM/YYYY" color="primary" />
          </q-popup-proxy>
        </div>
      </div>
      <q-table
        :rows="filteredSales"
        :columns="columns"
        flat
        square
        hide-bottom
        class="report-table animate-fade-in"
        :rows-per-page-options="[0]"
        :pagination="{ rowsPerPage: 0 }"
      >
        <template #no-data>
          <div class="no-data flex flex-center column q-pa-xl">
            <q-icon name="inventory_2" size="72px" color="grey-7" class="animate-icon" />
            <div class="no-data-text q-mt-md">
              Nenhuma venda registrada<br />no período selecionado
            </div>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup>
import { useProductStore } from 'src/stores/product-store'
import { computed, ref } from 'vue'
import { date } from 'quasar'

const productStore = useProductStore()
const today = date.formatDate(new Date(), 'DD/MM/YYYY')
const selectedDate = ref(today)
const showDate = ref(false)

const salesHistory = computed(() => productStore.salesHistory || [])

const filteredSales = computed(() =>
  salesHistory.value.filter((sale) => sale.date === selectedDate.value),
)

const columns = [
  { name: 'name', label: 'Produto', field: 'name', align: 'left' },
  { name: 'date', label: 'Data', field: 'date', align: 'left' },
]
</script>

<style scoped>
.reports-bg {
  min-height: 100vh;
  background: radial-gradient(ellipse at top left, #23243a 60%, #181926 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInBg 1.2s;
}

@keyframes fadeInBg {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.report-card {
  background: rgba(28, 30, 44, 0.98);
  border-radius: 20px;
  box-shadow: 0 6px 36px 0 #000a;
  max-width: 950px;
  width: 100%;
  margin: 32px 0;
  border: 1.5px solid #23243a;
  animation: fadeInUp 0.8s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.report-header {
  border-bottom: 1px solid #23243a;
  padding-bottom: 18px;
  margin-bottom: 0;
}

.report-title {
  font-size: 2.2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1px;
  margin-left: 2px;
  display: inline-block;
}

.gradient-title {
  background: linear-gradient(90deg, #4caf50, #2196f3, #ff9800);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 3s infinite linear;
  background-size: 200% 200%;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.date-input {
  min-width: 190px;
  background: rgba(36, 40, 56, 0.95);
  border-radius: 12px;
  color: #cfd8dc;
  font-weight: 500;
  box-shadow: 0 2px 8px 0 #23243a33;
  transition: box-shadow 0.2s;
}
.date-input:focus-within {
  box-shadow: 0 4px 16px 0 #2196f355;
}

.report-table {
  background: transparent;
  color: #cfd8dc;
  border-radius: 14px;
  font-size: 1.08rem;
  margin-top: 0;
}

.report-table .q-table__top,
.report-table .q-table__bottom,
.report-table .q-table__separator {
  display: none !important;
}

.report-table thead tr {
  background: transparent;
  color: #b0b8c9;
  font-weight: 600;
  font-size: 1.08rem;
  border-bottom: 1px solid #23243a;
}

.report-table tbody tr {
  background: transparent;
  border-bottom: 1px solid #23243a;
  transition: background 0.2s;
}
.report-table tbody tr:hover {
  background: rgba(33, 150, 243, 0.06);
}

.no-data {
  min-height: 220px;
  color: #7c8596;
  text-align: center;
  opacity: 0.85;
  animation: fadeIn 1s;
}

.no-data-text {
  font-size: 1.25rem;
  font-weight: 400;
  color: #7c8596;
  margin-top: 8px;
  line-height: 1.4;
}

.animate-fade-in {
  animation: fadeIn 1.1s;
}

.animate-icon {
  animation: popIn 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popIn {
  0% {
    transform: scale(0.7) rotate(-10deg);
    opacity: 0;
  }
  70% {
    transform: scale(1.1) rotate(2deg);
    opacity: 1;
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
}
</style>
