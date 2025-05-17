const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
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
        meta: { title: 'Vendas' },
      },
      {
        path: 'sales/history',
        component: () => import('pages/SalesHistoryPage.vue'),
        name: 'sales-history',
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
      {
        path: 'payment-history',
        name: 'PaymentHistory',
        component: () => import('pages/PaymentHistoryPage.vue'),
        meta: { title: 'Histórico de Pagamentos' },
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
