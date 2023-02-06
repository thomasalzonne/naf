<template>
  <AppModalWrapper
    class="reset-password-modal"
    :is-open="isOpen"
    @close="closeModal"
  >
    <div class="reset-password-modal__body">
      <AuthModalHeader
        class="reset-password-modal__header"
        :title="$t('ResetPassword.title')"
        :description="$t('ResetPassword.subtitle')"
      />
      <ResetPasswordForm @submit="resetPassword" />
    </div>
  </AppModalWrapper>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { IResetPasswordForm } from '~~/types/auth.interface'
import { useAuthStore } from '~~/store/auth'
import { EStatus } from '~~/constants/status'

import ResetPasswordForm from '~/components/auth/ResetPasswordForm.vue'
import AppModalWrapper from '~/components/common/AppModalWrapper.vue'
import { EAuth } from '~~/constants/auth'

const emit = defineEmits(['openInfo'])

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const { locale, t } = useI18n()
const $route = useRoute()
const $router = useRouter()
const authStore = useAuthStore()

const closeModal = () => {
  const query = { ...$route.query }

  delete query.token

  query.authAction = EAuth.LOGIN

  $router.replace({
    query,
  })
}

const resetPassword = async (form: IResetPasswordForm) => {
  const token: string = $route.query?.token as string

  await authStore.resetPassword(form, token, locale.value)

  const status: EStatus = authStore.status

  if (status === EStatus.SUCCESS) {
    closeModal()

    emit('openInfo', t('ResetPassword.success_message'))
  }
}
</script>

<style lang="scss" scoped>
.reset-password-modal {
  & :deep(.app-modal-wrapper__body) {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-bottom: 0;
  }

  &__header {
    padding: 0px 0px 22px 0px;
  }
}

@include media-lg {
  .reset-password-modal {
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
