<template>
  <q-page>
    <div class="dashboard-container">
      <div class="dashboard-title text-h4 text-center q-mb-lg">
        <q-icon name="dashboard" color="primary" size="36px" class="q-mr-sm" />
        Dashboard Geral
      </div>
      <div class="row justify-end q-mb-md">
        <q-btn
          color="primary"
          icon="refresh"
          label="Atualizar"
          @click="refreshDashboard"
          :loading="loading"
          unelevated
        />
      </div>
      <div class="dashboard-cards q-gutter-md row wrap justify-center">
        <!-- Cards de resumo -->
        <q-card class="dashboard-card col-12 col-sm-6 col-md-3">
          <q-card-section>
            <div class="dashboard-card-title">
              <q-icon name="shopping_cart" color="primary" size="28px" class="q-mr-sm" />
              Produtos
            </div>
            <div class="dashboard-card-value">
              <q-skeleton v-if="loading" type="text" width="60px" />
              <template v-else>{{ productsCount }}</template>
            </div>
            <div class="dashboard-card-desc">
              {{ productsCount === 1 ? 'Cadastrado' : 'Cadastrados' }}
            </div>
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card col-xs-12 col-sm-6 col-md-3">
          <q-card-section>
            <div class="dashboard-card-title">
              <q-icon name="attach_money" color="green" size="28px" class="q-mr-sm" />
              Vendas
            </div>
            <div class="dashboard-card-value">
              R$ {{ totalSales.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </div>
            <div class="dashboard-card-desc">Total Vendido</div>
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card col-xs-12 col-sm-6 col-md-3">
          <q-card-section>
            <div class="dashboard-card-title">
              <q-icon name="bar_chart" color="deep-orange" size="28px" class="q-mr-sm" />
              Relatórios
            </div>
            <div class="dashboard-card-value">{{ reportsCount }}</div>
            <div class="dashboard-card-desc">Gerados</div>
          </q-card-section>
        </q-card>
        <q-card class="dashboard-card col-xs-12 col-sm-6 col-md-3">
          <q-card-section>
            <div class="dashboard-card-title">
              <q-icon name="account_balance_wallet" color="purple" size="28px" class="q-mr-sm" />
              Investimentos
            </div>
            <div class="dashboard-card-value">
              R$ {{ totalInvestments.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
            </div>
            <div class="dashboard-card-desc">Total Investido</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="dashboard-charts row q-mt-xl q-gutter-md">
        <q-card class="dashboard-chart-card col-xs-12 col-md-6">
          <q-card-section>
            <div class="dashboard-chart-title">
              <q-icon name="show_chart" color="primary" size="24px" class="q-mr-sm" />
              Vendas dos Últimos 7 Dias
            </div>
            <canvas ref="salesChart"></canvas>
          </q-card-section>
        </q-card>
        <q-card class="dashboard-chart-card col-xs-12 col-md-6">
          <q-card-section>
            <div class="dashboard-chart-title">
              <q-icon name="pie_chart" color="deep-orange" size="24px" class="q-mr-sm" />
              Distribuição de Produtos
            </div>
            <div v-if="!prodData.length" class="text-grey text-center q-mt-md">
              Nenhum produto cadastrado.
            </div>
            <canvas v-if="prodData.length" ref="productsChart"></canvas>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useProductStore } from 'src/stores/product-store'
import { useReportStore } from 'src/stores/report-store'
import { useInvestmentStore } from 'src/stores/investment-store'
import { useSalesStore } from 'src/stores/sales-store'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
)

const productStore = useProductStore()
const reportStore = useReportStore()
const investmentStore = useInvestmentStore()
const salesStore = useSalesStore()

const productsCount = ref(0)
const reportsCount = ref(0)
const totalInvestments = ref(0)
const totalSales = ref(0)
const loading = ref(true)

const salesChart = ref(null)
let salesChartInstance = null
const productsChart = ref(null)
let productsChartInstance = null

const prodData = ref([])

// Atualiza os dados do dashboard e gráficos
async function refreshDashboard() {
  loading.value = true
  // Aguarda carregamento dos dados das stores, se necessário
  if (productStore.loadProducts) await productStore.loadProducts()
  if (reportStore.loadReports) await reportStore.loadReports()
  if (investmentStore.loadInvestments) await investmentStore.loadInvestments()
  if (salesStore.loadSales) await salesStore.loadSales()

  productsCount.value = productStore.products?.length || 0
  reportsCount.value = reportStore.reports?.length || 0
  totalInvestments.value = investmentStore.totalInvested || 0
  totalSales.value = salesStore.totalSalesValue || 0
  prodData.value = productStore.products?.slice(0, 5) || []
  await renderCharts()
  loading.value = false
}

// Renderiza os gráficos
async function renderCharts() {
  await nextTick()
  if (salesChartInstance) salesChartInstance.destroy()
  if (productsChartInstance) productsChartInstance.destroy()

  try {
    // Gráfico de vendas dos últimos 7 dias
    const salesData = salesStore.getSalesLast7Days?.() || [
      { date: 'Seg', value: 10 },
      { date: 'Ter', value: 20 },
      { date: 'Qua', value: 15 },
      { date: 'Qui', value: 30 },
      { date: 'Sex', value: 25 },
      { date: 'Sáb', value: 18 },
      { date: 'Dom', value: 12 },
    ]
    if (salesChart.value) {
      salesChartInstance = new Chart(salesChart.value, {
        type: 'bar',
        data: {
          labels: salesData.map((d) => d.date),
          datasets: [
            {
              label: 'Vendas',
              data: salesData.map((d) => d.value),
              backgroundColor: '#1976d2',
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      })
    }

    // Gráfico de distribuição de produtos
    if (productsChart.value && prodData.value.length) {
      productsChartInstance = new Chart(productsChart.value, {
        type: 'pie',
        data: {
          labels: prodData.value.map((p) => p.name),
          datasets: [
            {
              data: prodData.value.map((p) => p.quantity),
              backgroundColor: ['#1976d2', '#43a047', '#fb8c00', '#8e24aa', '#e53935'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } },
        },
      })
    }
  } catch (err) {
    console.error('Erro ao renderizar gráficos:', err)
  }
}

// Destroi os gráficos ao sair da página
onUnmounted(() => {
  if (salesChartInstance) salesChartInstance.destroy()
  if (productsChartInstance) productsChartInstance.destroy()
})

// Inicializa o dashboard ao montar
onMounted(async () => {
  await refreshDashboard()
})
</script>

<style scoped>
.dashboard-bg {
  background: #f8fafc;
  min-height: 100vh;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.dashboard-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 0 0 0;
}

.dashboard-title {
  color: #11404c;
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 32px;
  text-shadow: 0 2px 8px #0001;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dashboard-cards {
  margin-bottom: 32px;
}

.dashboard-card {
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  min-width: 220px;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 18px 24px;
}

.dashboard-card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1976d2;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.dashboard-card-value {
  font-size: 2.1rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 2px;
}

.dashboard-card-desc {
  font-size: 1rem;
  color: #6c7a89;
  font-weight: 400;
}

.dashboard-charts {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centraliza os gráficos horizontalmente */
  align-items: flex-start;
  gap: 24px;
}

.dashboard-chart-card {
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  padding: 18px 24px;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza o conteúdo dentro do card */
  justify-content: flex-start;
  margin-left: auto;
  margin-right: auto;
}

.dashboard-chart-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1976d2;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

@media (max-width: 900px) {
  .dashboard-container {
    max-width: 98vw;
    padding: 12px 0 0 0;
  }
  .dashboard-cards {
    flex-direction: column;
    align-items: stretch;
  }
  .dashboard-card {
    min-width: unset;
    width: 100%;
    margin-bottom: 12px;
  }
  .dashboard-charts {
    flex-direction: column;
    align-items: stretch;
  }
  .dashboard-chart-card {
    min-height: 260px;
    width: 100%;
    margin-bottom: 12px;
  }
}
</style>
