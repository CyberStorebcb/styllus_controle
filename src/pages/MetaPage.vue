<template>
  <q-page>
    <div class="q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 custom-font-bold">Metas de Vendas por Mês</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-sm q-mb-md">
            <q-btn
              v-for="(meta, mes) in metasPorMes"
              :key="mes"
              :label="mes"
              color="primary"
              outline
              @click="selecionarMes(mes)"
              :class="{ 'bg-blue-2': mes === mesSelecionado }"
            />
          </div>
          <div v-if="mesSelecionado">
            <div class="text-subtitle1 q-mb-sm">Metas para {{ mesSelecionado }}</div>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-subtitle2">Meta Diária</q-item-label>
                  <q-item-label caption>
                    {{ formatCurrency(metasPorMes[mesSelecionado].diaria) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label class="text-subtitle2">Meta Semanal</q-item-label>
                  <q-item-label caption>
                    {{ formatCurrency(metasPorMes[mesSelecionado].semanal) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item>
                <q-item-section>
                  <q-item-label class="text-subtitle2">Meta Mensal</q-item-label>
                  <q-item-label caption>
                    {{ formatCurrency(metasPorMes[mesSelecionado].mensal) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-else class="text-grey q-mt-md">Selecione um mês para ver as metas.</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const metasPorMes = {
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
}

const mesSelecionado = ref(null)

function selecionarMes(mes) {
  mesSelecionado.value = mes
}

function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>
