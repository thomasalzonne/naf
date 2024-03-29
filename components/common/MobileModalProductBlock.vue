<template>
  <div class="product">
    <ProductMiniSwiper :medias="product?.medias" />
    <div class="product__body">
      <div class="product__name-container">
        <p class="product__name">
          {{ product?.name || '' }}
        </p>
        <slot name="header-element" />
      </div>
      <ProductPriceBlock
        class="product__price-block"
        :price="product?.originalPrice"
        :discounted-price="product?.price"
        :discount-percent="product?.percentage"
      />
      <template v-if="product?.sizes?.length">
        <ProductSizesBlock
          :sizes="product?.sizes"
          :current-size="currentSize"
          @select-size="selectSize"
          @open-size-helper="openSizeHelper"
        />
      </template>
      <ProductButton
        class="product__button"
        :is-in-cart="isInCart"
        :is-in-stock="!!currentSize?.stock"
        :is-loading="isLoading"
        @trigger="handleClick"
      />
    </div>
    <SizeHelperModal v-if="isOpenSizeHelper" @close="closeSizeHelper" />
  </div>
</template>

<script lang="ts" setup>
import ProductMiniSwiper from '~/components/product/ProductMiniSwiper.vue'
import ProductPriceBlock from '~/components/product/ProductPriceBlock.vue'
import ProductButton from '~/components/product/ProductButton.vue'
import ProductSizesBlock from '~/components/product/ProductSizesBlock.vue'
import SizeHelperModal from '~/components/modals/SizeHelperModal.vue'

import { ICommonProduct, IProductSize } from '~~/types/product.interface'

interface IProps {
  product: ICommonProduct
  currentSize: IProductSize
  isInCart: boolean
  isLoading: boolean
}

withDefaults(defineProps<IProps>(), {
  product: null,
  isInCart: false,
  isLoading: false,
})

const emit = defineEmits(['onButtonClick', 'changeSize', 'openSizeHelper'])
const isOpenSizeHelper = ref(false)
const handleClick = () => {
  emit('onButtonClick')
}

const selectSize = (size: IProductSize) => {
  emit('changeSize', size)
}

const openSizeHelper = () => {
  isOpenSizeHelper.value = true
}

const closeSizeHelper = () => {
  isOpenSizeHelper.value = false
}
</script>

<style lang="scss" scoped>
.product {
  &__name-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
  }

  &__name {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    text-transform: uppercase;
  }

  &__price-block {
    margin-top: -5px;
  }

  &__body {
    padding: 8px 20px 20px;
    height: 100%;
  }

  &__button {
    display: flex;
    margin-top: 32px;
  }
}
</style>
