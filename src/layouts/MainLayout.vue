<template>
  <q-layout>
    <!-- Cabeçalho estilizado -->
    <q-header elevated class="custom-navbar">
      <div class="navbar-content row items-center justify-between q-px-xl">
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          class="navbar-btn"
          @click="toggleLeftDrawer"
        />
        <div class="row items-center">
          <span class="navbar-logo"> <span class="navbar-logo-bold">Cyber</span> Controle</span>
        </div>
        <div class="row items-center">
          <q-btn
            flat
            round
            icon="dark_mode"
            aria-label="Alternar Tema"
            class="navbar-btn"
            @click="toggleDarkMode"
          />
          <q-btn
            flat
            round
            icon="fullscreen"
            aria-label="Tela cheia"
            class="navbar-btn"
            @click="goFullscreen"
          />
        </div>
      </div>
    </q-header>

    <!-- Menu Lateral com subsessões aprimoradas -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="main-drawer">
      <q-list>
        <q-item-label header class="drawer-header">Menu</q-item-label>
        <template v-for="item in menuItems" :key="item.label">
          <q-expansion-item
            v-if="item.children"
            :label="item.label"
            :icon="item.icon"
            expand-separator
            class="drawer-item drawer-expansion"
            dense
            :default-opened="isRouteActive(item)"
          >
            <q-list>
              <q-item
                v-for="sub in item.children"
                :key="sub.label"
                :to="sub.to"
                clickable
                class="drawer-item drawer-subitem"
                active-class="drawer-item-active"
                exact
              >
                <q-item-section avatar>
                  <q-icon :name="sub.icon" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ sub.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-expansion-item>
          <q-item
            v-else
            clickable
            :to="item.to"
            class="drawer-item"
            active-class="drawer-item-active"
            exact
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

const leftDrawerOpen = ref(false)
const $q = useQuasar()
const route = useRoute()

const isDark = ref(false)

// Restaurar o tema salvo no localStorage ao carregar a página
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    $q.dark.set(isDark.value)
  }
})

// Função para alternar o menu lateral
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Alternar o tema e salvar a preferência no localStorage
function toggleDarkMode() {
  isDark.value = !isDark.value
  $q.dark.set(isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Menu lateral com subsessões
const menuItems = [
  { label: 'Início', icon: 'home', to: '/' },
  { label: 'Produtos', icon: 'shopping_cart', to: '/products' },
  {
    label: 'Vendas',
    icon: 'attach_money',
    to: '/sales',
    children: [
      { label: 'Nova Venda', icon: 'point_of_sale', to: '/sales' },
      { label: 'Histórico de Vendas', icon: 'history', to: '/sales/history' },
    ],
  },
  { label: 'Metas', icon: 'bar_chart', to: '/meta' },
  { label: 'Relatórios', icon: 'bar_chart', to: '/reports' },
  { label: 'Investimentos', icon: 'trending_up', to: '/investments' },
  { label: 'Vendas registradas', icon: 'trending_up', to: '/payment' },
]

// Função para determinar a saudação com base no horário

// Função para manter expansão aberta se rota ativa
function isRouteActive(item) {
  if (!item.children) return false
  return item.children.some((sub) => route.path.startsWith(sub.to))
}

// Função para entrar em tela cheia
function goFullscreen() {
  const el = document.documentElement
  if (el.requestFullscreen) {
    el.requestFullscreen().catch(() => {})
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen()
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen()
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen()
  }
}
</script>

<style scoped>
.custom-navbar {
  background: linear-gradient(90deg, #09c6f9 0%, #045de9 100%);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}
.navbar-content {
  width: 100%;
  min-height: 9;
}
.navbar-logo {
  font-size: 2.7rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
}
.navbar-logo-bold {
  color: #ffd600;
  font-weight: 900;
}
.navbar-link {
  font-size: 1.6rem;
  color: #fff;
  font-weight: 400;
}
.navbar-btn {
  color: #fff;
  font-size: 2.2rem;
  margin-right: 12px;
}

.main-navbar {
  background: linear-gradient(90deg, #1dbbc0 60%, #1734b3 100%);
  box-shadow: 0 4px 18px 0 rgba(25, 118, 210, 0.1);
  position: relative;
  z-index: 10;
  padding-bottom: 0;
}

.navbar-toolbar {
  min-height: 64px;
  padding-left: 12px;
  padding-right: 12px;
  display: flex;
  align-items: center;
}

.navbar-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin-bottom: 0;
  line-height: 1.1;
}

.gradient-text {
  background: linear-gradient(90deg, #d7ec13, #0089fa, #c70938);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 3s infinite linear;
  background-size: 200% 200%;
  display: inline-block;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.animate-navbar-title {
  animation: fadeInDown 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.navbar-greeting {
  font-size: 1rem;
  font-weight: 400;
  color: #e3f2fd;
  margin-top: 2px;
  margin-left: 2px;
  letter-spacing: 0.5px;
  animation: fadeIn 1.2s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.navbar-btn {
  transition:
    background 0.2s,
    box-shadow 0.2s;
}
.navbar-btn:hover {
  background: rgba(33, 150, 243, 0.12);
  box-shadow: 0 2px 8px 0 rgba(33, 150, 243, 0.1);
}

.navbar-underline {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, #4caf50 0%, #2196f3 50%, #ff9800 100%);
  border-radius: 0 0 12px 12px;
  margin-top: -2px;
  animation: underlineIn 1.2s;
}
@keyframes underlineIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 100%;
    opacity: 1;
  }
}

.main-drawer {
  background: linear-gradient(135deg, #e3f0ff 60%, #f4f7fa 100%);
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: 2px 0 12px 0 rgba(33, 150, 243, 0.06);
}

.drawer-header {
  font-family: 'Poppins', sans-serif;
  font-size: 1.1rem;
  color: #1976d2;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.drawer-item {
  border-radius: 8px;
  margin-bottom: 4px;
  transition:
    background 0.2s,
    color 0.2s;
}
.drawer-item:hover {
  background: #6d6edd;
  color: #02070c;
}
.drawer-item-active {
  background: #1976d2 !important;
  color: #fff !important;
}
.drawer-expansion {
  margin-bottom: 2px;
}
.drawer-subitem {
  margin-left: 16px;
  font-size: 1.01rem;
}
</style>
