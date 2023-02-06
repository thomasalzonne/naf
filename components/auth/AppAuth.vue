<template>
  <div>
    <LoginModal
      :is-open="currentAction === EAuth.LOGIN && isOpenModal"
      :is-checkout="isCheckout"
      @openInfo="openInfoModal"
    />
    <RegistrationModal
      :is-open="currentAction === EAuth.REGISTRATION && isOpenModal"
      :is-checkout="isCheckout"
      @openInfo="openInfoModal"
    />
    <RequestResetPasswordModal
      :is-open="currentAction === EAuth.RESET_PASSWORD_REQUEST && isOpenModal"
      :is-checkout="isCheckout"
      @openInfo="openInfoModal"
    />
    <ResetPasswordModal
      :is-open="currentAction === EAuth.RESET_PASSWORD && isOpenModal"
      :is-checkout="isCheckout"
      @openInfo="openInfoModal"
    />
    <PreAuthModal :is-open="currentAction === EAuth.PRE_AUTH && isOpenModal" />
    <ModalInfo
      :text="infoText"
      :is-open="isOpenInfoModal"
      sticker-name="sun"
      @close="closeInfoModal"
    />
  </div>
</template>

<script lang="ts" setup>
import LoginModal from '~/components/auth/LoginModal.vue'
import RegistrationModal from '~/components/auth/RegistrationModal.vue'
import RequestResetPasswordModal from '~/components/auth/RequestResetPasswordModal.vue'
import ModalInfo from '~/components/common/ModalInfo.vue'
import ResetPasswordModal from '~/components/auth/ResetPasswordModal.vue'
import PreAuthModal from '~/components/auth/PreAuthModal.vue'

import { EAuth } from '~~/constants/auth'
import { useAuthStore } from '~~/store/auth'
import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

const isOpenInfoModal = ref(false)
const infoText = ref('')
const $route = useRoute()
const $router = useRouter()
const authStore = useAuthStore()
const layoutStore = useLayoutStore()

const currentAction = computed(() => {
  const { authAction } = $route.query

  return authAction || null
})

const isCheckout = computed(() => {
  const routePath = $route.path
  const checkoutRoutes = ['/cart', 'checkout']

  return checkoutRoutes.includes(routePath)
})

const isOpenModal = computed(() => {
  return layoutStore.modals[EModals.AUTH]
})

watch(
  () => $route.query?.authAction,
  (value, oldValue) => {
    if (value !== oldValue) authStore.reset()
  }
)

watch(
  currentAction,
  (value) => {
    value
      ? layoutStore.openModal(EModals.AUTH)
      : layoutStore.closeModal(EModals.AUTH)

    if (!value) authStore.reset()
  },
  { immediate: true }
)

watch(isOpenModal, (value) => {
  if (!value) {
    const query = { ...$route.query }

    delete query.authAction

    $router.replace({ query })
  }
})

const openInfoModal = (text: string) => {
  infoText.value = text

  isOpenInfoModal.value = true
}

const closeInfoModal = () => {
  isOpenInfoModal.value = false
}
</script>

<style lang="scss" scoped></style>
