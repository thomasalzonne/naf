<template>
  <header ref="header" class="header">
    <div class="header__container">
      <NuxtLink to="/" class="header__logo">
        <SvgIcon class="header__logo-icon" name="logo" />
      </NuxtLink>
      <div class="header__center">
        <HeaderSearch
          v-if="isShowSearch"
          :is-active="isOpenSearchModal"
          @handleClick="openSearchModal"
          @closeSearch="closeSearchModal"
        />
        <HeaderCategories
          class="header__categories"
          :categories="categories"
          :active-category-slug="activeCategory?.slug || null"
          @select-category="openMegaMenu"
        />
      </div>

      <HeaderNavigation
        class="header__nav"
        :class="{ 'header__nav--hide': isOpenMenu }"
        :is-authorized="isAuthorized"
        :is-error-page="isErrorPage"
        :is-show-search-button="!isShowSearch"
        @open-search="toggleSearch"
        @open-cart="openCartModal"
      />
    </div>
    <MegaMenu
      :is-open="!!activeCategory"
      :category="activeCategory"
      @close="closeMenu"
    />
    <AppMenu :is-open="isOpenMenu" @close="closeMenu" />
    <SearchModal :is-open="isOpenSearchModal" @close="closeSearchModal" />
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderCategories from './HeaderCategories.vue'
import HeaderNavigation from './HeaderNavigation.vue'
import HeaderSearch from './HeaderSearch.vue'
import AppMenu from '~/components/menu/AppMenu.vue'
import SearchModal from '~/components/modals/SearchModal.vue'
import MegaMenu from '~/components/menu/MegaMenu.vue'
import { useAuthStore } from '~~/store/auth'
import { useCartStore } from '~/store/cart'
import { EModals } from '~~/constants/modals'
import { useLayoutStore } from '~~/store/layout'
import ICategory from '~~/types/category.interface'
import { useCommonStore } from '~~/store/common'
import { INavigationItem } from '~~/types/divat.interface'

export default defineComponent({
  name: 'AppHeader',
  components: {
    AppMenu,
    SearchModal,
    HeaderNavigation,
    HeaderCategories,
    MegaMenu,
    HeaderSearch,
  },
  props: {
    isErrorPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      layoutStore: useLayoutStore(),
      commonStore: useCommonStore(),
      isShowSearch: false,
      activeCategory: null,
    }
  },
  computed: {
    isAuthorized(): boolean {
      return useAuthStore().isAuthorized
    },
    isItemsInCart(): boolean {
      return useCartStore().itemsQuantity > 0
    },
    isOpenSearchModal(): boolean {
      return this.layoutStore.modals[EModals.SEARCH]
    },
    isOpenMenu(): boolean {
      return this.layoutStore.modals[EModals.MENU]
    },
    isMobile(): boolean {
      return this.layoutStore.windowWidth < 992
    },
    categories(): INavigationItem[] {
      return this.commonStore?.data?.navigations?.main || []
    },
  },
  methods: {
    openMegaMenu(category: ICategory) {
      if (this.activeCategory?.slug === category.slug) {
        this.activeCategory = null
        return
      }
      this.activeCategory = category
    },
    closeMegeMenu(): void {
      this.activeCategory = null
    },
    toggleMenu(): void {
      this.isOpenMenu
        ? this.layoutStore.closeModal(EModals.MENU)
        : this.layoutStore.openModal(EModals.MENU)
    },
    closeMenu(): void {
      this.layoutStore.closeModal(EModals.MENU)
    },
    openSearchModal(): void {
      this.layoutStore.openModal(EModals.SEARCH)
    },
    toggleSearch(): void {
      this.isShowSearch = !this.isShowSearch
    },
    closeSearchModal(): void {
      this.layoutStore.closeModal(EModals.SEARCH)
    },
    openCartModal(): void {
      this.isMobile
        ? navigateTo('/cart')
        : this.layoutStore.openModal(EModals.CART)
    },
  },
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 22px 20px 23px 18px;
  background-color: $color-white;
  position: relative;
  max-height: $header-height-mobile;

  &__nav {
    margin-left: auto;

    &--hide {
      display: none;
    }
  }

  &__logo {
    width: 119px;
    height: 30px;
  }

  &__logo-icon {
    width: 119px;
    height: 30px;
  }

  &__container {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__center {
    display: none;
    flex-direction: column;
    justify-content: center;
    padding: 0 36px 0 47px;
    width: 100%;

    &--active {
      .header__categories {
        margin-top: 13px;
      }
    }
  }
}

@include media-lg {
  .header {
    padding: 20px 0px 15px 0px;
    max-height: $header-height-desktop;
    box-shadow: $header-box-shadow;
    backdrop-filter: blur(5px);

    &__logo {
      width: 162px;
      height: 41px;
      margin-top: 5px;
      margin-left: 30px;
    }

    &__logo-icon {
      width: 162px;
      height: 41px;
    }

    &__container {
      padding: 0 60px 0 61px;
    }

    &__nav {
      &--hide {
        display: block;
      }
    }

    &__center {
      display: flex;
    }
  }
}
</style>
