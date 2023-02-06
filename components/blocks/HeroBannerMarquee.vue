<template>
  <MarqueeLine class="hero-banner-marquee">
    <span class="hero-banner-marquee__text hero-banner-marquee__text--main"
      >Envíos gratis</span
    >
    <span class="hero-banner-marquee__text hero-banner-marquee__text--secondary"
      >a partir de 49,90€*</span
    >
    <img
      src="~/assets/images/stickers/smiley.png"
      class="hero-banner-marquee__icon"
    />
    <img
      src="~/assets/images/stickers/explosion.png"
      class="hero-banner-marquee__icon"
    />
    <img
      src="~/assets/images/stickers/flower.png"
      class="hero-banner-marquee__icon"
    />
  </MarqueeLine>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MarqueeLine from '~/components/common/MarqueeLine.vue'

export default defineComponent({
  name: 'HeroBannerMarquee',
  components: {
    MarqueeLine,
  },
})
</script>

<style lang="scss" scoped>
.hero-banner-marquee {
  white-space: nowrap;

  &__text {
    margin-left: 100px;

    &--main {
      font-family: $font-secondary;
      color: $color-yellow;
      font-size: 20px;
      line-height: 1;
      text-transform: uppercase;
    }

    &--secondary {
      font-size: 14px;
      line-height: 1;
      font-weight: 400;
      margin-left: 4px;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}

@include media-lg {
  .hero-banner-marquee {
    &__text {
      &--main {
        font-size: 40px;
      }

      &--secondary {
        font-size: 23px;
        margin-bottom: 4px;
      }
    }

    &__icon {
      width: 39px;
      height: 39px;
    }
  }
}
</style>
