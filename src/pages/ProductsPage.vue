<template>
  <q-page>
    <div class="products-content">
      <!-- Título e badges -->
      <div class="row items-center q-mb-md q-mt-lg">
        <div class="col">
          <div class="custom-font-bold gradient-title animate-title text-h4 flex items-center">
            <q-icon name="inventory_2" size="28px" class="q-mr-sm" /> Produtos
          </div>
        </div>
        <div class="col-auto flex items-center">
          <q-badge color="green" class="q-mr-sm badge-pill animate-badge">
            Disponíveis: {{ filteredProducts.length }}
          </q-badge>
          <q-badge color="red" class="badge-pill animate-badge">
            Esgotados: {{ outOfStockProducts.length }}
          </q-badge>
        </div>
      </div>

      <!-- Busca e Filtro -->
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-md-8">
          <q-input
            v-model="search"
            label="Buscar Produto"
            outlined
            dense
            class="q-mb-none"
            placeholder="Digite o nome do produto"
            clearable
            prefix="🔍"
            color="primary"
            :input-style="{ fontFamily: 'Inter, Poppins, Roboto, sans-serif', fontWeight: 500 }"
          />
        </div>
        <div class="col-12 col-md-4">
          <q-select
            v-model="filter"
            :options="['Todos', 'Disponíveis', 'Esgotados']"
            label="Filtrar"
            outlined
            dense
            class="q-mb-none"
            color="primary"
            :input-style="{ fontFamily: 'Inter, Poppins, Roboto, sans-serif', fontWeight: 500 }"
          />
        </div>
      </div>

      <!-- Adicionar Produto -->
      <q-expansion-item
        label="Adicionar Produto"
        expand-separator
        class="add-expansion animate-fade-in"
        icon="add_box"
        header-class="expansion-header"
      >
        <q-form @submit.prevent="addProduct" ref="productForm">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                ref="nameInput"
                v-model="newProduct.name"
                label="Nome do Produto"
                placeholder="Digite o nome do produto"
                outlined
                dense
                :rules="[(val) => !!val || 'O nome do produto é obrigatório']"
                color="primary"
                :input-style="{ fontFamily: 'Inter, Poppins, Roboto, sans-serif', fontWeight: 500 }"
              />
            </div>
            <div class="col-12 col-md-4">
              <q-input
                v-model.number="newProduct.quantity"
                label="Quantidade"
                placeholder="Digite a quantidade"
                type="number"
                outlined
                dense
                :rules="[(val) => val > 0 || 'A quantidade deve ser maior que zero']"
                color="primary"
                :input-style="{ fontFamily: 'Inter, Poppins, Roboto, sans-serif', fontWeight: 500 }"
              />
            </div>
            <div class="col-12 col-md-2 flex flex-center">
              <q-btn
                label="+ Adicionar"
                type="submit"
                color="primary"
                class="full-width"
                icon="add_box"
                unelevated
                no-caps
              />
            </div>
          </div>
        </q-form>
      </q-expansion-item>

      <!-- Produtos Esgotados -->
      <q-expansion-item
        label="Produtos Esgotados"
        expand-separator
        class="out-expansion animate-fade-in"
        icon="warning"
        header-class="expansion-header"
      >
        <q-list>
          <q-item v-for="product in outOfStockProducts" :key="product.id">
            <q-item-section avatar>
              <q-icon name="warning" color="red" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="custom-font-bold">{{ product.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <!-- Lista de Produtos -->
      <div class="row q-col-gutter-md">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card class="product-card animate-fade-in">
            <q-card-section class="row items-center">
              <q-icon name="inventory_2" color="primary" size="32px" class="q-mr-sm" />
              <div>
                <div class="custom-font-bold text-h6">{{ product.name }}</div>
                <div class="custom-font-light text-grey-7">
                  Quantidade:
                  <span :class="product.quantity === 0 ? 'text-red' : 'text-green'">
                    {{ product.quantity }}
                  </span>
                </div>
              </div>
            </q-card-section>
            <q-separator />
            <q-card-actions align="right" class="action-group">
              <q-btn
                icon="add"
                label="Adicionar Estoque"
                color="green"
                flat
                @click="restock(product.id)"
                class="q-mr-xs"
                no-caps
              />
              <q-btn
                icon="delete"
                label="Remover"
                color="red"
                flat
                @click="confirmDelete(product.id)"
                no-caps
              />
            </q-card-actions>
          </q-card>
        </div>
        <div v-if="filteredProducts.length === 0" class="col-12 text-center q-mt-md">
          <q-icon name="info" size="lg" color="grey-6" />
          <p class="custom-font-light">Nenhum produto encontrado.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useProductStore } from 'src/stores/product-store'
import { Notify, Dialog } from 'quasar'

const productStore = useProductStore()
const search = ref('')
const filter = ref('Todos')
const newProduct = ref({ name: '', quantity: 0 })
const productForm = ref(null)
const nameInput = ref(null)

onMounted(async () => {
  await productStore.loadProducts()
})

const filteredProducts = computed(() => {
  const searchTerm = search.value.toLowerCase()
  return productStore.products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm)
    const matchesFilter =
      filter.value === 'Todos' ||
      (filter.value === 'Disponíveis' && product.quantity > 0) ||
      (filter.value === 'Esgotados' && product.quantity === 0)
    return matchesSearch && matchesFilter
  })
})

const outOfStockProducts = computed(() =>
  productStore.products.filter((product) => product.quantity === 0),
)

function notify(type, message) {
  Notify.create({ type, message })
}

async function addProduct() {
  if (productForm.value.validate()) {
    await productStore.addProduct({ ...newProduct.value })
    newProduct.value = { name: '', quantity: 0 }
    productForm.value.resetValidation()
    await nextTick()
    // Foca no campo nome para agilidade
    if (nameInput.value?.focus) nameInput.value.focus()
    notify('positive', 'Produto adicionado com sucesso!')
  }
}

function getProductById(productId) {
  return productStore.products.find((p) => p.id === productId)
}

async function deleteProduct(productId) {
  const product = getProductById(productId)
  if (!product) return notify('negative', 'Produto não encontrado.')
  await productStore.deleteProduct(productId)
  notify('positive', 'Produto removido com sucesso!')
}

function restock(productId) {
  const product = getProductById(productId)
  if (!product) return notify('negative', 'Produto não encontrado.')

  Dialog.create({
    title: 'Reabastecer Produto',
    message: `Informe a quantidade para reabastecer o produto "${product.name}":`,
    prompt: {
      model: '',
      type: 'number',
      isValid: (val) => val > 0,
      label: 'Quantidade',
      placeholder: 'Digite a quantidade',
    },
    cancel: true,
    persistent: true,
  })
    .onOk(async (quantity) => {
      const parsedQuantity = parseInt(quantity, 10)
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        notify('negative', 'Quantidade inválida.')
        return
      }
      await productStore.restockProduct(productId, parsedQuantity)
      notify('positive', 'Produto reabastecido!')
    })
    .onCancel(() => {
      notify('info', 'Reabastecimento cancelado.')
    })
}

function confirmDelete(productId) {
  const product = getProductById(productId)
  if (!product) return notify('negative', 'Produto não encontrado.')
  Dialog.create({
    title: 'Confirmar Exclusão',
    message: `Tem certeza de que deseja excluir o produto "${product.name}"?`,
    cancel: true,
    persistent: true,
    icon: 'warning',
    color: 'red',
  })
    .onOk(() => deleteProduct(productId))
    .onCancel(() => notify('info', 'A exclusão foi cancelada.'))
}
</script>

<style scoped>
.products-bg {
  background: linear-gradient(135deg, #23243a 60%, #181926 100%);
  min-height: 100vh;
}

.products-content {
  padding: 0 0.5vw 0.5vw 0.5vw;
  max-width: 100vw;
}

.gradient-title {
  background: linear-gradient(90deg, #4caf50, #2196f3, #ff9800);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientMove 3s infinite linear;
  background-size: 200% 200%;
  font-weight: 700;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.badge-pill {
  border-radius: 999px;
  font-size: 15px;
  padding: 0 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px 0 rgba(76, 175, 80, 0.1);
  animation: popIn 0.6s;
  background: rgba(30, 40, 60, 0.85);
  color: #fff;
}

@keyframes popIn {
  0% {
    transform: scale(0.7);
    opacity: 0;
  }
  70% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.custom-font {
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
}

.custom-font-bold {
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 600;
}

.custom-font-light {
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 300;
}

.add-expansion {
  border-radius: 12px;
  background: #23243a;
  box-shadow: 0 2px 12px 0 rgba(33, 150, 243, 0.1);
  margin-bottom: 18px;
  color: #e3eaf7;
}

.out-expansion {
  border-radius: 12px;
  background: #2d2233;
  box-shadow: 0 2px 12px 0 rgba(255, 0, 0, 0.1);
  margin-bottom: 18px;
  color: #e3eaf7;
}

.expansion-header {
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
  color: #e3eaf7;
}

.product-card {
  border-radius: 18px;
  background: #23243a;
  box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.18);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  min-height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1.5px solid #23243a;
  color: #e3eaf7;
}
.product-card:hover {
  transform: scale(1.04) translateY(-2px);
  box-shadow: 0 8px 32px 0 rgba(33, 150, 243, 0.18);
  background: #28304a;
  border-color: #2196f3;
}

.action-group {
  gap: 8px;
  display: flex;
  justify-content: flex-end;
}

.animate-title {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
</style>
