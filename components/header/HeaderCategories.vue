<template>
  <div class="header-categories">
    <button
      v-for="item in categories"
      :key="item.slug"
      class="header-categories__link"
      :class="{
        // 'header-categories__link--active': item.slug === activeCategorySlug,
      }"
      @click="selectCategory(item)"
    >
      {{ item.title }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { INavigationItem } from '~~/types/divat.interface'

interface IProps {
  categories: INavigationItem[]
}

withDefaults(defineProps<IProps>(), {
  categories: null,
})
const emit = defineEmits(['select-category'])

const selectCategory = (item: INavigationItem) => {
  item.type === 'category'
    ? navigateTo(`/collections/${item.slug}`)
    : emit('select-category', item)
}
</script>

<style lang="scss" scoped>
.header-categories {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;

  &__link {
    font-weight: 460;
    font-size: 14px;
    line-height: 32px;
    text-transform: uppercase;
    transition: $easeOut200;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &--active {
      text-shadow: $color-pink -1px 1px;
    }

    &:hover {
      text-shadow: $color-pink -1px 1px;
    }
  }
}
</style>
