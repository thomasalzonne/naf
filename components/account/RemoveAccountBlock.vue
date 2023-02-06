<template>
  <AppContentCard class="remove-account">
    <template #header>
      <p class="account-card-header remove-account__heading">
        {{ $t('Account.remove_account') }}
      </p>
    </template>
    <template #body>
      <div class="remove-account__content">
        <p class="remove-account__text">
          {{ $t('Account.remove_account_description') }}
        </p>
        <AppButton
          class="remove-account__button"
          :title="$t('Account.remove_account_button')"
          size="small"
        />
      </div>
    </template>
  </AppContentCard>
</template>

<script lang="ts" setup>
import AppContentCard from '~/components/common/AppContentCard.vue'
import AppButton from '~/components/common/AppButton.vue'
</script>

<style lang="scss" scoped>
.remove-account {
  &__heading {
    padding: 20px 22px;
  }

  &__content {
    padding: 20px 22px;
    display: grid;
    display: flex;
    justify-content: space-between;
    gap: 101px;
  }

  &__text {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $color-black-opacity;
    max-width: 650px;
    width: 100%;
  }

  &__button {
    width: max-content;
    min-width: 209px;
  }
}
</style>
