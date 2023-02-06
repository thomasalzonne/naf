<template>
  <div class="page-addresses">
    <p class="account-page-header page-addresses__header">
      {{ $t('Account.addresses') }}
    </p>
    <div class="page-addresses__container">
      <AppContentCard>
        <template #header>
          <p class="account-card-header page-addresses__card-header">
            {{ $t('Common.my_addresses') }}
          </p>
        </template>
        <template #body>
          <div v-if="pending" class="page-addresses__loader">
            <AppLoader />
          </div>
          <template v-else>
            <div class="page-addresses__card-body">
              <template v-if="isShowContent">
                <AccountAddressItem
                  v-for="address in addresses"
                  :key="address.id"
                  :address="address"
                  :with-checkbox="false"
                  @deleteAddress="openDeleteModal"
                />
              </template>
              <p v-else>{{ $t('Account.addresses_empty') }}</p>
            </div>
          </template>
        </template>
      </AppContentCard>
      <NuxtLink to="/account/addresses/create">
        <AppButton
          class="page-addresses__button"
          :title="$t('Common.add_address')"
          size="small"
        />
      </NuxtLink>
      <ModalInfo
        :is-open="isOpenDeleteModal"
        sticker-name="question"
        :with-buttons="true"
        :text="$t('Account.confirm_delete_address')"
        @accept="deleteAddress"
        @close="closeDeleteModal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import AppContentCard from '~/components/common/AppContentCard.vue'
import AccountAddressItem from '~/components/account/AccountAddressItem.vue'
import AppLoader from '~/components/common/AppLoader.vue'
import ModalInfo from '~/components/common/ModalInfo.vue'

import { useAddressesStore } from '~~/store/addresses'
import { IAddressItem } from '~/types/addresses.interface'
import { EStatus } from '~~/constants/status'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const addressesStore = useAddressesStore()
const $router = useRouter()
const isOpenDeleteModal = ref(false)
const addressIdForDelete = ref(null)

const { pending } = await useLazyAsyncData(
  'fetchAddressesPage',
  addressesStore.fetchAddresses
)

const addresses = computed<IAddressItem[]>(() => {
  return addressesStore?.addresses || []
})

const isShowContent = computed<boolean>(() => {
  return !!addresses.value.length
})

const deleteAddress = async () => {
  await addressesStore.deleteAddress(addressIdForDelete.value)

  const status = addressesStore.status

  if (status === EStatus.SUCCESS) {
    await addressesStore.fetchAddresses()

    closeDeleteModal()

    $router.push('/account/addresses')
  }
}

const closeDeleteModal = () => {
  isOpenDeleteModal.value = false
  addressIdForDelete.value = null
}

const openDeleteModal = (id: number) => {
  addressIdForDelete.value = id
  isOpenDeleteModal.value = true
}
</script>

<style lang="scss" scoped>
.page-addresses {
  padding-bottom: 60px;

  &__header {
    margin-left: 10px;
  }

  &__container {
    margin-top: 30px;
    max-width: 746px;
  }

  &__link {
    margin-top: 50px;
  }

  &__loader {
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__card-header {
    padding: 20px;
  }

  &__card-body {
    padding: 13px 25px 30px 25px;
  }

  &__button {
    margin-top: 20px;
    margin-left: 23px;
    max-width: 259px;
  }
}
</style>
