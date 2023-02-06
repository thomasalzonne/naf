<template>
  <div v-if="posts?.length" class="insta-block">
    <div class="insta-block__squiggle">
      <SvgIcon class="insta-block__squiggle-icon" name="squiggle" />
    </div>
    <div class="insta-block__header">
      <h2 class="insta-block__heading">#NAFASHION</h2>
      <p class="insta-block__text">
        Comparte tus looks en Instagram con el hashtag #NAFASHION 😘
      </p>
    </div>

    <AppCarousel class="insta-block__carousel" item-selector=".insta-card">
      <InstaCard
        v-for="(post, index) in posts"
        :key="index"
        :post="post"
        class="insta-block__card"
      />
    </AppCarousel>
  </div>
</template>

<script lang="ts">
import InstaCard from '~/components/cards/InstaCard.vue'
import AppCarousel from '~/components/common/AppCarousel.vue'
import { useCommonStore } from '~~/store/common'

export default defineComponent({
  name: 'InstaBlock',
  components: {
    InstaCard,
    AppCarousel,
  },
  setup() {
    const commonStore = useCommonStore()

    const posts = computed(() => {
      return commonStore.data?.instagram
    })

    return { posts }
  },
})
</script>

<style lang="scss" scoped>
.insta-block {
  position: relative;
  margin-top: 43px;

  &__squiggle {
    display: none;
    position: absolute;
    right: -320px;
    top: 23px;
  }

  &__squiggle-icon {
    height: 45px;
    width: 560px;
    color: $color-orange;
  }

  &__header {
    margin: 0 20px 20px;
  }

  &__heading {
    font-family: $font-secondary;
    font-weight: 400;
    font-size: 40px;
    line-height: 40px;
  }

  &__text {
    font-size: 20px;
    line-height: 32px;
    font-weight: 400;
    margin-top: 10px;
  }

  &__card {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }

  &__carousel {
    padding-bottom: 50px;
  }
}

@include media-lg {
  .insta-block {
    margin-top: 80px;

    &__squiggle {
      display: block;
    }

    &__header {
      margin: 0 60px 45px 60px;
    }

    &__heading {
      font-size: 80px;
      line-height: 80px;
    }

    &__text {
      font-size: 30px;
      line-height: 42px;
      margin-top: 21px;
    }

    &__card {
      &:not(:last-child) {
        margin-right: 60px;
      }
    }

    &__carousel {
      padding-bottom: 90px;
    }
  }
}

@include media-xxxl {
  .insta-block {
    &__squiggle {
      display: none;
    }

    &__header {
      max-width: 1800px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>
