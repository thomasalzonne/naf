<template>
  <div class="layout-account layout">
    <div class="layout__header">
      <AppHeader />
    </div>
    <main class="layout__content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts" setup>
import AppHeader from '~/components/header/AppHeader.vue'
import AppFooter from '~/components/footer/AppFooter.vue'
</script>

<style lang="scss" scoped>
.layout-account {
  &__breadcrumbs {
    display: none;
  }

  .layout__content {
    padding-bottom: 151px;
  }
}
</style>
