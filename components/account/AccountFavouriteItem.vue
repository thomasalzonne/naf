<template>
  <NuxtLink :to="`/products/${productSlug}`" class="account-favourite-item">
    <div
      class="account-favourite-item__img-container"
      :class="{
        'account-favourite-item__img-container--no-image': !productImage,
      }"
    >
      <img
        v-if="productImage"
        class="account-favourite-item__img"
        :src="productImage"
        alt="Favourite product"
      />
    </div>
    <div class="account-favourite-item__gradient"></div>
    <div class="account-favourite-item__header">
      <!-- TODO: Expand response with percentage -->
      <AppBadge v-if="false" title="-30 %" />
      <WishlistButton
        :is-active="true"
        class="account-favourite-item__favourite-button"
        @toggle="removeItem"
      />
    </div>
    <div class="account-favourite-item__content">
      <p class="account-favourite-item__name">{{ productName }}</p>
      <PriceForCard
        class="account-favourite-item__price-container"
        :original-price="originalPrice"
        :discounted-price="discountedPrice"
      />

      <!-- TODO: Expand response with sizes -->
      <div v-if="false" class="account-favourite-item__sizes-container">
        <p class="account-favourite-item__sizes-label">
          {{ $t('Account.add_my_size') }}
        </p>
        <div class="account-favourite-item__sizes">
          <ProductSizeButton
            v-for="i in 6"
            :key="i"
            class="account-favourite-item__size"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import ProductSizeButton from '~/components/product/ProductSizeButton.vue'
import AppBadge from '~/components/common/AppBadge.vue'
import WishlistButton from '~/components/common/WishlistButton.vue'
import PriceForCard from '~/components/common/PriceForCard.vue'

import { IWishlistProductWrapper } from '~~/types/wishlist.interface'
import { transformPriceFromSylius } from '~~/utils/sylius'

interface IProps {
  product: IWishlistProductWrapper
}

const props = withDefaults(defineProps<IProps>(), {
  product: null,
})
const emit = defineEmits(['removeItem'])

const originalPrice = computed(() => {
  return transformPriceFromSylius(props.product?.variant?.originalPrice)
})

const discountedPrice = computed(() => {
  const price = transformPriceFromSylius(props.product?.variant?.price)

  return originalPrice.value === price ? 0 : price
})

const productName = computed(() => {
  return props.product?.variant?.product?.name || ''
})

const productSlug = computed(() => {
  return props.product?.product?.slug || ''
})

const productImage = computed(() => {
  return props.product?.product?.pictures?.[0]?.url || ''
})

const removeItem = () => {
  emit('removeItem', props.product?.product?.slug)
}
</script>

<style lang="scss" scoped>
.account-favourite-item {
  width: 322px;
  height: auto;
  position: relative;

  &__img-container {
    width: 100%;
    height: auto;
    min-height: 300px;
    background-color: $color-light-grey;

    &--no-image {
      background-color: $color-light-grey;
      height: 100%;
    }
  }

  &__img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__content {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0 12px 16px 12px;
    display: flex;
    flex-direction: column;
  }

  &__header {
    position: absolute;
    top: 0;
    right: 0;
    padding: 18px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  &__name {
    font-family: $font-secondary;
    font-weight: 460;
    font-size: 18px;
    line-height: 23px;
    color: $color-white;
  }

  &__price-container {
    margin-top: 0;

    & :deep() {
      .app-price {
        &__price {
          color: $color-white;

          &--old {
            color: $color-white;
          }
        }
      }
    }
  }

  &__price {
    color: $color-white;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
  }

  &__gradient {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    backdrop-filter: blur(1.5px);
  }

  &__sizes-label {
    font-weight: 400;
    font-size: 18px;
    line-height: 36px;
    color: $color-white;
  }

  &__sizes {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 13px;

    & :deep() {
      .product-size-button {
        color: $color-white;
        border-color: $color-white;
        background-color: transparent;
        border-width: 1px;
      }
    }
  }
}
</style>
