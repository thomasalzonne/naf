<template>
  <AppModalWrapper
    class="delete-modal"
    :is-open="isOpen"
    :is-close-on-click-outside="true"
    @close="closeModal"
  >
    <div class="delete-modal__header">
      <p class="delete-modal__heading">
        {{ $t('Cart.confirm_delete_item') }}
      </p>
    </div>

    <div class="delete-modal__body">
      <div class="delete-modal__product">
        <div class="delete-modal__product-img-container">
          <img class="delete-modal__product-img" :src="productImage" alt="" />
        </div>
        <div class="delete-modal__product-body">
          <p class="delete-modal__product-name">{{ productName }}</p>
          <div class="delete-modal__product-price-container">
            <p
              class="delete-modal__product-price"
              :class="{
                'delete-modal__product-price--discounted': originalPrice,
              }"
            >
              {{ $n(price, 'EUR') }}
            </p>
            <p
              v-if="originalPrice"
              class="delete-modal__product-price delete-modal__product-price--old"
            >
              {{ $n(originalPrice, 'EUR') }}
            </p>
          </div>
        </div>
      </div>

      <div class="delete-modal__checkbox-container">
        <AppCheckbox v-model="isFavouriteToggle">
          <template #label>
            <p class="delete-modal__checkbox-label">
              {{ $t('Cart.add_item_to_favourites') }}
            </p>
          </template>
        </AppCheckbox>
      </div>

      <div class="delete-modal__buttons">
        <AppButton :title="$t('Common.yes')" @click="confirmDelete" />
        <AppButton
          :title="$t('Common.no')"
          btn-style="outline"
          @click="cancelDelete"
        />
      </div>
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import AppCheckbox from '~/components/common/AppCheckbox.vue'
import AppButton from '~/components/common/AppButton.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import { ICartItem } from '~~/types/cart.interface'
import { useWishlistStore } from '~~/store/wishlist'
import { IWishlistProductWrapper } from '~~/types/wishlist.interface'

interface IProps {
  item: ICartItem
}
const emit = defineEmits(['confirm', 'cancel'])
const props = defineProps<IProps>()

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()
const wishlistStore = useWishlistStore()

const isOpen = computed(() => {
  return layoutStore.modals[EModals.CART_DELETE]
})

watch(
  () => isOpen.value,
  (value) => {
    value
      ? layoutStore.openModal(EModals.CART_DELETE)
      : layoutStore.closeModal(EModals.CART_DELETE)

    if (route.query?.authAction && value) {
      const query = { ...route.query }

      delete query.authAction

      router.replace({ query })
    }
  }
)

watch(
  () => route.query,
  () => {
    if (isOpen.value && route.query.authAction) {
      closeModal()
    }
  }
)

const isFavourite = computed<boolean>(() => {
  return !!wishlistStore.wishlist?.wishlistProducts?.find(
    (product: IWishlistProductWrapper) =>
      product.product?.slug === props.item?.variant?.product?.slug
  )
})

const isFavouriteToggle = computed({
  get() {
    return isFavourite.value
  },
  set(value: boolean) {
    toggleIsFavourite(value)
  },
})

const productImage = computed(() => {
  return props.item?.variant?.product?.pictures?.[0]?.url || ''
})

const productName = computed(() => {
  return props.item?.productName || ''
})

const originalPrice = computed(() => {
  const originalPrice = props?.item?.variant?.originalPrice
  const price = props?.item?.variant?.price

  if (originalPrice === price) return 0
  return transformPriceFromSylius(originalPrice)
})

const price = computed(() => {
  return transformPriceFromSylius(props?.item?.variant?.price)
})

const productSlug = computed(() => {
  return props.item?.variant?.product?.slug || ''
})

const toggleIsFavourite = (value: boolean) => {
  value
    ? wishlistStore.addToWishlist(productSlug.value)
    : wishlistStore.removeItem(productSlug.value)
}

const confirmDelete = () => {
  emit('confirm')
}

const cancelDelete = () => {
  emit('cancel')

  closeModal()
}

const closeModal = () => {
  layoutStore.closeModal(EModals.CART_DELETE)
}
</script>

<style lang="scss" scoped>
.delete-modal {
  &__header {
    padding: 0 0 20px 0;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 31px;
  }

  &__body {
    padding: 0px;
  }

  & :deep(.app-modal-wrapper__body) {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 0px;
  }

  &__product {
    display: flex;
    gap: 13px;
  }

  &__product-img-container {
    width: 130px;
    height: auto;
    flex-shrink: 0;
  }

  &__product-img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  &__product-name {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 16px;
    line-height: 21px;
    text-transform: uppercase;
  }

  &__product-price-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__product-price {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;

    &--old {
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: $color-dark-grey;
      text-decoration: line-through;
    }

    &--discounted {
      font-weight: 600;
      font-size: 20px;
      line-height: 44px;
    }
  }

  &__checkbox-container {
    margin-top: 20px;
  }

  &__checkbox-label {
    font-family: $font-secondary;
    font-weight: 440;
    font-size: 16px;
    line-height: 21px;
    margin-left: 11px;
  }

  &__buttons {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-top: 20px;
  }
}

@include media-lg {
  .delete-modal {
    &__header {
      padding: 45px 45px 40px 45px;
    }

    &__heading {
      font-size: 24px;
    }

    &__body {
      padding: 0 45px;
    }

    & :deep(.app-modal-wrapper__body) {
      padding-left: 29px;
      padding-right: 26px;
      padding-top: 23px;
    }

    &__buttons {
      margin-top: 35px;
    }
  }
}
</style>
