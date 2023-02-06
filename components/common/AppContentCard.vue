<template>
  <div class="content-card">
    <div class="content-card__header">
      <slot name="header" />
    </div>
    <div class="content-card__body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-card {
  border: 1px solid $color-medium-grey;
  border-radius: 8px;

  &__header {
    border-bottom: 1px solid $color-light-grey;
  }
}
</style>
