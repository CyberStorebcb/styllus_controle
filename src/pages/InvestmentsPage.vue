<template>
  <q-page class="investments-bg">
    <div class="investments-wrapper">
      <!-- Total Investido -->
      <q-card flat bordered class="investments-card q-mb-lg" :class="darkClass">
        <q-card-section class="row items-center">
          <q-icon name="account_balance_wallet" color="green" size="40px" class="q-mr-md" />
          <div>
            <div class="text-h6 text-weight-bold" :class="textClass">Total Investido</div>
            <div class="text-h4 text-green-3 q-mt-xs">
              R$ {{ totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Lista de Investimentos por Mês -->
      <q-card flat bordered class="investments-card q-mb-lg" :class="darkClass">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md" :class="textClass">
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
                <q-item-label class="text-subtitle1 text-weight-bold" :class="textClass">
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
      <q-card flat bordered class="investments-card q-mb-lg" :class="darkClass">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md" :class="textClass">
            <q-icon name="add_circle" color="primary" class="q-mr-sm" />
            Novo Investimento
          </div>
          <q-form @submit.prevent="investNow" class="q-gutter-md">
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
                :dark="isDark"
                label-color="grey-3"
                :input-class="textClass"
                @focus="inputFocus = true"
                @blur="inputFocus = false"
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
                :dark="isDark"
                label-color="grey-3"
                :input-class="textClass"
                @focus="inputFocus = true"
                @blur="inputFocus = false"
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
                  :loading="loading"
                  :disable="!canSubmit"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <!-- Gráfico de Barras -->
      <q-card flat bordered class="investments-card q-mb-lg" :class="darkClass">
        <q-card-section>
          <div class="text-h6 text-weight-bold q-mb-md" :class="textClass">
            <q-icon name="bar_chart" color="primary" class="q-mr-sm" />
            Gráfico de Investimentos
          </div>
          <div class="chart-container">
            <canvas ref="barChart"></canvas>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { Notify, Dark } from 'quasar'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

const inputFocus = ref(false)
const loading = ref(false)

const valueOnBarPlugin = {
  id: 'valueOnBar',
  afterDatasetsDraw(chart) {
    const { ctx } = chart
    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i)
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index]
        ctx.save()
        ctx.font = 'bold 15px sans-serif'
        ctx.fillStyle = chart.options.scales.y.ticks.color
        ctx.textAlign = 'center'
        ctx.shadowColor = chart.options.scales.y.ticks.color === '#222' ? '#fff' : '#222'
        ctx.shadowBlur = 4
        ctx.fillText(
          `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          bar.x,
          bar.y - 12,
        )
        ctx.restore()
      })
    })
  },
}

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const investments = ref([])

const newInvestment = ref({
  amount: 0,
  date: '',
})

const isDark = computed(() => Dark.isActive)
const darkClass = computed(() => (isDark.value ? 'bg-dark' : 'bg-light'))
const textClass = computed(() => (isDark.value ? 'text-white' : 'text-dark'))

const canSubmit = computed(
  () => newInvestment.value.amount > 0 && !!newInvestment.value.date && !loading.value,
)

function notify(type, message) {
  Notify.create({ type, message })
}

async function investNow() {
  if (!canSubmit.value) return
  loading.value = true
  setTimeout(() => {
    investments.value.push({
      amount: Number(newInvestment.value.amount),
      date: newInvestment.value.date,
    })
    notify('positive', 'Investimento registrado!')
    newInvestment.value = { amount: 0, date: '' }
    loading.value = false
  }, 800)
}

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
  investments.value.reduce((sum, inv) => sum + Number(inv.amount), 0),
)

const barChart = ref(null)
let barChartInstance = null

function getChartColors() {
  if (isDark.value) {
    return {
      gradientStart: '#43e97b',
      gradientEnd: '#1976d2',
      tickColor: '#fff',
      gridColor: 'rgba(255,255,255,0.15)',
      borderColor: '#fff',
      hoverColor: '#43e97b',
    }
  } else {
    return {
      gradientStart: '#1976d2',
      gradientEnd: '#43e97b',
      tickColor: '#222',
      gridColor: 'rgba(0,0,0,0.08)',
      borderColor: '#1976d2',
      hoverColor: '#1565c0',
    }
  }
}

async function updateBarChart() {
  await nextTick()
  if (!barChart.value) return
  if (barChartInstance) barChartInstance.destroy()
  if (Object.keys(investedByMonth.value).length === 0) return

  const ctx = barChart.value.getContext('2d')
  const { gradientStart, gradientEnd, tickColor, gridColor, borderColor, hoverColor } =
    getChartColors()
  const gradient = ctx.createLinearGradient(0, 0, 0, 340)
  gradient.addColorStop(0, gradientStart)
  gradient.addColorStop(1, gradientEnd)

  barChartInstance = new Chart(barChart.value, {
    type: 'bar',
    data: {
      labels: Object.keys(investedByMonth.value),
      datasets: [
        {
          label: 'Valor Investido',
          data: Object.values(investedByMonth.value),
          backgroundColor: gradient,
          borderRadius: 14,
          borderWidth: 2,
          borderColor,
          hoverBackgroundColor: hoverColor,
          barPercentage: 0.55,
          categoryPercentage: 0.55,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 900, easing: 'easeOutBounce' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark.value ? '#23272f' : '#fff',
          titleColor: isDark.value ? '#fff' : '#222',
          bodyColor: isDark.value ? '#fff' : '#222',
          borderColor,
          borderWidth: 1,
          callbacks: {
            label: (ctx) =>
              `R$ ${Number(ctx.parsed.y).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          },
        },
        valueOnBar: valueOnBarPlugin,
      },
      scales: {
        x: {
          ticks: {
            color: tickColor,
            font: { size: 16, weight: 'bold' },
          },
          grid: {
            color: gridColor,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: tickColor,
            font: { size: 16, weight: 'bold' },
            callback: (value) =>
              `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`,
          },
          grid: {
            color: gridColor,
          },
        },
      },
    },
    plugins: [valueOnBarPlugin],
  })
}
watch([investments, isDark], updateBarChart, { deep: true })
onMounted(updateBarChart)
onUnmounted(() => {
  if (barChartInstance) barChartInstance.destroy()
})
</script>

<style scoped>
.investments-bg {
  min-height: 100vh;
  background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
  padding: 32px 0;
}
.bg-dark {
  background: #23272f !important;
}
.bg-light {
  background: #fff !important;
}
.text-dark {
  color: #23272f !important;
}
.investments-wrapper {
  max-width: 900px;
  margin: auto;
  padding: 0 12px;
}
.investments-card {
  border-radius: 18px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition:
    background 0.3s,
    box-shadow 0.3s;
  margin-bottom: 24px;
}
.investments-list-item {
  transition: background 0.2s;
}
.investments-list-item:hover {
  background: rgba(33, 150, 243, 0.06);
}
.investments-btn {
  min-width: 180px;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: box-shadow 0.2s;
}
.investments-btn:active {
  box-shadow: 0 2px 12px 0 #43e97b55;
}
.chart-container {
  width: 100%;
  min-height: 340px;
  max-width: 700px;
  margin: auto;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 16px;
  box-shadow: 0 2px 12px 0 rgba(33, 150, 243, 0.08);
  padding: 12px 0 0 0;
}
.q-input:focus-within {
  border-color: #1976d2 !important;
  box-shadow: 0 0 0 2px #1976d233;
}
</style>
