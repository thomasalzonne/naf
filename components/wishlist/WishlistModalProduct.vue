<template>
  <AppModalWrapper
    class="wishlist-modal"
    :is-open="isOpen && isMobile"
    :is-close-on-click-outside="true"
    :is-show-header="true"
    @close="closeModal"
    @back="closeModal"
  >
    <template #header>
      <div class="wishlist-modal__header">
        <p class="wishlist-modal__title">{{ $t('Common.my_wishlist') }}</p>
      </div>
    </template>
    <MobileModalProductBlock
      :product="formattedProduct"
      :current-size="selectedSize"
      :is-in-cart="isInCart"
      :is-loading="isLoading"
      @onButtonClick="handleClick"
      @changeSize="changeSize"
    >
      <template #header-element>
        <WishlistButton
          class="wishlist-modal__toggle"
          :is-active="isProductInWishlist"
          @toggle="toggleIsFavourite"
        />
      </template>
    </MobileModalProductBlock>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import MobileModalProductBlock from '~/components/common/MobileModalProductBlock.vue'
import WishlistButton from '~/components/common/WishlistButton.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

import { ICommonProduct, IProductSize } from '~~/types/product.interface'
import {
  IWishlistProductVariant,
  IWishlistProductWrapper,
} from '~~/types/wishlist.interface'
import { useCartStore } from '~~/store/cart'
import { useWishlistStore } from '~~/store/wishlist'
import { ICartItem } from '~~/types/cart.interface'

interface IProps {
  product: IWishlistProductVariant
  wishlistProducts: IWishlistProductWrapper[]
}

const layoutStore = useLayoutStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const props = withDefaults(defineProps<IProps>(), {
  product: null,
})

const isProductInWishlist = ref(true)
const selectedSize = ref<IProductSize>(null)
const isLoading = ref(false)

const isProductInWishlistStore = computed<boolean>(() => {
  return !!props.wishlistProducts?.find(
    (item: IWishlistProductWrapper) => item?.product?.slug === slug.value
  )
})

const slug = computed(() => {
  return props.product?.product?.slug
})

const medias = computed(() => {
  return props?.product.product?.pictures || []
})

const originalPrice = computed(() => {
  const originalPrice = props.product?.originalPrice
  const price = props?.product?.price

  if (originalPrice === price) return 0
  return transformPriceFromSylius(originalPrice)
})

const price = computed(() => {
  return transformPriceFromSylius(props?.product?.price)
})

const percentage = computed(() => {
  return props.product?.percentage || 0
})

const formattedProduct = computed<ICommonProduct>(() => {
  let sizes = props.product?.product?.variants

  sizes = sizes?.filter(
    (size: IWishlistProductVariant) => typeof size !== 'string'
  )

  return {
    name: props.product?.product?.name || '',
    medias: medias.value,
    percentage: percentage.value,
    price: price.value,
    originalPrice: originalPrice.value,
    quantity: 0,
    id: props.product?.id,
    slug: props.product?.product?.slug,
    sizes: sizes?.map((variant: IWishlistProductVariant) => {
      return {
        stock: variant?.inventorySourceStocksOnHand,
        ean: variant?.code,
        size: variant?.translation?.name,
        price: null,
        price_discounted: null,
      }
    }),
  }
})

const isOpen = computed(() => {
  return layoutStore.modals[EModals.WISHLIST_VIEW_PRODUCT]
})

const isMobile = computed(() => {
  return layoutStore.windowWidth < 992
})

const isInCart = computed<boolean>(() => {
  return !!cartStore.cart?.items?.find(
    (item: ICartItem) => item.variant?.code === selectedSize.value?.ean
  )
})

watch(
  () => isProductInWishlistStore.value,
  (value) => {
    isProductInWishlist.value = value
  }
)

const changeSize = (value: IProductSize) => {
  selectedSize.value = value
}

const handleClick = async () => {
  isLoading.value = true
  await cartStore.handleAddToCart(selectedSize.value.ean)
  isLoading.value = false
}

const toggleIsFavourite = async () => {
  const slug: string = props.product.product.slug || ''
  const inWishlist = isProductInWishlist.value

  isProductInWishlist.value = !isProductInWishlist.value

  !inWishlist
    ? await wishlistStore.addToWishlist(slug)
    : await wishlistStore.removeItem(slug)

  isProductInWishlist.value = checkInWishlistProduct()
}

const checkInWishlistProduct = () => {
  return !!props.wishlistProducts?.find(
    (item: IWishlistProductWrapper) => item?.product?.slug === slug.value
  )
}

const closeModal = () => {
  layoutStore.closeModal(EModals.WISHLIST_VIEW_PRODUCT)
}
</script>

<style lang="scss" scoped>
.wishlist-modal {
  z-index: 2000;

  & :deep() {
    .app-modal-wrapper {
      &__body {
        margin-top: 0;
        padding: 0;
      }

      &__header {
        padding-top: 3px;
      }

      &__back {
        top: 14px;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 13px;
    width: 100%;
    margin-bottom: 5px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
  }

  &__toggle {
    width: 22px;
    height: 22px;
  }

  & :deep() {
    .wishlist-button {
      &--active {
        .wishlist-button__icon {
          color: $color-pink;
        }
      }

      &__icon {
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>
