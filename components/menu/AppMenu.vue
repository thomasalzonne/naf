<template>
  <Transition name="slide">
    <div v-if="isOpen" class="app-menu" @click="closeMenu">
      <div class="app-menu__header" @click.stop="">
        <button class="app-menu__close-button" @click="closeMenu">
          <SvgIcon class="app-menu__icon" :name="isOpen ? 'close' : 'burger'" />
        </button>
        <SvgIcon class="app-menu__logo" name="logo" />
      </div>
      <div class="app-menu__list" @click.stop="">
        <AppScroll
          direction="vertical"
          :with-scrollbar="true"
          container-class="app-menu__scroll-container"
          scrollbar-class="app-menu__scroll-bar"
          class="app-menu__scroll"
        >
          <!-- <MenuItem
            v-for="(category, i) in categories"
            :key="i"
            :category="category"
          /> -->
          <div class="app-menu__gradient"></div>
        </AppScroll>
      </div>
      <MenuFooter @close-modal="closeMenu" />
      <MenuCategory :is-open="isOpenCategory" @close="toggleCategory" />
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import MenuCategory from './MenuCategory.vue'
import MenuFooter from './MenuFooter.vue'
import AppScroll from '~/components/common/AppScroll.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'

interface IAppMenuProps {
  isOpen: boolean
}
const props = defineProps<IAppMenuProps>()
const emit = defineEmits(['close'])

const isOpenCategory = ref(false)
const $route = useRoute()
const layoutStore = useLayoutStore()

watch(
  () => $route.path,
  () => {
    if (props.isOpen) closeMenu()

    if (layoutStore.modals[EModals.CART]) {
      layoutStore.closeModal(EModals.CART)
    }
  }
)

const closeMenu = () => {
  emit('close')
}

const toggleCategory = (): void => {
  isOpenCategory.value = !isOpenCategory.value
}
</script>

<style lang="scss" scoped>
.app-menu {
  position: fixed;
  top: 60px;
  left: 0;
  background-color: rgba($color: $color-black, $alpha: 0.7);
  width: 100%;
  height: calc(100vh - $header-height-mobile - 72px);
  z-index: $z-index-menu;
  display: flex;
  flex-direction: column;

  &__list {
    width: 100%;
    height: 100%;
    background-color: $color-white;
    padding: 0px 20px 0px 20px;
    max-width: 360px;
  }

  &__header {
    display: none;
    background-color: $color-white;
    padding: 23px 60px;
  }

  &__icon {
    width: 20px;
    height: 20px;
    transition: $easeOut300;
    transform: rotateZ(0deg);
  }

  &__logo {
    width: 215px;
    height: 38px;
    margin-left: 71px;
    margin-top: 5px;
  }

  &__gradient {
    position: fixed;
    bottom: 72px;
    height: 145px;
    width: 100%;
    max-width: 320px;
    z-index: 1020;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.85) 80.21%
    );
  }

  & :deep(.app-menu__scroll-bar) {
    display: none;
  }

  .app-menu__scroll {
    & :deep(.app-scroll__wrapper) {
      padding-left: 0;
      padding-bottom: 120px;
    }
  }
}

@include media-lg {
  .app-menu {
    top: 0;
    left: 0;
    height: 100vh;
    background-color: rgba($color: $color-black, $alpha: 0.7);

    &__list {
      padding: 0px 50px 37px 27px;
      max-width: 508px;
      height: calc(100vh - 90px);
    }

    &__header {
      display: flex;
      max-width: 508px;
    }

    & :deep(.app-menu__scroll-container) {
      margin: 0px 0 20px 0;
      padding-top: 10px;
      height: calc(100vh - 90px);
      display: flex;
      flex-direction: column;
    }

    & :deep(.app-menu__scroll-bar) {
      display: block;
    }

    &__close-button {
      margin-top: -5px;

      &:active .app-menu__icon {
        color: $color-pink;
      }

      &:hover .app-menu__icon {
        transform: rotateZ(90deg);
        color: $color-pink;
      }
    }

    &__gradient {
      bottom: 0px;
      max-width: 431px;
    }

    .app-menu__scroll {
      & :deep(.app-scroll__wrapper) {
        padding-left: 23px;
      }
    }
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: $easeOut300;

  & .app-menu__list {
    transition: $easeOut300;
  }
  & .app-menu__header {
    transition: $easeOut300;
  }

  & .app-menu__icon {
    transition: $easeOut300;
  }
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  & .app-menu__list {
    transform: translateX(-100%);
  }

  & .app-menu__header {
    transform: translateX(-100%);
  }

  & .app-menu__icon {
    transform: translateX(-100%);
  }
}
</style>
