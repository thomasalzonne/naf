<template>
  <div v-if="isOpen" class="app-menu" @click="closeMenu">
    <div class="app-menu__body" @click.stop="">
      <div class="app-menu__nav">
        <NuxtLink :to="category.slug" class="app-menu__name">
          {{ category?.name }}
        </NuxtLink>
      </div>
      <div class="app-menu__images">
        <img class="app-menu__image" :src="category.picture" alt="Image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ICategory from '~~/types/category.interface'

interface IAppMenuProps {
  isOpen: boolean
  category: ICategory | null
}
defineProps<IAppMenuProps>()
const emit = defineEmits(['close'])

const closeMenu = () => {
  emit('close')
}
</script>

<style lang="scss" scoped>
.app-menu {
  position: absolute;
  top: 100%;
  width: 100vw;
  min-height: 300px;
  border-top: 1px solid $color-light-grey;
  z-index: $z-index-menu;
  display: flex;
  flex-direction: column;
  padding: 38px 60px;

  &__body {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    gap: 30px;
  }

  &__nav {
    text-align: left;
  }

  &__images {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 24px;
  }

  &__image {
    max-height: 200px;
    height: 100%;
    width: auto;
  }

  &__name {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
  }
}

@include media-lg {
  .app-menu {
    background-color: $color-white;
  }
}
</style>
