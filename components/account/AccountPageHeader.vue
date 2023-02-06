<template>
  <div class="account-page-header">
    <button
      v-if="withButton"
      class="account-page-header__icon-container"
      @click="goBack"
    >
      <SvgIcon class="account-page-header__back-icon" name="simply_arrow" />
    </button>
    <div class="account-page-header__content">
      <p class="account-page-header__title">{{ title }}</p>
    </div>
    <template v-if="subtitle">
      <div></div>
      <p
        class="account-page-header__subtitle"
        :class="{ 'account-page-header--left': withButton }"
      >
        {{ subtitle }}
      </p>
    </template>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  withButton: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['back'])

const goBack = () => {
  emit('back')
}
</script>

<style lang="scss" scoped>
.account-page-header {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 25px;
  margin: 11px 20px 4px 20px;

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__back-icon {
    width: 18px;
    height: 18px;
    transform: rotate(180deg);
    color: $color-pink;
  }

  &__title {
    font-weight: 400;
    font-size: 30px;
    line-height: 40px;
    font-family: $font-secondary;
  }

  &__subtitle {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-dark-grey;
  }
}

@include media-xl {
  .account-page-header {
    column-gap: 25px;
    row-gap: 20px;
    margin: 58px 0px 92px 0px;

    &__back-icon {
      width: 27px;
      height: 27px;
      margin-top: 5px;
    }

    &__title {
      font-size: 60px;
    }

    &__subtitle {
      font-size: 16px;
      line-height: 24px;

      &--left {
        margin-left: -8px;
      }
    }
  }
}
</style>
