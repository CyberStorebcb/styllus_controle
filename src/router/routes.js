import { defineAsyncComponent } from 'vue'
import LoadingSpinner from 'components/LoadingSpinner.vue'
import ErrorComponent from 'components/ErrorComponent.vue'

const AsyncMainLayout = defineAsyncComponent({
  loader: () => import('layouts/MainLayout.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 10000,
})

const routes = [
  {
    path: '/',
    component: AsyncMainLayout,
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('pages/IndexPage.vue'),
        meta: { title: 'Início' },
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('pages/ProductsPage.vue'),
        meta: { title: 'Produtos' },
      },
      {
        path: 'sales',
        name: 'Sales',
        component: () => import('pages/SalesPage.vue'),
        meta: { title: 'Nova Venda' },
      },
      {
        path: 'sales/history',
        name: 'sales-history',
        component: () => import('pages/SalesHistoryPage.vue'),
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('pages/ReportsPage.vue'),
        meta: { title: 'Relatórios' },
      },
      {
        path: 'investments',
        name: 'Investments',
        component: () => import('pages/InvestmentsPage.vue'),
        meta: { title: 'Investimentos' },
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import('pages/PaymentPage.vue'),
        meta: { title: 'Pagamento' },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { title: 'Erro 404' },
  },
]

export default routes
