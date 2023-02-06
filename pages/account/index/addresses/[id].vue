<template>
  <div class="edit-address">
    <p class="account-page-header edit-address__header">
      {{ $t('Account.addresses') }}
    </p>
    <AppContentCard class="edit-address__content">
      <template #header>
        <div class="edit-address__card-header">
          <p class="account-card-header">{{ $t('Account.edit_address') }}</p>
          <BackButton @back="goBack" />
        </div>
      </template>
      <template #body>
        <div class="edit-address__card-body">
          <AccountAddressForm
            :is-edit="true"
            :initial-form="initialForm"
            @submit="editAddress"
          />
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
import AppContentCard from '~/components/common/AppContentCard.vue'
import BackButton from '~/components/common/BackButton.vue'
import ModalInfo from '~/components/common/ModalInfo.vue'
import AccountAddressForm from '~/components/account/AccountAddressForm.vue'
import { useAddressesStore } from '~~/store/addresses'
import { IAddressItem } from '~~/types/addresses.interface'
import { EStatus } from '~~/constants/status'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const isOpenModal = ref(false)
const $router = useRouter()
const $route = useRoute()

const addressesStore = useAddressesStore()
const layoutStore = useLayoutStore()

const addressId = computed(() => {
  return $route.params?.id || null
})

const initialForm = computed(() => {
  return addressesStore.addresses.find(
    (address: IAddressItem) => address.id === +addressId.value
  )
})

const toggleModal = (): void => {
  isOpenModal.value = !isOpenModal.value

  if (isOpenModal.value) {
    layoutStore.openModal(EModals.ADDRESS)
  } else {
    layoutStore.closeModal(EModals.ADDRESS)
    addressesStore.fetchAddresses()

    goBack()
  }
}

const editAddress = async (form) => {
  form.id = addressId.value
  await addressesStore.editAddress(form)

  const status = addressesStore.status

  if (status === EStatus.SUCCESS) {
    toggleModal()
  }
}

const goBack = () => {
  $router.push('/account/addresses')
}
</script>

<style lang="scss" scoped>
.edit-address {
  padding-bottom: 60px;

  &__header {
    margin-left: 10px;
  }

  &__content {
    margin-top: 30px;
    max-width: 746px;
  }

  &__card-header {
    padding: 15px 25px 12px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__card-body {
    padding: 25px 47px 40px 27px;
  }
}
</style>
