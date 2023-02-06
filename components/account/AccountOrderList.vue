<template>
  <AppContentCard class="order-list">
    <template #header>
      <div class="order-list__header">
        <p class="order-list__heading">{{ $t('Order.order_details') }}</p>
        <p class="order-list__count">{{ pluralizationQuantity }}</p>
      </div>
    </template>
    <template #body>
      <div class="order-list__body">
        <div class="order-list__items">
          <CartProduct
            v-for="(orderItem, i) in orderItems"
            :key="orderItem.id"
            :item="orderItem"
            :inactive="i === 0"
            :for-order="true"
            :with-toggle="withToggle"
          >
            <template v-if="i === 0" #footer>
              <div class="order-list__returned-container">
                <div class="order-list__returned">
                  {{ $t('Account.product_returned') }}
                </div>
              </div>
            </template>
          </CartProduct>
        </div>
        <AccountOrderPrices :order="order" />
      </div>
    </template>
  </AppContentCard>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import AppContentCard from '~/components/common/AppContentCard.vue'
import CartProduct from '~/components/cards/CartProduct.vue'
import AccountOrderPrices from '~/components/account/AccountOrderPrices.vue'
import { IOrder, IOrderItem } from '~~/types/orders.interface'

interface IProps {
  withToggle: boolean
  order: IOrder
}

const { t } = useI18n()

const props = withDefaults(defineProps<IProps>(), {
  withToggle: false,
  order: null,
})

const orderItems = computed<IOrderItem[]>(() => {
  return props.order?.items || []
})

const pluralizationQuantity = computed<string>(() => {
  // @ts-ignore
  return t('Common.items', orderItems.value.length, {
    n: orderItems.value.length,
  })
})
</script>

<style lang="scss" scoped>
.order-list {
  min-width: 405px;
  height: max-content;

  &__header {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 20px 23px 26px;
  }

  &__heading {
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
    font-family: $font-secondary;
  }

  &__count {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 16px;
    line-height: 21px;
  }

  &__body {
    padding: 15px 10px 56px 20px;
  }

  &__items {
    max-height: 580px;
    overflow: auto;
    padding-right: 10px;

    @include custom-scroll;
  }

  &__returned-container {
    margin-top: auto;
    padding-top: 10px;
  }

  &__returned {
    background-color: $color-light-grey;
    border-radius: 30px;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 10px 4px 10px;
    height: 28px;
    width: max-content;
  }
}

@include media-xl {
  .order-list {
    &__body {
      padding: 15px 20px 56px 30px;
    }
  }
}
</style>
