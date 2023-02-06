<template>
  <div class="page-favourites">
    <p class="account-page-header page-favourites__header">
      {{ $t('Account.my_favourites_title') }}
    </p>
    <p class="page-favourites__count">
      {{ wishlistProducts?.length }} {{ $t('Common.products') }}
    </p>
    <div class="page-favourites__content">
      <AccountEmptyContent
        v-if="isEmpty"
        :text="$t('Account.favourites_empty')"
        icon-name="heart"
      />
      <div v-else class="page-favourites__grid">
        <AccountFavouriteItem
          v-for="product in wishlistProducts"
          :key="product?.product?.id"
          :product="product"
          @removeItem="openDeleteModal"
        />
      </div>
    </div>
    <ModalInfo
      :is-open="isOpenDeleteModal"
      sticker-name="question"
      :with-buttons="true"
      :text="$t('Account.confirm_delete_favourite_item')"
      @accept="deleteItem"
      @close="closeDeleteModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import AccountEmptyContent from '~/components/account/AccountEmptyContent.vue'
import AccountFavouriteItem from '~/components/account/AccountFavouriteItem.vue'
import ModalInfo from '~/components/common/ModalInfo.vue'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'

import { useWishlistStore } from '~~/store/wishlist'
import { IWishlistProductWrapper } from '~~/types/wishlist.interface'

definePageMeta({
  middleware: 'auth',
})

const { t } = useI18n()
const wishlistStore = useWishlistStore()
const breadcrumbsStore = useBreadcrumbsStore()
const isOpenDeleteModal = ref(false)
const deleteItemSlug = ref(null)

const wishlistProducts = computed<IWishlistProductWrapper[]>(() => {
  return wishlistStore.wishlist?.wishlistProducts || []
})

const isEmpty = computed(() => {
  return !wishlistProducts?.value?.length
})

const openDeleteModal = (slug: string) => {
  isOpenDeleteModal.value = true
  deleteItemSlug.value = slug
}

const closeDeleteModal = () => {
  isOpenDeleteModal.value = false
  deleteItemSlug.value = null
}

const deleteItem = async () => {
  await wishlistStore.removeItem(deleteItemSlug.value)

  closeDeleteModal()
}

onMounted(() => {
  breadcrumbsStore.updateBreadcrumbs([
    {
      name: t('Breadcrumbs.account'),
      path: '/account',
    },
  ])
})
</script>

<style lang="scss">
.page-favourites {
  &__header {
    font-weight: 480;
    font-size: 48px;
    line-height: 44px;
  }

  &__content {
    margin-top: 13px;
  }

  &__count {
    font-weight: 400;
    font-size: 18px;
    line-height: 44px;
    margin-top: 3px;
    text-transform: lowercase;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(322px, 1fr));
    column-gap: 17px;
    row-gap: 20px;
  }
}
</style>
