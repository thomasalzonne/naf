<template>
  <div class="header-nav">
    <div class="header-nav__container">
      <HeaderNavigationItem
        v-if="isShowSearchButton"
        class="header-nav__search"
        :is-disabled="isErrorPage"
        icon="search"
        @trigger="openSearchModal"
      />

      <HeaderNavigationItem
        class="header-nav__account"
        :is-disabled="isErrorPage"
        icon="account"
        @trigger="openLoginModal"
      />

      <HeaderNavigationItem
        class="header-nav__favourites"
        :is-disabled="isErrorPage"
        icon="heart"
        :badge-value="wishlistItemsQuantity"
        @trigger="goToFavourites"
      />

      <HeaderNavigationItem
        class="header-nav__cart"
        :is-disabled="isErrorPage"
        :badge-value="cartItemsQuantity"
        icon="bag_outline"
        @trigger="openCart"
      />

      <HeaderNavigationItem
        class="header-nav__pin"
        :is-disabled="isErrorPage"
        icon="pin_outline"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderNavigationItem from '~/components/header/HeaderNavigationItem.vue'

import { EAuth } from '~~/constants/auth'
import { useWishlistStore } from '~~/store/wishlist'
import { useCartStore } from '~~/store/cart'

interface IProps {
  isOpenSearch?: boolean
  isAuthorized: boolean
  isErrorPage: boolean
  isShowSearchButton?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  isOpenSearch: false,
  isAuthorized: false,
  isErrorPage: false,
  isShowSearchButton: true,
})
const emit = defineEmits(['open-search', 'open-cart'])

const router = useRouter()
const route = useRoute()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const wishlistItemsQuantity = computed<number>(() => {
  return wishlistStore?.wishlist?.wishlistProducts?.length || 0
})

const cartItemsQuantity = computed<number>(() => {
  return cartStore?.itemsQuantity || 0
})

const openSearchModal = () => {
  emit('open-search')
}

const openLoginModal = () => {
  if (!props.isAuthorized)
    router.push({
      query: { ...route.query, authAction: EAuth.LOGIN },
    })
  else router.push('/account')
}

const openCart = () => {
  emit('open-cart')
}

const goToFavourites = () => {
  props.isAuthorized
    ? router.push('/account/favourites')
    : router.push('/wishlist')
}
</script>

<style lang="scss" scoped>
.header-nav {
  &__container {
    display: flex;
    align-items: flex-start;
    gap: 25px;
  }

  &__pin {
    display: none;
  }
}

@include media-lg {
  .header-nav {
    &__container {
      gap: 34px;
      display: flex;
      margin-right: 0px;
    }

    &__pin {
      display: block;
    }
  }
}
</style>
