<template>
  <div class="page-subscriptions">
    <p class="account-page-header page-subscriptions__header">
      {{ $t('Account.my_subscriptions') }}
    </p>
    <div class="page-subscriptions__content">
      <AppContentCard class="page-subscriptions__card">
        <template #header>
          <p class="account-card-header page-subscriptions__card-header">
            {{ $t('Account.newsletter_title') }}
          </p>
        </template>
        <template #body>
          <div class="page-subscriptions__card-body">
            <div>
              <p class="page-subscriptions__title">
                {{ $t('Account.newsletter_label') }}
              </p>
              <p class="page-subscriptions__description">
                {{ $t('Account.newsletter_description') }}
              </p>
            </div>
            <AppToggle v-model="isSubscribedToNewsletter" />
          </div>
        </template>
      </AppContentCard>
      <AppContentCard class="page-subscriptions__card">
        <template #header>
          <p class="account-card-header page-subscriptions__card-header">
            {{ $t('Account.sms_title') }}
          </p>
        </template>
        <template #body>
          <div class="page-subscriptions__card-body">
            <div>
              <p class="page-subscriptions__title">
                {{ $t('Account.sms_label') }}
              </p>
              <p class="page-subscriptions__description">
                {{ $t('Account.sms_description') }}
              </p>
            </div>
            <AppToggle v-model="isSms" />
          </div>
        </template>
      </AppContentCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppContentCard from '~~/components/common/AppContentCard.vue'
import AppToggle from '~/components/common/AppToggle.vue'
import { EStatus } from '~~/constants/status'
import { useProfileStore } from '~~/store/profile'

definePageMeta({
  middleware: 'auth',
})

const profileStore = useProfileStore()
const isSms = ref(false)

const isPending = computed(() => {
  return profileStore.status === EStatus.PENDING
})

const isSubscribedToNewsletter = computed({
  get() {
    return profileStore.profile?.subscribedToNewsletter
  },
  set(value: boolean) {
    if (isPending.value) return

    if (value !== isSubscribedToNewsletter.value) {
      profileStore.editProfile({
        subscribedToNewsletter: value,
      })
    }
  },
})
</script>

<style lang="scss" scoped>
.page-subscriptions {
  &__header {
    margin-left: 10px;
  }

  &__card {
    &:not(:first-child) {
      margin-top: 21px;
    }
  }

  &__content {
    margin-top: 30px;
    max-width: 703px;
  }

  &__card-header {
    padding: 17px 20px 18px 25px;
  }

  &__card-body {
    padding: 18px 30px 25px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  &__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
  }

  &__description {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: $color-black-opacity;
    margin-top: 5px;
  }
}
</style>
