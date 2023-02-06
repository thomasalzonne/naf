<template>
  <div class="faq-item" :class="{ 'faq-item--active': isActive }">
    <div class="faq-item__header" @click="changeActiveIndex">
      <p class="faq-item__title">{{ index }}. Test</p>
      <div class="faq-item__icon-container">
        <SvgIcon class="faq-item__icon" :name="isActive ? 'minus' : 'plus'" />
      </div>
    </div>
    <div v-if="isActive" class="faq-item__body">
      <FaqSubitem
        v-for="i in 1"
        :key="i"
        class="faq-item__subitem"
        :index="i"
        :active-index="activeSubIndex"
        @changeActiveIndex="changeActiveSubIndex"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FaqSubitem from '~/components/common/FaqSubitem.vue'

interface IProps {
  index: number
  activeIndex: number
}

const props = withDefaults(defineProps<IProps>(), {
  index: 1,
  activeIndex: null,
})

const activeSubIndex = ref<number>(null)

const emit = defineEmits(['changeActiveIndex'])

const isActive = computed(() => {
  return props.activeIndex === props.index
})

const changeActiveIndex = () => {
  emit('changeActiveIndex', props.index)
}

const changeActiveSubIndex = (index: number) => {
  activeSubIndex.value === index
    ? (activeSubIndex.value = null)
    : (activeSubIndex.value = index)
}
</script>

<style lang="scss" scoped>
.faq-item {
  border: 1px solid $color-medium-grey;
  border-radius: 10px;

  &--active {
    .faq-item {
      &__header {
        border-bottom: 1px solid $color-light-grey;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 25px 17px 31px;
  }

  &__title {
    font-weight: 900;
    font-size: 20px;
    line-height: 22px;
  }

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__body {
    padding: 14px 32px 27px 23px;
  }

  &__subitem {
    &:not(:first-child) {
      margin-top: 17px;
    }
  }
}
</style>
