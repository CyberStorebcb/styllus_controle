<template>
  <q-page>
    <div class="q-pa-md flex flex-center">
      <q-card
        flat
        bordered
        class="meta-card q-pa-lg animate__animated animate__fadeInUp"
        :class="[$q.dark.isActive ? 'bg-dark text-white' : 'bg-white text-dark']"
      >
        <q-card-section>
          <div class="text-h5 text-primary text-center custom-font-bold q-mb-md">
            <q-icon
              name="flag"
              color="primary"
              size="md"
              class="q-mr-sm animate__animated animate__bounceIn"
            />
            Metas de Vendas por Mês
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-sm q-mb-md justify-center">
            <q-btn
              v-for="(meta, mes) in metasPorMes"
              :key="mes"
              :label="mes"
              color="primary"
              outline
              rounded
              size="md"
              @click="selecionarMes(mes)"
              :class="[
                'meta-mes-btn animate__animated',
                mes === mesSelecionado
                  ? 'bg-blue-2 text-dark dark:bg-blue-10 dark:text-white animate__pulse animate__repeat-2'
                  : 'animate__fadeIn',
              ]"
            />
          </div>
          <transition name="fade-slide" mode="out-in">
            <div
              v-if="mesSelecionado"
              :key="mesSelecionado"
              class="animate__animated animate__fadeIn"
            >
              <div class="text-h6 text-center q-mb-md row items-center justify-center">
                <q-icon name="event" color="primary" size="sm" class="q-mr-xs" />
                Metas para {{ mesSelecionado }}
                <q-btn
                  dense
                  flat
                  icon="edit"
                  color="primary"
                  class="q-ml-sm"
                  @click="abrirEdicaoMeta"
                  size="sm"
                  title="Editar metas"
                  aria-label="Editar metas"
                />
              </div>
              <q-list
                bordered
                class="rounded-borders shadow-1"
                :class="$q.dark.isActive ? 'bg-grey-10 text-white' : 'bg-grey-2 text-dark'"
              >
                <q-item class="animate__animated animate__fadeInLeft">
                  <q-item-section avatar>
                    <q-icon name="today" color="blue-6" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-subtitle2">Meta Diária</q-item-label>
                    <q-item-label caption>
                      {{ formatCurrency(metasPorMes[mesSelecionado].diaria) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item class="animate__animated animate__fadeInLeft animate__delay-1s">
                  <q-item-section avatar>
                    <q-icon name="date_range" color="green-6" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-subtitle2">Meta Semanal</q-item-label>
                    <q-item-label caption>
                      {{ formatCurrency(metasPorMes[mesSelecionado].semanal) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item class="animate__animated animate__fadeInLeft animate__delay-2s">
                  <q-item-section avatar>
                    <q-icon name="calendar_month" color="deep-orange-6" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-subtitle2">Meta Mensal</q-item-label>
                    <q-item-label caption>
                      {{ formatCurrency(metasPorMes[mesSelecionado].mensal) }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
            <div
              v-else
              key="empty"
              class="text-grey q-mt-md text-center animate__animated animate__fadeIn"
            >
              <q-icon name="info" color="grey-5" size="md" class="q-mb-sm" />
              <div>Selecione um mês para ver as metas.</div>
            </div>
          </transition>
        </q-card-section>
      </q-card>
      <!-- Dialog de edição -->
      <q-dialog v-model="dialogEditarMeta">
        <q-card
          style="min-width: 350px"
          class="animate__animated animate__zoomIn"
          :class="[$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-white text-dark']"
        >
          <q-card-section>
            <div class="text-h6 text-primary">Editar Metas de {{ mesSelecionado }}</div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model.number="metaEdicao.diaria"
              label="Meta Diária"
              type="number"
              min="0"
              outlined
              dense
              prefix="R$"
              class="q-mb-sm"
              :rules="[(val) => val >= 0 || 'Valor inválido']"
              :color="$q.dark.isActive ? 'white' : 'primary'"
              :input-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
            />
            <q-input
              v-model.number="metaEdicao.semanal"
              label="Meta Semanal"
              type="number"
              min="0"
              outlined
              dense
              prefix="R$"
              class="q-mb-sm"
              :rules="[(val) => val >= 0 || 'Valor inválido']"
              :color="$q.dark.isActive ? 'white' : 'primary'"
              :input-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
            />
            <q-input
              v-model.number="metaEdicao.mensal"
              label="Meta Mensal"
              type="number"
              min="0"
              outlined
              dense
              prefix="R$"
              :rules="[(val) => val >= 0 || 'Valor inválido']"
              :color="$q.dark.isActive ? 'white' : 'primary'"
              :input-class="$q.dark.isActive ? 'text-white' : 'text-dark'"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn flat label="Salvar" color="primary" @click="salvarMeta" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const metasPorMes = reactive({
  Janeiro: { diaria: 500, semanal: 3000, mensal: 12000 },
  Fevereiro: { diaria: 550, semanal: 3300, mensal: 11000 },
  Março: { diaria: 600, semanal: 3500, mensal: 13000 },
  Abril: { diaria: 650, semanal: 3700, mensal: 14000 },
  Maio: { diaria: 700, semanal: 4000, mensal: 15000 },
  Junho: { diaria: 750, semanal: 4200, mensal: 16000 },
  Julho: { diaria: 800, semanal: 4500, mensal: 17000 },
  Agosto: { diaria: 850, semanal: 4700, mensal: 18000 },
  Setembro: { diaria: 900, semanal: 5000, mensal: 19000 },
  Outubro: { diaria: 950, semanal: 5200, mensal: 20000 },
  Novembro: { diaria: 1000, semanal: 5500, mensal: 21000 },
  Dezembro: { diaria: 1200, semanal: 6000, mensal: 25000 },
})

const mesSelecionado = ref(null)
const dialogEditarMeta = ref(false)
const metaEdicao = reactive({ diaria: 0, semanal: 0, mensal: 0 })

function selecionarMes(mes) {
  mesSelecionado.value = mes
}

function abrirEdicaoMeta() {
  if (mesSelecionado.value) {
    Object.assign(metaEdicao, metasPorMes[mesSelecionado.value])
    dialogEditarMeta.value = true
  }
}

function salvarMeta() {
  if (mesSelecionado.value) {
    metasPorMes[mesSelecionado.value] = { ...metaEdicao }
    dialogEditarMeta.value = false
  }
}

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<style scoped>
.meta-card {
  max-width: 500px;
  width: 100%;
  border-radius: 18px;
  background: linear-gradient(135deg, #e3f2fd 0%, #fff 100%);
  box-shadow: 0 4px 24px 0 rgba(33, 150, 243, 0.08);
}
.meta-mes-btn {
  min-width: 90px;
  font-weight: 600;
  letter-spacing: 1px;
  transition: box-shadow 0.2s;
}
.meta-mes-btn.bg-blue-2,
.meta-mes-btn.dark\:bg-blue-10 {
  box-shadow: 0 2px 8px 0 rgba(33, 150, 243, 0.18);
}
.rounded-borders {
  border-radius: 12px;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
.bg-dark {
  background: #181818 !important;
}
.text-white {
  color: #fff !important;
}
.text-dark {
  color: #222 !important;
}
.bg-grey-10 {
  background: #222 !important;
}
.bg-grey-2 {
  background: #f5f5f5 !important;
}
</style>

<!--
Para animações, utilize animate.css:
npm install animate.css
e importe em seu main.js: import 'animate.css';
-->
