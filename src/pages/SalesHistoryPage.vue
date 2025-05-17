<template>
  <q-page>
    <div class="q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6 custom-font-bold">Vendas Registradas</div>
        </q-card-section>
        <q-card-section>
          <template v-if="salesHistory.length === 0">
            <div class="text-center q-mt-md text-grey">Nenhuma venda registrada até o momento.</div>
          </template>
          <div v-else>
            <q-timeline color="primary">
              <q-timeline-entry
                v-for="sale in salesHistory"
                :key="sale.id"
                :title="sale.name"
                :subtitle="sale.date"
                icon="shopping_cart"
                class="q-mb-md"
              >
                <div class="row items-center q-gutter-md">
                  <q-badge color="blue" align="top">
                    Quantidade: <span class="q-ml-xs">{{ sale.quantity }}</span>
                  </q-badge>
                  <q-badge color="green" align="top">
                    Unitário: R$ {{ sale.price.toFixed(2) }}
                  </q-badge>
                  <q-badge color="deep-orange" align="top">
                    Total: <b>R$ {{ (sale.total || sale.price * sale.quantity).toFixed(2) }}</b>
                  </q-badge>
                </div>
              </q-timeline-entry>
            </q-timeline>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useProductStore } from 'src/stores/product-store'
import { computed, onMounted } from 'vue'

const productStore = useProductStore()
const salesHistory = computed(() => productStore.salesHistory)

onMounted(() => {
  productStore.loadProducts()
})
</script>

<style scoped>
.custom-font-bold {
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
}
</style>
