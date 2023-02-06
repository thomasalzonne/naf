<template>
  <div v-if="isOpen" class="search-modal">
    <div class="search-modal__wrapper">
      <div v-if="state === 'start'" class="search-modal__header">
        <button class="search-modal__close" @click="closeModal">
          <span class="search-modal__close-title">
            {{ $t('Common.close') }}
          </span>
          <div class="search-modal__close-icon-container">
            <SvgIcon class="search-modal__close-icon" name="close" />
          </div>
        </button>
      </div>
      <div class="search-modal__body">
        <div v-if="state === 'no_results'" class="search-modal__no-results">
          {{ $t('Search.no_results', { n: search }) }}
        </div>

        <div
          v-if="state == 'start' || state === 'no_results'"
          class="search-modal__recommendations"
        >
          <div>
            <div class="search-modal__recommendation-title">
              {{ $t('Search.suggestions') }}
            </div>
            <template v-if="suggestionsLinks.length">
              <NuxtLink
                v-for="(item, index) in suggestionsLinks"
                :key="index"
                :to="item.url"
                class="search-modal__recommendation-item"
                :class="item.image ? 'search-modal__recommendation-image' : ''"
              >
                <div>
                  {{ item.title }}
                </div>
              </NuxtLink>
            </template>
          </div>
          <div class="search-modal__banners">
            <template v-if="suggestionsBanners.length">
              <NuxtLink
                v-for="(item, index) in suggestionsBanners"
                :key="index"
                :to="item.url"
                class="banner"
                :class="item.image ? 'search-modal__recommendation-image' : ''"
              >
                <img class="banner__img" :src="item.image" alt="" />
                <div class="banner__content">
                  <p class="banner__name">{{ item.title }}</p>
                </div>
              </NuxtLink>
            </template>
          </div>
        </div>

        <div v-if="state === 'no_results'" class="search-modal__novelty">
          <NoveltyBlock id="search_novelty" />
        </div>

        <div v-if="state == 'searching'" class="search-modal__catalog">
          <CatalogWrapper
            :for-search="true"
            :search="search"
            @noResults="handleNoResults"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CatalogWrapper from '~~/components/catalog/CatalogWrapper.vue'
import NoveltyBlock from '~/components/blocks/NoveltyBlock.vue'

import { useLayoutStore } from '~~/store/layout'
import { EModals } from '~~/constants/modals'
import { useNavigationsStore } from '~~/store/navigations'
import INavigation from '~~/types/navigation.interface'

enum ESearchState {
  START = 'start',
  SEARCHING = 'searching',
  NO_RESULTS = 'no_results',
}

interface IProps {
  isOpen: boolean
}

const emit = defineEmits(['close'])
const props = defineProps<IProps>()
const route = useRoute()
const router = useRouter()
const navigationsStore = useNavigationsStore()
const layoutStore = useLayoutStore()

const state = ref(ESearchState.START)

const search = computed<string>(() => {
  return route.query?.search?.toString() || ''
})

const suggestions = computed<INavigation[]>(() => {
  return navigationsStore?.navigations?.recherche || []
})

const suggestionsLinks = computed(() => {
  return (
    suggestions.value.filter((suggestion: INavigation) => !suggestion.image) ||
    []
  )
})

const suggestionsBanners = computed(() => {
  return (
    suggestions.value.filter((suggestion: INavigation) => suggestion.image) ||
    []
  )
})

watch(
  () => props.isOpen,
  (value: boolean) => {
    if (value) {
      useLayoutStore().openModal(EModals.SEARCH)

      if (value) {
        state.value =
          search.value.length > 2 ? ESearchState.SEARCHING : ESearchState.START
      }
    } else {
      useLayoutStore().closeModal(EModals.SEARCH)
    }
  }
)

watch(
  () => route.path,
  () => {
    closeModal()
  }
)

watch(
  () => search.value,
  (value: string) => {
    state.value = value.length > 2 ? ESearchState.SEARCHING : ESearchState.START
  }
)

const closeModal = () => {
  emit('close')
  const query = { ...route.query }

  delete query.search

  router.replace({ query })

  layoutStore.closeModal(EModals.SEARCH)
}

const handleNoResults = () => {
  state.value = ESearchState.NO_RESULTS
}
</script>

<style lang="scss" scoped>
.search-modal {
  position: fixed;
  top: 60px;
  left: 0;
  background-color: $color-white;
  width: 100%;
  height: calc(100vh - 60px);
  z-index: $z-index-modal;

  &__wrapper {
    height: auto;
    max-height: calc(100vh - 60px);
    overflow-y: scroll;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 13px 20px;
  }

  &__body {
    margin: 0 0px 31px 0px;
    padding-bottom: 80px;
    height: 100%;
  }

  &__categories {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 44px;
    row-gap: 6px;
  }

  &__category {
    position: relative;
    &--with-badge {
      padding-right: 10px;
    }
  }

  &__category-title {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
  }

  &__badge {
    position: absolute;
    top: -10px;
    right: -17px;
    background-color: $color-green;
    min-width: 31px;
  }

  &__input-container {
    padding: 15px 20px 0 20px;
    width: 100%;
  }

  &__input {
    width: 100%;
    max-width: 100%;
  }

  &__recommendations {
    display: flex;
    gap: 60px;
    width: 100%;
    padding: 36px 20px 20px 20px;
  }

  &__recommendation-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 30px;
    color: $color-black;
  }

  &__recommendation-item {
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
  }

  &__recommendation-image {
    width: 100%;
    margin-top: 30px;
    padding: 0;

    img {
      width: 100%;
    }
  }

  &__recommendation-description {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: $color-dark-grey;
  }

  &__scroll-button {
    margin-top: auto;
  }

  &__catalog {
    width: 100%;
    padding-bottom: 120px;
  }

  &__no-results {
    font-weight: 400;
    font-size: 18px;
    line-height: 44px;
    padding: 13px 60px 0 60px;
  }

  &__novelty {
    max-width: 100vw;
  }

  &__close {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    text-decoration: underline;
  }

  &__close-icon-container {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: $color-light-grey;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__close-icon {
    width: 12px;
    height: 12px;
  }
}

@include media-sm {
  .search-modal {
    &__input {
      max-width: 536px;
      margin: 0 auto;
    }
  }
}

@include media-lg {
  .search-modal {
    top: 95px;
    height: calc(100vh - 95px);

    &__header {
      margin: 13px auto;
      padding: 0 60px;
      max-width: calc($container-width + 120px);
      width: 100%;
    }

    &__body {
      margin-bottom: 12px;
    }

    &__categories {
      gap: 33px;
      margin-top: -9px;
    }

    &__category {
      &--with-badge {
        padding-right: 0;
      }
    }

    &__badge {
      top: -9px;
      right: -27px;
    }

    &__input {
      margin-top: 9px;
    }

    &__recommendations {
      margin-top: 25px;
      padding: 0px 60px 50px 60px;
    }

    &__recommendation-description {
      margin-top: 3px;
    }

    &__input-container {
      padding-top: 20px;
    }

    &__banners {
      width: 100%;
    }
  }
}

.banner {
  width: 100%;
  position: relative;
  min-height: 200px;

  &__content {
    position: absolute;
    bottom: 72px;
    left: 60px;
  }

  &__name {
    color: $color-white;
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 36px;
    line-height: 44px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }

  &__description {
    color: $color-white;
    font-family: $font-secondary;
    font-weight: 480;
    font-size: 48px;
    line-height: 44px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
}
</style>
