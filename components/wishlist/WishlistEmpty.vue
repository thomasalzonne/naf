<template>
  <div class="empty-wishlist">
    <div class="empty-wishlist__icon-container">
      <img
        class="empty-wishlist__icon"
        src="~/assets/images/piggy.png"
        alt="Piggy"
      />
    </div>
    <p class="empty-wishlist__title">{{ $t('Wishlist.empty_heading') }},</p>
    <p class="empty-wishlist__text">
      {{ $t('Wishlist.empty_text') }}
    </p>
    <div class="empty-wishlist__button-container"></div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.empty-wishlist {
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
  .empty-wishlist {
    &__title {
      font-size: 24px;
      margin-top: 29px;
      line-height: 44px;
      margin-top: 28px;
    }

    &__text {
      margin-top: 22px;
      max-width: 650px;
    }

    &__button-container {
      margin-top: 36px;
    }

    &__button {
      max-width: 336px;
      margin: 0 auto;
    }
  }
}
</style>
