<template>
  <div class="page-order">
    <div class="page-order__header">
      <div class="page-order__header-content">
        <p class="page-order__heading">{{ $t('Common.ordered') }}</p>
        <p class="page-order__number">{{ orderNumber }}</p>
      </div>
      <button class="page-order__back" @click="goBack">
        <SvgIcon class="page-order__back-icon" name="chevron" />
        <span class="page-order__back-title">{{ $t('Common.back') }}</span>
      </button>
    </div>

    <div class="page-order__content">
      <AccountOrderList :with-toggle="isReturnActive" :order="order" />
      <AccountOrderInfo
        :is-return-active="isReturnActive"
        :is-show-confirmation="isShowConfirmation"
        :order="order"
        @toggleReturn="toggleReturn"
        @showConfirmation="showConfirmation"
        @cancelReturn="cancelReturn"
        @help="handleHelp"
        @payOrder="payOrder"
      />
    </div>
    <AccountOrderConfirmReturn
      v-if="isShowConfirmation"
      @close="hideConfirmation"
    />
  </div>
</template>

<script lang="ts" setup>
import AccountOrderList from '~/components/account/AccountOrderList.vue'
import AccountOrderInfo from '~/components/account/AccountOrderInfo.vue'
import AccountOrderConfirmReturn from '~/components/account/AccountOrderConfirmReturn.vue'

import { useOrdersStore } from '~~/store/orders'
import { IOrder } from '~~/types/orders.interface'
import { useCartStore } from '~~/store/cart'
import { EStatus } from '~~/constants/status'
import { ICart } from '~~/types/cart.interface'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const router = useRouter()
const route = useRoute()
const ordersStore = useOrdersStore()
const cartStore = useCartStore()

await useAsyncData('fetchOrderOnInit', () =>
  ordersStore.fetchOrder(route.params.token as string)
)

const isReturnActive = ref(false)
const isShowConfirmation = ref(false)

const order = computed<IOrder>(() => {
  return ordersStore.order
})

const orderNumber = computed(() => {
  return `N° ${order.value.number}`
})

const toggleReturn = () => {
  isReturnActive.value = !isReturnActive.value
}

const showConfirmation = (): void => {
  isShowConfirmation.value = true
}

const hideConfirmation = (): void => {
  isShowConfirmation.value = false
  isReturnActive.value = false
}

const cancelReturn = () => {
  isReturnActive.value = false
}

const handleHelp = () => {
  navigateTo('/account/faq')
}

const payOrder = () => {
  cartStore.$patch({
    cart: order.value as ICart,
    error: null,
    status: EStatus.INIT,
  })

  router.push({
    path: '/checkout/payment',
    query: {
      order: order.value.tokenValue,
    },
  })
}

const goBack = (): void => {
  router.back()
}
</script>

<style lang="scss" scoped>
@include media-lg {
  .page-order {
    padding-bottom: 88px;

    &__content {
      display: flex;
      gap: 36px;
      margin-top: 36px;
      max-width: 900px;
      flex-direction: column;
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 900px;
      margin-top: 5px;
    }

    &__header-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    &__heading {
      font-weight: 900;
      font-size: 20px;
      line-height: 22px;
    }

    &__number {
      font-weight: 400;
      font-size: 14px;
      line-height: 32px;
      color: $color-dark-grey;
      font-style: italic;
    }

    &__back {
      display: flex;
      align-items: center;
      gap: 3px;
    }

    &__back-icon {
      transform: rotate(-90deg);
      width: 10px;
      height: 18px;
    }

    &__back-title {
      font-family: $font-secondary;
      font-weight: 460;
      font-size: 10px;
      line-height: 32px;
      text-transform: uppercase;
    }
  }
}

@include media-xl {
  .page-order {
    padding-bottom: 115px;

    &__content {
      display: flex;
      flex-direction: row;
      gap: 45px;
      margin-top: 36px;
      max-width: 900px;
    }
  }
}
</style>
