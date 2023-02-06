<template>
  <div class="account-empty-content">
    <div v-if="iconName" class="account-empty-content__icon-container">
      <SvgIcon class="account-empty-content__icon" :name="iconName" />
    </div>
    <p v-if="text" class="account-empty-content__text">
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  iconName: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss" scoped>
.account-empty-content {
  margin-top: 83px;
  margin-bottom: 114px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__icon-container {
    width: 153px;
    height: 153px;
    display: flex;
  }

  &__icon {
    width: 153px;
    height: 153px;
    color: $color-medium-grey;
  }

  &__text {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: $color-medium-grey;
    margin-top: 20px;
  }
}

@include media-xl {
  .account-empty-content {
    margin-top: 83px;
    margin-bottom: 114px;

    &__icon-container {
      width: 261px;
      height: 261px;
    }

    &__icon {
      width: 261px;
      height: 261px;
    }

    &__text {
      margin-top: 69px;
    }
  }
}
</style>
