<template>
  <div class="empty-cart">
    <div class="empty-cart__icon-container">
      <img
        class="empty-cart__icon"
        src="~/assets/images/piggy.png"
        alt="Piggy"
      />
    </div>
    <p class="empty-cart__title">{{ $t('CartModal.empty_heading') }},</p>
    <p class="empty-cart__text">
      {{ $t('CartModal.empty_text') }}
    </p>
    <div class="empty-cart__button-container"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.empty-cart {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: auto;

  &__icon-container {
    width: 180px;
    height: 180px;
  }

  &__icon {
    color: $color-light-grey;
    width: 180px;
    height: 180px;
  }

  &__title {
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 20px;
    line-height: 44px;
    text-align: center;
    margin-top: 26px;
  }

  &__text {
    margin-top: 10px;
    font-weight: 400;
    font-size: 13px;
    line-height: 24px;
    text-align: center;
    max-width: 339px;
  }

  &__button-container {
    margin-top: 30px;
    width: 100%;
  }
}

@include media-lg {
  .empty-cart {
    margin-top: 0;
    justify-content: flex-start;
    align-items: flex-start;

    &__title {
      font-size: 24px;
      margin-top: 29px;
      line-height: 44px;
    }

    &__text {
      margin-top: 22px;
    }
  }
}
</style>
