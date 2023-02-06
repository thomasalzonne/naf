<template>
  <div class="app-loader">
    <SvgIcon class="app-loader__icon" :name="`loader_${type}`" />
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  type?: 'grey' | 'white'
}

withDefaults(defineProps<IProps>(), {
  type: 'grey',
})
</script>

<style lang="scss" scoped>
.app-loader {
  width: 24px;
  height: 24px;

  &__icon {
    width: 24px;
    height: 24px;
    animation: loader-animation 1s infinite linear;
  }
}

@keyframes loader-animation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
