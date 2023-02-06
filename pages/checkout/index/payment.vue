<template>
  <div class="page-payment">
    <CheckoutHeader v-if="isMobile" @back="handleHeaderBack" />
    <div class="page-payment__wrapper">
      <div class="page-payment__content">
        <AppPageHeader
          v-if="!isMobile"
          class="page-payment__header"
          :title="$t('Checkout.payment_title')"
        />
        <div class="page-payment__form">
          <AdyenForm
            ref="adyenForm"
            :session-data="sessionData"
            @completed="handlePaymentCompleted"
            @select="onSelectPayment"
          />
          <AppLoader v-if="!adyenForm" />
        </div>
        <AppButton
          v-if="isShowButton"
          class="page-payment__button"
          title="passer la commande"
          icon-right="arrow"
          btn-style="light"
          :disabled="isDisabledButton"
          @click="triggerForm"
        />
      </div>
      <div v-if="!isMobile && cart" class="page-payment__info">
        <CheckoutInfo :cart="cart" page="payment" />
      </div>
    </div>

    <ModalInfo
      v-if="isOpenModalInfo"
      :is-open="true"
      :text="modalInfoText"
      @close="closeModalInfo"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AppButton from '~/components/common/AppButton.vue'
import AppPageHeader from '~/components/common/AppPageHeader.vue'
import AdyenForm from '~/components/payments/AdyenForm.vue'
import CheckoutInfo from '~/components/checkout/CheckoutInfo.vue'
import CheckoutHeader from '~/components/checkout/CheckoutHeader.vue'
import { useCartStore } from '~~/store/cart'

import { ISessionData } from '~/types/checkout.interface'
import { EAdyenStatuses } from '~~/constants/payments'
import { useCheckoutStore } from '~~/store/checkout'
import { ECartState } from '~~/types/cart.interface'
import { useLayoutStore } from '~~/store/layout'

definePageMeta({
  layout: 'checkout',
})

const config = useRuntimeConfig()
const { t } = useI18n()

const adyenForm = ref(null)
const modalInfoText = ref('')
const isOpenModalInfo = ref(false)
const isPaymentCompleted = ref(false)
const isShowButton = ref(true)
const isDisabledButton = ref(false)

const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()
const layoutStore = useLayoutStore()

const route = useRoute()

const orderToken = ref<string>(cartStore.cart?.tokenValue || '')

if (route.query?.order) {
  orderToken.value = route.query?.order?.toString()
}

const { data: sessionData, error } = await useCustomFetch<ISessionData>(
  `${config.public.apiUrl}/shop/adyen/sessions`,
  {
    key: 'fetchSessionData',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      orderToken: orderToken.value,
    },
  }
)

if (error) {
  createError(error)
}

const cart = computed(() => {
  return cartStore.cart
})

const isMobile = computed(() => {
  return layoutStore.windowWidth < 992
})

const triggerForm = async () => {
  if (cart.value.checkoutState !== ECartState.COMPLETED) {
    await checkoutStore.setPaymentMethod()
    await checkoutStore.completeOrder()
  }

  adyenForm.value.submitForm()
}

const handlePaymentCompleted = (resultCode: EAdyenStatuses) => {
  resultCode === EAdyenStatuses.AUTHORISED
    ? setSuccessModalInfo()
    : setErrorModalInfo()

  openModalInfo()
}

const setErrorModalInfo = () => {
  modalInfoText.value = t('Checkout.order_error_message')
  isPaymentCompleted.value = false
}

const setSuccessModalInfo = () => {
  modalInfoText.value = t('Checkout.order_success_message')
  isPaymentCompleted.value = true
}

const handleCompletePayment = () => {
  navigateTo({
    path: '/checkout/success',
    query: { order: cart.value.tokenValue },
  })
}

const openModalInfo = () => {
  isOpenModalInfo.value = true
}

const closeModalInfo = () => {
  isOpenModalInfo.value = false

  if (isPaymentCompleted.value) {
    handleCompletePayment()
  }
}

const onSelectPayment = (type) => {
  isShowButton.value = type === 'card'
}

const handleHeaderBack = () => {
  cart.value.checkoutState !== ECartState.COMPLETED
    ? navigateTo('/checkout')
    : navigateTo('/')
}

const ModalInfo = defineAsyncComponent(
  () => import('~/components/common/ModalInfo.vue')
)
</script>

<style lang="scss" scoped>
.page-payment {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
  padding-top: 24px;
  width: 100%;
  height: 100%;

  &__info {
    display: none;
  }

  &__form {
    width: 100%;
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding: 0 20px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  &__loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 120px;
  }

  &__header {
    margin-top: 71px;
    margin-bottom: 14px;
  }

  &__button {
    margin-top: 31px;
  }
}

@include media-lg {
  .page-payment {
    width: 100%;
    padding: 0;

    &__wrapper {
      display: grid;
      grid-template-columns: calc(60% - 12px) calc(40% - 12px);
      justify-content: flex-start;
      align-items: flex-start;
      gap: 24px;
      padding: 0;
    }

    &__info-block {
      margin: 0;
      position: sticky;
      top: 20px;
      height: max-content;
    }

    &__info {
      display: block;
      margin-top: 25px;
    }

    &__button {
      margin-top: 55px;
      width: 340px;
    }

    &__content {
      display: block;
    }
  }
}

@media screen and (min-width: 1439px) {
  .page-payment {
    grid-template-columns: 61% 39%;
    gap: 62px;
  }
}

@include media-xl {
  .page-payment {
    gap: 74px;
  }
}
</style>
