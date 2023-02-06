<template>
  <div class="selected-look">
    <div class="selected-look__header">
      <p class="selected-look__title">{{ product?.name }}</p>
      <WishlistButton class="selected-look__wishlist" />
    </div>
    <ProductPriceBlock
      class="selected-look__prices"
      :price="75"
      :discounted-price="37"
      :discount-percent="50"
    />

    <div v-if="product?.variants" class="selected-look__colors">
      <p class="selected-look__label">{{ $t('Common.color') }} :</p>
      <div class="selected-look__colors-list">
        <ProductColorButton
          v-for="(color, i) in product?.variants"
          :key="color.slug"
          :color-data="color"
          :is-active="i == 0"
        />
      </div>
    </div>

    <ProductSizesBlock
      v-if="sizes?.length"
      class="selected-look__sizes"
      :sizes="sizes"
      :current-size="null"
      @select-size="selectSize"
      @openSizeHelper="openSizeHelper"
    />
  </div>
</template>

<script lang="ts" setup>
import WishlistButton from '~/components/common/WishlistButton.vue'
import ProductPriceBlock from '~/components/product/ProductPriceBlock.vue'
import { IProduct, IProductSize } from '~~/types/product.interface'

interface IProps {
  product: IProduct
}

const props = defineProps<IProps>()
const emit = defineEmits(['openSizeHelper'])

const sizes = computed<IProductSize[]>(() => {
  return props.product?.sizes || []
})

const selectSize = () => {}

const openSizeHelper = () => {
  emit('openSizeHelper')
}
</script>

<style lang="scss" scoped>
.selected-look {
  padding: 16px 21px 0px 21px;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    font-family: $font-secondary;
    text-transform: uppercase;
  }

  &__prices {
    margin-bottom: 0;
  }

  &__colors {
    margin-top: 30px;
  }

  &__colors-list {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  &__sizes {
    margin-top: 30px;

    :deep() {
      .sizes-block__label {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }

  &__label {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
  }
}
</style>
