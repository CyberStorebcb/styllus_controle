<template>
  <q-page>
    <div>
      <!-- Total Investido -->
      <q-card flat bordered class="q-mb-lg investments-card">
        <q-card-section class="row items-center">
          <q-icon name="account_balance_wallet" color="green" size="40px" class="q-mr-md" />
          <div>
            <div class="text-h6 text-weight-bold text-white">Total Investido</div>
            <div class="text-h4 text-green-3 q-mt-xs">R$ {{ totalInvested }}</div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Lista de Investimentos por Mês -->
      <q-card flat bordered class="q-mb-lg investments-card">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md text-white">
            <q-icon name="event" color="primary" class="q-mr-sm" />
            Detalhes por Mês
          </div>
          <q-list>
            <q-item
              v-for="(valor, mes) in investedByMonth"
              :key="mes"
              class="investments-list-item"
            >
              <q-item-section>
                <q-item-label class="text-subtitle1 text-weight-bold text-white">
                  {{ mes }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge color="green-4" align="top" class="q-pa-sm text-subtitle2 text-white">
                  R$ {{ valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                </q-badge>
              </q-item-section>
            </q-item>
            <div
              v-if="Object.keys(investedByMonth).length === 0"
              class="text-center text-grey-4 q-mt-md"
            >
              Nenhum investimento registrado ainda.
            </div>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Botão Investir Agora -->
      <q-card flat bordered class="investments-card">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md text-white">
            <q-icon name="add_circle" color="primary" class="q-mr-sm" />
            Novo Investimento
          </div>
          <q-form @submit.prevent="investNow">
            <div class="row q-col-gutter-md">
              <q-input
                v-model="newInvestment.amount"
                label="Valor (R$)"
                type="number"
                outlined
                dense
                class="col-12 col-md-4"
                :rules="[(val) => val > 0 || 'Valor deve ser maior que zero']"
                color="green-4"
                prefix="R$"
                dark
                label-color="grey-3"
                input-class="text-white"
              />
              <q-input
                v-model="newInvestment.date"
                label="Data do Investimento"
                type="date"
                outlined
                dense
                class="col-12 col-md-4"
                :rules="[(val) => !!val || 'Campo obrigatório']"
                color="primary"
                dark
                label-color="grey-3"
                input-class="text-white"
              />
              <div class="col-12 col-md-4 flex flex-center">
                <q-btn
                  label="Investir Agora"
                  color="primary"
                  type="submit"
                  unelevated
                  icon="trending_up"
                  class="q-mt-sm investments-btn"
                  size="lg"
                  text-color="white"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <!-- Gráfico de Barras -->
      <q-card flat bordered class="q-mb-lg investments-card">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md text-white">
            <q-icon name="bar_chart" color="primary" class="q-mr-sm" />
            Gráfico de Investimentos
          </div>
          <canvas ref="barChart"></canvas>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { Notify } from 'quasar'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const investments = ref([])

const newInvestment = ref({
  amount: 0,
  date: '',
})

function investNow() {
  if (!newInvestment.value.amount || !newInvestment.value.date) {
    Notify.create({ type: 'negative', message: 'Preencha todos os campos corretamente.' })
    return
  }
  investments.value.push({
    amount: Number(newInvestment.value.amount),
    date: newInvestment.value.date,
  })
  Notify.create({ type: 'positive', message: 'Investimento registrado!' })
  newInvestment.value = { amount: 0, date: '' }
  updateBarChart()
}

// Agrupa o valor investido por mês/ano
const investedByMonth = computed(() => {
  const result = {}
  investments.value.forEach((inv) => {
    const date = new Date(inv.date)
    if (isNaN(date)) return
    const mes = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })
    if (!result[mes]) result[mes] = 0
    result[mes] += inv.amount
  })
  return result
})

const totalInvested = computed(() =>
  investments.value
    .reduce((sum, inv) => sum + Number(inv.amount), 0)
    .toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
)

// Gráfico de barras
const barChart = ref(null)
let barChartInstance = null

async function updateBarChart() {
  await nextTick()
  if (!barChart.value) return
  if (barChartInstance) barChartInstance.destroy()
  barChartInstance = new Chart(barChart.value, {
    type: 'bar',
    data: {
      labels: Object.keys(investedByMonth.value),
      datasets: [
        {
          label: 'Valor Investido',
          data: Object.values(investedByMonth.value),
          backgroundColor: '#1976d2',
          borderRadius: 12,
          borderSkipped: false,
          hoverBackgroundColor: '#1565c0',
          barPercentage: 0.6,
          categoryPercentage: 0.6,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
          shadowBlur: 8,
          shadowColor: '#1976d233',
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#374151' } },
        x: { grid: { color: '#374151' } },
      },
    },
  })
}

onMounted(() => {
  updateBarChart()
})

watch(investedByMonth, updateBarChart)
</script>

<style scoped>
.investments-bg {
  background: linear-gradient(135deg, #23272f 0%, #1a1d23 100%);
  min-height: 100vh;
}
.investments-card {
  border-radius: 18px;
  background: #23272f;
  box-shadow: 0 4px 24px 0 rgba(25, 118, 210, 0.1);
  border: 1px solid #33384a;
}
.investments-list-item {
  border-radius: 10px;
  margin-bottom: 6px;
  transition: background 0.2s;
}
.investments-list-item:hover {
  background: #2d3340;
}
.investments-btn {
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  padding: 10px 24px;
}
.text-h6 {
  font-weight: bold;
  margin-bottom: 8px;
}
.text-h4 {
  font-weight: bold;
}
.text-white {
  color: #fff !important;
}
</style>
