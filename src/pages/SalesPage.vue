<template>
  <q-page class="sales-bg flex flex-center">
    <div class="sales-container">
      <div class="sales-title q-mb-lg">HISTÓRICO DE VENDAS</div>
      <q-card flat bordered class="sales-card shadow-2">
        <q-card-section>
          <div class="sales-section-title q-mb-md">Produtos Disponíveis para Venda</div>
          <q-list v-if="products.length > 0" class="q-pa-none">
            <q-item
              v-for="product in products"
              :key="product.id"
              class="sales-item"
              :disable="product.quantity === 0"
            >
              <q-item-section avatar>
                <div class="sales-avatar">
                  <q-icon name="radio" color="white" size="32px" />
                </div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="custom-font-bold sales-product-name">
                  {{ product.name }}
                </q-item-label>
                <q-item-label caption class="custom-font-light sales-qty">
                  Quantidade: {{ product.quantity }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  icon="shopping_cart"
                  label="VENDER"
                  color="primary"
                  unelevated
                  class="sales-btn"
                  @click="sell(product.id)"
                  :disable="product.quantity === 0"
                  no-caps
                />
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else class="text-center q-mt-md">
            <q-icon name="info" size="lg" color="grey-6" />
            <p class="custom-font-light text-grey">Nenhum produto disponível para venda.</p>
          </div>
        </q-card-section>
        <q-separator spaced />
        <q-card-actions align="center">
          <q-btn
            color="secondary"
            icon="history"
            label="Ver Histórico de Vendas"
            class="go-history-btn"
            @click="goToHistory"
            no-caps
            unelevated
          />
        </q-card-actions>
      </q-card>
      <q-card flat bordered class="sales-card shadow-2 q-mt-xl">
        <q-card-section>
          <div class="sales-section-title q-mb-md">Histórico de Vendas Realizadas</div>
          <q-list v-if="salesHistory.length > 0" class="q-pa-none">
            <q-item v-for="sale in salesHistory" :key="sale.id" class="sales-item">
              <q-item-section avatar>
                <div class="sales-avatar sales-avatar-history">
                  <q-icon name="check_circle" color="white" size="28px" />
                </div>
              </q-item-section>
              <q-item-section>
                <q-item-label class="custom-font-bold sales-product-name">
                  {{ sale.name }}
                </q-item-label>
                <q-item-label caption class="custom-font-light sales-qty">
                  Quantidade: {{ sale.quantity }} | Valor: R$ {{ sale.price.toFixed(2) }} | Data:
                  {{ sale.date }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else class="text-center q-mt-md">
            <q-icon name="history" size="lg" color="grey-6" />
            <p class="custom-font-light text-grey">Nenhuma venda realizada ainda.</p>
          </div>
          <div class="text-right q-mt-md q-mb-sm text-weight-bold">
            Total vendido: R$ {{ totalSold }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useProductStore } from 'src/stores/product-store'
import { computed } from 'vue'
import { Notify, Dialog } from 'quasar'
import { useRouter } from 'vue-router'

const router = useRouter()
const productStore = useProductStore()
const products = computed(() => productStore.availableProducts)
const salesHistory = computed(() => productStore.salesHistory || [])
const totalSold = computed(() =>
  salesHistory.value
    .reduce((sum, sale) => sum + (sale.total || sale.quantity * sale.price), 0)
    .toFixed(2),
)

function sell(productId) {
  const product = productStore.products.find((p) => p.id === productId)
  if (!product) {
    Notify.create({
      type: 'negative',
      message: 'Produto não encontrado.',
    })
    return
  }

  Dialog.create({
    title: 'Vender Produto',
    message: `Informe a quantidade e o preço unitário para vender o produto "${product.name}":`,
    prompt: {
      model: '',
      type: 'number',
      isValid: (val) => val > 0 && val <= product.quantity,
      label: 'Quantidade',
      placeholder: `Máximo: ${product.quantity}`,
    },
    cancel: true,
    persistent: true,
  })
    .onOk((quantity) => {
      const parsedQuantity = parseInt(quantity, 10)
      if (isNaN(parsedQuantity) || parsedQuantity <= 0 || parsedQuantity > product.quantity) {
        Notify.create({
          type: 'negative',
          message: 'Quantidade inválida.',
        })
        return
      }

      Dialog.create({
        title: 'Preço Unitário',
        message: `Informe o preço unitário do produto "${product.name}":`,
        prompt: {
          model: '',
          type: 'number',
          isValid: (val) => val > 0,
          label: 'Preço Unitário',
          placeholder: 'Digite o preço unitário',
        },
        cancel: true,
        persistent: true,
      })
        .onOk((price) => {
          const parsedPrice = parseFloat(price)
          if (isNaN(parsedPrice) || parsedPrice <= 0) {
            Notify.create({
              type: 'negative',
              message: 'Preço inválido.',
            })
            return
          }
          productStore.sellProduct(productId, parsedQuantity, parsedPrice)
          Notify.create({
            type: 'positive',
            message: `Venda registrada com sucesso!`,
          })
        })
        .onCancel(() => {
          Notify.create({
            type: 'info',
            message: 'Venda cancelada.',
          })
        })
    })
    .onCancel(() => {
      Notify.create({
        type: 'info',
        message: 'Venda cancelada.',
      })
    })
}

function goToHistory() {
  // Altere o caminho '/historico-vendas' para a rota real do seu histórico, se necessário
  router.push({ name: 'sales-history' })
}
</script>

<style scoped>
.sales-bg {
  background: #f8fafc;
  min-height: 100vh;
  padding: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.sales-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 0 0 0;
}

.sales-title {
  color: #11404c;
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
  font-size: 2.3rem;
  text-align: center;
  margin-bottom: 32px;
  text-shadow: 0 2px 8px #0001;
  text-transform: uppercase;
}

.sales-section-title {
  font-size: 1.35rem;
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 600;
  color: #222;
  text-align: center;
  margin-bottom: 18px;
}

.sales-card {
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.08);
  padding: 0;
  border: 1.5px solid #f0f4f8;
}

.sales-item {
  background: transparent;
  border-radius: 14px;
  margin-bottom: 0;
  padding: 0 0.5rem;
  min-height: 84px;
  display: flex;
  align-items: center;
  transition: background 0.18s;
}
.sales-item:hover {
  background: #f0f4fa;
}

.sales-avatar {
  background: #1976d2;
  border-radius: 12px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sales-avatar-history {
  background: #43a047;
}

.sales-product-name {
  font-size: 1.18rem;
  color: #222;
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 600;
}

.sales-qty {
  color: #6c7a89;
  font-size: 1rem;
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 400;
}

.sales-btn {
  background: #1976d2;
  color: #fff;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  padding: 0 22px;
  min-width: 120px;
  transition:
    background 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 2px 8px 0 #1976d222;
  letter-spacing: 1px;
}
.sales-btn:hover:not(:disabled) {
  background: #1256a3;
  box-shadow: 0 4px 16px 0 #1976d244;
}

.go-history-btn {
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  padding: 0 18px;
  min-width: 200px;
  margin-top: 8px;
  background: #f5f7fa;
  color: #1976d2;
  transition:
    background 0.2s,
    color 0.2s;
}
.go-history-btn:hover {
  background: #1976d2;
  color: #fff;
}

@media (max-width: 600px) {
  .sales-container {
    padding: 12px 0 0 0;
    max-width: 98vw;
  }
  .sales-card {
    border-radius: 8px;
  }
  .sales-item {
    border-radius: 8px;
    min-height: 70px;
    padding: 0 0.2rem;
  }
  .sales-avatar,
  .sales-avatar-history {
    width: 40px;
    height: 40px;
    border-radius: 8px;
  }
  .sales-btn,
  .go-history-btn {
    min-width: 80px;
    font-size: 0.95rem;
    padding: 0 8px;
  }
}
</style>
