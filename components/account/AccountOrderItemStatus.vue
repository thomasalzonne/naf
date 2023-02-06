<template>
  <div class="order-status">
    <div
      v-if="statusModifier !== 'completed'"
      class="order-status__circle"
      :class="[`order-status__circle--${statusModifier}`]"
    >
      <SvgIcon class="order-status__info-icon" name="exclamation" />
    </div>
    <SvgIcon v-else class="order-status__completed" name="check_circle" />
    <p class="order-status__title">{{ statusTitle }}</p>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import {
  ECheckoutOrderState,
  EPaymentOrderState,
} from '~~/types/orders.interface'

interface IProps {
  status: ECheckoutOrderState | string
  paymentStatus: EPaymentOrderState | string
}

enum EOrderStatusModifier {
  COMPLETED = 'completed',
  SHIPPED = 'shipped',
  VALIDATED = 'validated',
  FINALIZER = 'finalizer',
}

const props = withDefaults(defineProps<IProps>(), {
  status: '',
  paymentStatus: '',
})
const { t } = useI18n()

const statusModifier = computed(() => {
  if (props.paymentStatus === EPaymentOrderState.AWAITING_PAYMENT) {
    return EOrderStatusModifier.FINALIZER
  }

  switch (props.status) {
    case ECheckoutOrderState.COMPLETED:
      return EOrderStatusModifier.COMPLETED
    case ECheckoutOrderState.PAYMENT_SELECTED:
      return EOrderStatusModifier.VALIDATED
    case ECheckoutOrderState.SHIPPING_SELECTED:
      return EOrderStatusModifier.VALIDATED
    default:
      return EOrderStatusModifier.VALIDATED
  }
})

const statusTitle = computed(() => {
  if (props.paymentStatus === EPaymentOrderState.AWAITING_PAYMENT) {
    return t('Account.order.finalize')
  }

  switch (props.status) {
    case ECheckoutOrderState.COMPLETED:
      return t('Account.order.completed')
    case ECheckoutOrderState.PAYMENT_SELECTED:
      return t('Account.order.validated')
    case ECheckoutOrderState.SHIPPING_SELECTED:
      return t('Account.order.validated')
    default:
      return t('Account.order.validated')
  }
})
</script>

<style lang="scss" scoped>
.order-status {
  display: flex;
  align-items: center;

  &__title {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 14px;
    line-height: 18px;
    text-transform: capitalize;
  }

  &__circle {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    margin-right: 9px;
    background-color: $color-light-grey;
    display: flex;
    align-items: center;
    justify-content: center;

    &--completed {
      background-color: none;
    }

    &--validated {
      background-color: $color-red-light;
    }

    &--shipping {
      background-color: $color-yellow-light;
    }

    &--finalizer {
      background-color: $color-blue;
    }
  }

  &__completed {
    width: 22px;
    height: 22px;
    margin-right: 9px;
  }

  &__info-icon {
    width: 2px;
    height: 10px;
    color: $color-white;
  }
}
</style>
