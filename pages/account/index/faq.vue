<template>
  <div class="faq-page">
    <div class="faq-page__header">
      <p class="account-page-header faq-page__heading">
        {{ $t('Account.need_help') }}
      </p>
      <div class="faq-page__search-container">
        <SearchInput
          :is-active="true"
          :placeholder="$t('Account.faq_search_placeholder')"
        />
      </div>
    </div>
    <div class="faq-page__body">
      <FaqItem
        v-for="i in 1"
        :key="i"
        class="faq-page__item"
        :index="i"
        :active-index="activeIndex"
        @changeActiveIndex="changeActiveIndex"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchInput from '~/components/common/SearchInput.vue'
import FaqItem from '~/components/common/FaqItem.vue'

const activeIndex = ref<number>(null)

const changeActiveIndex = (index: number) => {
  activeIndex.value !== index
    ? (activeIndex.value = index)
    : (activeIndex.value = null)
}
</script>

<style lang="scss" scoped>
.faq-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 34px;
  }

  &__heading {
    width: 100%;
    max-width: 300px;
    margin-left: 11px;
    max-width: 227px;
  }

  &__search-container {
    width: 100%;
  }

  &__body {
    margin-top: 30px;
  }

  &__item {
    &:not(:first-child) {
      margin-top: 20px;
    }
  }
}
</style>
