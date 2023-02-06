<template>
  <div
    class="faq-subitem"
    :class="{ 'faq-subitem--active': isActive }"
    @click="handleClick"
  >
    <div class="faq-subitem__header">
      <p class="faq-subitem__title">Test</p>
      <div class="faq-subitem__icon-container">
        <SvgIcon class="faq-subitem__icon" name="chevron" />
      </div>
    </div>
    <div v-if="isActive" class="faq-subitem__body">
      <p class="faq-subitem__content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, cum?
        Unde voluptatibus eveniet qui doloremque culpa! Nostrum nisi delectus
        nihil amet facere repudiandae excepturi impedit natus voluptas adipisci!
        Similique consequuntur quae neque maiores quo consectetur, nemo
        explicabo sapiente in ipsa nostrum tempore sit assumenda voluptates.
        Iste dolore quos enim molestias.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IProps {
  index: number
  activeIndex: number
}

const props = withDefaults(defineProps<IProps>(), {
  index: 1,
  activeIndex: null,
})

const emit = defineEmits(['changeActiveIndex'])

const isActive = computed(() => {
  return props.index === props.activeIndex
})

const handleClick = () => {
  emit('changeActiveIndex', props.index)
}
</script>

<style lang="scss" scoped>
.faq-subitem {
  background-color: $color-light-grey;
  border-radius: 10px;
  border: 1px solid $color-light-grey;

  &--active {
    background-color: $color-white;
    border-color: $color-pink;

    .faq-subitem {
      &__title {
        color: $color-pink;
      }

      &__icon {
        color: $color-pink;
        transform: rotate(180deg);
      }

      &__header {
        padding-bottom: 10px;
      }
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 25px 13px 13px;
  }

  &__title {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: $color-dark-grey;
    text-transform: uppercase;
  }

  &__icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__icon {
    width: 12px;
    height: 12px;
    transform: rotate(90deg);
    color: $color-dark-grey;
  }

  &__body {
    padding: 0px 15px 19px 13px;
  }

  &__content {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
}
</style>
