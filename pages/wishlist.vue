<template>
  <div
    class="page-wishlist"
    :class="{ 'page-wishlist--empty': !products?.length }"
  >
    <div class="page-wishlist__container">
      <div class="page-wishlist__header">
        <h2 class="page-wishlist__heading">{{ $t('Common.my_wishlist') }}</h2>
        <p v-if="products?.length" class="page-wishlist__count">
          {{ products.length }}
          <span class="page-wishlist__count--text">{{
            $t('Common.products')
          }}</span>
        </p>
      </div>

      <div class="page-wishlist__body">
        <button class="page-wishlist__back" @click="goBack">
          <SvgIcon class="page-wishlist__back-icon" name="arrow" />
        </button>

        <template v-if="!!products?.length">
          <div class="page-wishlist__grid">
            <SecondaryCard
              v-for="variant in products"
              :key="variant.id"
              :name="variant?.product?.name || ''"
              :image="variant?.product?.pictures?.[0]?.url || ''"
              :is-favourite="true"
              :slug="variant?.product?.slug || ''"
              :variant="variant"
              @removeFromWishlist="openDeleteModal"
              @onSelect="selectProductForViewing(variant)"
              @addToCart="addToCart"
            />
          </div>

          <AuthCTA />
        </template>

        <WishlistEmpty v-else class="page-wishlist__empty" />
      </div>
    </div>
    <AdvantagesBlock />
    <ModalInfo
      :is-open="isOpenDeleteModal"
      sticker-name="question"
      :with-buttons="true"
      :text="$t('Account.confirm_delete_favourite_item')"
      @accept="removeFromWishlist"
      @close="closeDeleteModal"
    />
    <WishlistModalProduct
      :product="selectedProductForViewing"
      :wishlist-products="wishlistProducts"
      @onClose="clearSelectedProduct"
      @addToCart="addToCart"
    />
  </div>
</template>

<script lang="ts" setup>
import AdvantagesBlock from '~/components/common/AdvantagesBlock.vue'
import SecondaryCard from '~/components/cards/SecondaryCard.vue'
import WishlistModalProduct from '~/components/wishlist/WishlistModalProduct.vue'
import WishlistEmpty from '~/components/wishlist/WishlistEmpty.vue'
import AuthCTA from '~/components/common/AuthCTA.vue'

import { useWishlistStore } from '~~/store/wishlist'
import {
  IWishlistProductVariant,
  IWishlistProductWrapper,
} from '~~/types/wishlist.interface'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import { useCartStore } from '~~/store/cart'
import { COOKIE_CONFIG } from '~~/constants/cookie'

const router = useRouter()
const route = useRoute()
const wishlistStore = useWishlistStore()
const layoutStore = useLayoutStore()
const cartStore = useCartStore()

const isOpenDeleteModal = ref(false)
const slugForDelete = ref('')
const selectedProductForViewing = ref<IWishlistProductVariant>(null)

const wishlistProducts = computed<IWishlistProductWrapper[]>(() => {
  return wishlistStore.wishlist?.wishlistProducts
})

const products = computed<IWishlistProductVariant[]>(() => {
  return (
    wishlistProducts.value.map(
      (product: IWishlistProductWrapper) => product.variant
    ) || []
  )
})

const openDeleteModal = (slug: string) => {
  slugForDelete.value = slug

  isOpenDeleteModal.value = true
}

const closeDeleteModal = () => {
  slugForDelete.value = ''

  isOpenDeleteModal.value = false
}

const removeFromWishlist = async () => {
  await wishlistStore.removeItem(slugForDelete.value)

  closeDeleteModal()
}

const selectProductForViewing = (product: IWishlistProductVariant) => {
  layoutStore.openModal(EModals.WISHLIST_VIEW_PRODUCT)
  selectedProductForViewing.value = product
}

const clearSelectedProduct = () => {
  selectedProductForViewing.value = null
}

const addToCart = async (ean: string) => {
  await cartStore.handleAddToCart(ean)
}

const ModalInfo = defineAsyncComponent(
  () => import('~/components/common/ModalInfo.vue')
)

const cookie = useCookie('auth_cta_wishlist', COOKIE_CONFIG(10800000))

watch(
  () => route.path,
  (value, oldValue) => {
    if (value !== oldValue) {
      if (!cookie.value) {
        layoutStore.openModal(EModals.AUTH_CTA)

        cookie.value = 'true'
      }
    }
  },
  { immediate: true }
)

const goBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped>
.page-wishlist {
  &__container {
    padding: 0 20px;
    min-height: 100vh;
  }

  &__body {
    height: 100%;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }

  &__back {
    position: absolute;
    top: 15px;
    left: 21px;
    transform: rotate(180deg);
    width: 18px;
    height: 18px;
  }

  &__back-icon {
    width: 18px;
    height: 18px;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
  }

  &__count {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 16px;
    line-height: 21px;
    text-align: center;

    &--text {
      font-family: $font-secondary;
      font-weight: 440;
      font-size: 16px;
      line-height: 21px;
      text-align: center;
      display: none;
    }
  }

  &__grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    row-gap: 25px;
    column-gap: 16px;
    width: 100%;
  }

  &__empty {
    margin-top: 60px;
  }
}

@include media-md {
  .page-wishlist {
    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
  }
}

@include media-lg {
  .page-wishlist {
    &--empty {
      .page-wishlist {
        &__container {
          padding-top: 91px;
        }

        &__header {
          display: none;
        }
      }
    }
    &__container {
      padding: 67px 172px 133px 172px;
    }

    &__header {
      width: 100%;
      flex-direction: column;
      gap: 2px;
    }

    &__heading {
      font-weight: 480;
      font-size: 48px;
      line-height: 44px;
    }

    &__count {
      font-family: $font-primary;
      margin-top: 0px;
      font-weight: 400;
      font-size: 18px;
      line-height: 44px;

      &--text {
        font-family: $font-primary;
        font-weight: 400;
        font-size: 18px;
        line-height: 44px;
        display: inline;
      }
    }

    &__grid {
      grid-template-columns: repeat(auto-fill, minmax(311px, 1fr));
      column-gap: 20px;
      row-gap: 60px;
    }

    &__card {
      min-width: 311px;
    }

    &__empty {
      margin-top: 0;
    }
  }
}

@include media-xxl {
  .page-wishlist {
    &__container {
      padding-left: calc((100vw - 1800px) / 2);
      padding-right: calc((100vw - 1800px) / 2);
    }
  }
}
</style>
