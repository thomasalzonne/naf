<template>
  <div class="page-account page-account--with-data">
    <div class="page-account__main-info">
      <div class="page-account__sidebar">
        <AccountNavigation />
      </div>
      <div class="page-account__content">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AccountNavigation from '~/components/account/AccountNavigation.vue'

definePageMeta({
  layout: 'account',
  middleware: 'auth',
})
</script>

<style lang="scss">
.page-account {
  &__main-info {
    margin-top: 46px;
    display: grid;
    grid-template-columns: 250px 1fr;
    width: 100%;
  }
}

@include media-lg {
  .page-account {
    &__main-info {
      display: grid;
      column-gap: 20px;
      padding: 0 20px;
    }
  }
}

@include media-xl {
  .page-account {
    &__main-info {
      column-gap: 60px;
      padding: 0 60px;
    }
  }
}
</style>
