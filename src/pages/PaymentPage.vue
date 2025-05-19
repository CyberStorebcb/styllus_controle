<template>
  <q-page>
    <div class="q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Vendas Registradas</div>
          <div class="q-table-responsive">
            <q-table
              :rows="salesFormatted"
              :columns="columns"
              row-key="id"
              :no-data-label="'Nenhuma venda registrada.'"
              dense
              flat
              bordered
              :rows-per-page-options="[5, 10, 20]"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useSalesStore } from 'src/stores/sales-store'

const salesStore = useSalesStore()
const sales = computed(() => salesStore.sales || [])

// Garante formatação correta do valor e id único
const salesFormatted = computed(() =>
  sales.value.map((row, idx) => ({
    ...row,
    id: row.id ?? idx, // Garante id único mesmo se não existir
    value: Number(row.value) || 0,
  })),
)

const columns = [
  { name: 'item', label: 'Item', field: 'item', align: 'left' },
  { name: 'quantity', label: 'Quantidade', field: 'quantity', align: 'center' },
  {
    name: 'value',
    label: 'Valor (R$)',
    field: (row) => row.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    align: 'center',
  },
  { name: 'method', label: 'Método de Pagamento', field: 'method', align: 'center' },
]
</script>

<style scoped>
.q-table-responsive {
  overflow-x: auto;
}
</style>
