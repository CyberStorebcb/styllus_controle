<template>
  <q-page class="payment-bg flex flex-center">
    <div class="payment-container">
      <q-card flat bordered class="payment-card shadow-2">
        <q-card-section>
          <div class="payment-title text-h4 text-center q-mb-md">Sistema de Pagamento</div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <div class="text-h6 q-mb-md">Realizar Pagamento</div>
          <q-form @submit.prevent="processPayment">
            <q-select
              v-model="paymentDetails.method"
              :options="paymentMethods"
              label="Forma de Pagamento"
              outlined
              dense
              class="q-mb-md"
              emit-value
              map-options
              :rules="[(val) => !!val || 'Escolha a forma de pagamento']"
            />
            <q-input
              v-model="paymentDetails.name"
              label="Nome do Pagador"
              outlined
              dense
              class="q-mb-md"
              :rules="[(val) => !!val || 'O nome é obrigatório']"
              placeholder="Digite o nome completo"
            />
            <q-input
              v-model="paymentDetails.email"
              label="E-mail para confirmação"
              outlined
              dense
              class="q-mb-md"
              type="email"
              :rules="[
                (val) => !!val || 'O e-mail é obrigatório',
                (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'E-mail inválido',
              ]"
              placeholder="Digite o e-mail"
              v-if="paymentDetails.method !== 'dinheiro'"
            />
            <q-input
              v-model.number="paymentDetails.amount"
              label="Valor (R$)"
              type="number"
              outlined
              dense
              class="q-mb-md"
              :rules="[
                (val) => !!val || 'O valor é obrigatório',
                (val) => val > 0 || 'O valor deve ser maior que zero',
                (val) => val <= 10000 || 'O valor não pode exceder R$ 10.000',
              ]"
              :step="0.01"
              min="0"
              placeholder="0,00"
              prefix="R$"
            />

            <!-- Campos extras para Cartão -->
            <div v-if="paymentDetails.method === 'cartao'">
              <q-input
                v-model="paymentDetails.cardNumber"
                label="Número do Cartão"
                outlined
                dense
                class="q-mb-md"
                maxlength="19"
              />
              <div class="row q-col-gutter-sm">
                <q-input
                  v-model="paymentDetails.cardExpiry"
                  label="Validade (MM/AA)"
                  outlined
                  dense
                  class="col"
                  maxlength="5"
                />
                <q-input
                  v-model="paymentDetails.cardCVC"
                  label="CVC"
                  outlined
                  dense
                  class="col"
                  maxlength="4"
                />
              </div>
            </div>

            <!-- Campos extras para Boleto -->
            <div v-if="paymentDetails.method === 'boleto'">
              <q-banner class="bg-grey-2 text-grey-9 q-mb-md">
                O boleto será gerado após a confirmação.
              </q-banner>
            </div>

            <q-btn
              :label="buttonLabel"
              type="submit"
              color="green"
              unelevated
              class="payment-btn"
              no-caps
              :disable="loading"
              :loading="loading"
            />
          </q-form>
        </q-card-section>

        <!-- QR Code PIX -->
        <q-card-section
          v-if="qrCodeData && paymentDetails.method === 'pix'"
          class="text-center qr-code-container"
        >
          <div class="text-h6 q-mb-sm">
            QR Code PIX Gerado
            <q-badge v-if="paymentStatus === 'pending'" color="orange" class="q-ml-sm"
              >Aguardando pagamento...</q-badge
            >
            <q-badge v-if="paymentStatus === 'paid'" color="green" class="q-ml-sm">Pago</q-badge>
            <q-badge v-if="paymentStatus === 'failed'" color="red" class="q-ml-sm">Falha</q-badge>
          </div>
          <canvas ref="qrCodeCanvas"></canvas>
          <div class="q-mt-md">
            <q-btn
              label="Copiar Código PIX"
              color="primary"
              flat
              @click="copyPixCode"
              icon="content_copy"
              size="sm"
            />
          </div>
        </q-card-section>

        <!-- Confirmação para Dinheiro -->
        <q-card-section
          v-if="paymentStatus === 'paid' && paymentDetails.method === 'dinheiro'"
          class="text-center"
        >
          <q-badge color="green" class="q-mb-md">Pagamento em dinheiro registrado!</q-badge>
        </q-card-section>

        <!-- Confirmação para Boleto -->
        <q-card-section v-if="boletoUrl" class="text-center">
          <q-badge color="blue" class="q-mb-md">Boleto gerado!</q-badge>
          <div class="q-mt-md">
            <a :href="boletoUrl" target="_blank" class="text-primary"
              >Clique aqui para visualizar o boleto</a
            >
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import QRCode from 'qrcode'
import { usePaymentStore } from 'src/stores/payment-store'
import { Notify } from 'quasar'

const paymentStore = usePaymentStore()
const paymentMethods = [
  { label: 'PIX', value: 'pix' },
  { label: 'Cartão', value: 'cartao' },
  { label: 'Dinheiro', value: 'dinheiro' },
  { label: 'Boleto', value: 'boleto' },
]
const paymentDetails = ref({
  method: 'pix',
  name: '',
  amount: 0,
  email: '',
  cardNumber: '',
  cardExpiry: '',
  cardCVC: '',
})
const qrCodeData = ref(null)
const loading = ref(false)
const qrCodeCanvas = ref(null)
const paymentStatus = ref(null) // 'pending', 'paid', 'failed'
const boletoUrl = ref(null)

const buttonLabel = computed(() => {
  switch (paymentDetails.value.method) {
    case 'pix':
      return 'GERAR QR CODE PIX'
    case 'cartao':
      return 'PAGAR COM CARTÃO'
    case 'dinheiro':
      return 'REGISTRAR PAGAMENTO'
    case 'boleto':
      return 'GERAR BOLETO'
    default:
      return 'PAGAR'
  }
})

// Chave PIX fixa (pode ser alterada para uma chave dinâmica)
const pixKey = '619.834.693-51'

// Função para gerar o código PIX no formato BR Code
function generatePixCode({ key, name, amount }) {
  const payloadFormatIndicator = '000201'
  const merchantAccountInformation = `26${String(key.length + 7).padStart(2, '0')}0014BR.GOV.BCB.PIX01${key}`
  const transactionAmount = `54${String(amount.toFixed(2).length).padStart(2, '0')}${amount.toFixed(2)}`
  const countryCode = '5802BR'
  const merchantName = `59${String(name.length).padStart(2, '0')}${name}`
  const crc16 = '6304'
  const pixCode = `${payloadFormatIndicator}${merchantAccountInformation}${transactionAmount}${countryCode}${merchantName}${crc16}`
  return pixCode
}

async function processPayment() {
  const { name, amount, email, method } = paymentDetails.value
  if (!name || amount <= 0 || (method !== 'dinheiro' && !email)) {
    Notify.create({ type: 'negative', message: 'Preencha todos os campos corretamente.' })
    return
  }
  loading.value = true
  paymentStatus.value = null
  qrCodeData.value = null
  boletoUrl.value = null

  if (method === 'pix') {
    paymentStatus.value = 'pending'
    const pixCode = generatePixCode({ key: pixKey, name, amount })
    qrCodeData.value = pixCode
    await nextTick()
    QRCode.toCanvas(
      qrCodeCanvas.value,
      pixCode,
      { width: window.innerWidth < 600 ? 150 : 200 },
      (error) => {
        if (error) {
          Notify.create({ type: 'negative', message: 'Erro ao gerar QR Code.' })
          loading.value = false
          return
        }
        paymentStore.addPayment({
          name,
          amount,
          email,
          date: new Date().toLocaleString(),
          status: 'pending',
          method: 'pix',
        })
        Notify.create({ type: 'positive', message: 'QR Code gerado. Aguardando pagamento...' })
        loading.value = false
        checkPixPayment()
      },
    )
  } else if (method === 'cartao') {
    // Simulação de pagamento com cartão
    setTimeout(() => {
      paymentStatus.value = 'paid'
      paymentStore.addPayment({
        name,
        amount,
        email,
        date: new Date().toLocaleString(),
        status: 'paid',
        method: 'cartao',
      })
      Notify.create({ type: 'positive', message: 'Pagamento com cartão aprovado!' })
      loading.value = false
    }, 2000)
  } else if (method === 'dinheiro') {
    paymentStatus.value = 'paid'
    paymentStore.addPayment({
      name,
      amount,
      date: new Date().toLocaleString(),
      status: 'paid',
      method: 'dinheiro',
    })
    Notify.create({ type: 'positive', message: 'Pagamento em dinheiro registrado!' })
    loading.value = false
  } else if (method === 'boleto') {
    // Simulação de geração de boleto
    setTimeout(() => {
      boletoUrl.value = 'https://www.bb.com.br/docs/pub/emp/empl/dwn/BoletoBB.pdf'
      paymentStore.addPayment({
        name,
        amount,
        email,
        date: new Date().toLocaleString(),
        status: 'pending',
        method: 'boleto',
      })
      Notify.create({ type: 'info', message: 'Boleto gerado!' })
      loading.value = false
    }, 2000)
  }
}

// Simulação de verificação de pagamento PIX e envio de e-mail
async function checkPixPayment() {
  setTimeout(async () => {
    paymentStatus.value = 'paid'
    Notify.create({ type: 'positive', message: 'Pagamento confirmado!' })
    await sendPaymentEmail(paymentDetails.value.email)
  }, 8000)
}

// Simulação de envio de e-mail (deve ser feito no backend real)
async function sendPaymentEmail(email) {
  Notify.create({ type: 'info', message: `E-mail de confirmação enviado para ${email}` })
}

function copyPixCode() {
  if (!qrCodeData.value) return
  navigator.clipboard
    .writeText(qrCodeData.value)
    .then(() => {
      Notify.create({ type: 'positive', message: 'Código PIX copiado!' })
    })
    .catch(() => {
      Notify.create({ type: 'negative', message: 'Não foi possível copiar o código.' })
    })
}
</script>

<style scoped>
.payment-bg {
  background: #181a20;
  min-height: 100vh;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-container {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
  padding: 32px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.payment-card {
  border-radius: 20px;
  background: rgba(24, 26, 32, 0.98);
  color: #fff;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.18);
  width: 100%;
}

.payment-title {
  color: #3b82f6;
  font-family: 'Poppins', 'Inter', 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 1px;
}

.payment-btn {
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 12px;
  padding: 10px 0;
}

.qr-code-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.qr-code-container canvas {
  border: 2px solid #4caf50;
  border-radius: 8px;
  background: #fff;
}

@media (max-width: 600px) {
  .payment-container {
    padding: 8px 0;
    max-width: 98vw;
  }
  .payment-card {
    border-radius: 12px;
  }
}
</style>
