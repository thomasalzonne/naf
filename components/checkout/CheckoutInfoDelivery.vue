<template>
  <div class="checkout-info-delivery">
    <div class="checkout-info-delivery__header">
      <div class="checkout-info-delivery__icon-container">
        <SvgIcon class="checkout-info-delivery__icon" name="delivery" />
      </div>
      <p class="checkout-info-delivery__title">
        {{ $t('Cart.delivery_and_return') }}
      </p>
    </div>
    <div class="checkout-info-delivery__content">
      <p
        class="checkout-info-delivery__text"
        v-html="$t('Cart.delivery_text')"
      />
      <p class="checkout-info-delivery__text" v-html="$t('Cart.return_text')" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkout-info-delivery {
  border-radius: 10px;
  border: 1px solid $color-medium-grey;
  padding: 30px;
  margin-top: 27px;

  &__header {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  &__title {
    font-weight: 460;
    font-size: 16px;
    line-height: 21px;
  }

  &__icon-container {
    flex-shrink: 0;
    width: 64px;
    height: 34px;
  }

  &__icon {
    width: 64px;
    height: 34px;
  }

  &__content {
    margin-top: 23px;
    padding-left: 10px;

    p {
      &:not(:first-child) {
        margin-top: 20px;
      }
    }
  }

  &__text {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: $color-black-opacity;

    b {
      font-weight: 500;
    }
  }
}
</style>
