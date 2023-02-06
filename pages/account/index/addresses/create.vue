<template>
  <div class="create-address">
    <p class="account-page-header create-address__header">
      {{ $t('Account.addresses') }}
    </p>
    <AppContentCard class="create-address__content">
      <template #header>
        <div class="create-address__card-header">
          <p class="account-card-header">{{ $t('Account.create_address') }}</p>
          <BackButton @back="goBack" />
        </div>
      </template>
      <template #body>
        <div class="create-address__card-body">
          <AccountAddressForm @submit="addAddress" />
        </div>
      </template>
    </AppContentCard>
    <ModalInfo
      :text="$t('Account.update_delivery_confirmation')"
      :is-open="isOpenModal"
      @close="toggleModal"
    />
  </div>
</template>

<script lang="ts" setup>
import BackButton from '~/components/common/BackButton.vue'
import AppContentCard from '~/components/common/AppContentCard.vue'
import ModalInfo from '~/components/common/ModalInfo.vue'
import AccountAddressForm from '~/components/account/AccountAddressForm.vue'

import { useAddressesStore } from '~~/store/addresses'
import { IAddressAddForm } from '~~/types/addresses.interface'
import { EStatus } from '~~/constants/status'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const isOpenModal = ref(false)
const $router = useRouter()
const addressesStore = useAddressesStore()
const layoutStore = useLayoutStore()

const toggleModal = async () => {
  isOpenModal.value = !isOpenModal.value

  if (isOpenModal.value) {
    layoutStore.openModal(EModals.ADDRESS)
  } else {
    layoutStore.closeModal(EModals.ADDRESS)

    await addressesStore.fetchAddresses()

    goBack()
  }
}

const goBack = () => {
  $router.push('/account/addresses')
}

const addAddress = async (form: IAddressAddForm): Promise<void> => {
  await addressesStore.addAddress(form)
  const status = addressesStore.status

  if (status === EStatus.SUCCESS) {
    toggleModal()
  }
}
</script>

<style lang="scss" scoped>
.create-address {
  height: 100%;
  width: 100%;
  padding-bottom: 60px;

  &__header {
    margin-left: 10px;
  }

  &__content {
    margin-top: 30px;
    max-width: 746px;
  }

  &__card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px 12px 22px;
  }

  &__card-body {
    padding: 25px 47px 40px 27px;
  }
}
</style>
