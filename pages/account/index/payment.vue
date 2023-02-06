<template>
  <div class="page-payment">
    <p class="account-page-header page-payment__header">
      {{ $t('Account.payment') }}
    </p>
    <AppContentCard class="page-payment__card">
      <template #header>
        <p class="account-card-header page-payment__card-header">
          {{ $t('Account.my_payments') }}
        </p>
      </template>
      <template #body>
        <div class="page-payment__card-body">
          <AccountPaymentEmpty v-if="isEmpty" @addPayment="toggleIsEmpty" />
          <AccountPaymentItem v-else @editPayment="toggleIsEmpty" />
        </div>
      </template>
    </AppContentCard>
    <AppButton
      class="page-payment__button"
      :title="$t('Account.add_payment_method')"
      size="small"
      @click="toggleIsEmpty"
    />
  </div>
</template>

<script lang="ts" setup>
import AppButton from '~/components/common/AppButton.vue'
import AppContentCard from '~/components/common/AppContentCard.vue'
import AccountPaymentItem from '~~/components/account/AccountPaymentItem.vue'
import AccountPaymentEmpty from '~/components/account/AccountPaymentEmpty.vue'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})

const isEmpty = ref(false)

const toggleIsEmpty = () => {
  isEmpty.value = !isEmpty.value
}
</script>

<style lang="scss" scoped>
.page-payment {
  &__header {
    margin-left: 10px;
  }

  &__card {
    margin-top: 30px;
    max-width: 703px;
  }

  &__card-header {
    padding: 18px 20px 18px 26px;
  }

  &__card-body {
    padding: 22px 45px 30px 26px;
  }

  &__button {
    margin-top: 18px;
    margin-left: 20px;
    max-width: 259px;
  }
}
</style>
