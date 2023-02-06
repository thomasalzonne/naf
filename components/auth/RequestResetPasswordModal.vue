<template>
  <AppModalWrapper
    class="request-reset-password-modal"
    :is-open="isOpen"
    :is-show-back-button="true"
    @close="closeModal"
    @back="goToLogin"
  >
    <AuthModalHeader
      class="request-reset-password-modal__header"
      :title="$t('RequestResetPassword.title')"
      :description="$t('RequestResetPassword.subtitle')"
    />
    <RequestResetPasswordForm
      @submit="requestResetPassword"
      @back="goToLogin"
    />
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { IRequestResetPasswordForm } from '~~/types/auth.interface'
import { useAuthStore } from '~~/store/auth'
import { EStatus } from '~~/constants/status'

import RequestResetPasswordForm from '~/components/auth/RequestResetPasswordForm.vue'
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import { EAuth } from '~~/constants/auth'

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['openInfo'])

const { locale, t } = useI18n()
const $route = useRoute()
const $router = useRouter()
const authStore = useAuthStore()

const closeModal = () => {
  const query = { ...$route.query }

  delete query.authAction

  $router.replace({
    query,
  })
}

const goToLogin = () => {
  const query = { ...$route.query }

  query.authAction = EAuth.LOGIN

  $router.replace({
    query,
  })
}

const requestResetPassword = async (form: IRequestResetPasswordForm) => {
  await authStore.requestResetPassword(form.email, locale.value)

  const status: EStatus = authStore.status

  if (status === EStatus.SUCCESS) {
    closeModal()
    emit('openInfo', t('RequestResetPassword.success_message'))
  }
}
</script>

<style lang="scss" scoped>
.request-reset-password-modal {
  & :deep(.app-modal-wrapper__body) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 0;
  }

  &__header {
    padding: 0px 00px 22px 0px;
  }
}

@include media-lg {
  .request-reset-password-modal {
    & :deep(.app-modal-wrapper__body) {
      display: block;
      padding-bottom: 70px;
    }

    &__header {
      padding: 30px 0px 0 0px;
    }
  }
}
</style>
