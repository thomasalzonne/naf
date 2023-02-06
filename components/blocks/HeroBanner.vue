<template>
  <div class="hero-banner">
    <div class="hero-banner__content">
      <div class="hero-banner__img-container">
        <picture>
          <source
            media="(mmin-width: 1920px)"
            srcset="https://nafnaf.b-cdn.net/pages/look-otono.jpg"
          />
          <source
            media="(min-width: 767px)"
            srcset="https://nafnaf.b-cdn.net/pages/look-otono.jpg?width=1600"
          />
          <img
            src="https://nafnaf.b-cdn.net/pages/looks-otono-mobile.jpg"
            alt="Look Otoño"
            class="hero-banner__img"
            loading="lazy"
            onerror="this.style.display='none'"
          />
        </picture>
      </div>
      <div class="hero-banner__title">
        Looks <br />
        de Otoño
      </div>
    </div>
    <HeroBannerMarquee class="hero-banner__marquee" />
  </div>
</template>

<script lang="ts" setup>
import HeroBannerMarquee from '~/components/blocks/HeroBannerMarquee.vue'
</script>

<style lang="scss">
.hero-banner {
  position: relative;
  display: flex;
  height: 483px;
  width: 100%;
  background-color: #94d6dc;
  padding: 20px 20px 50px 20px;

  &:hover {
    .hero-banner__img {
      width: 105%;
      height: 105%;
    }
  }

  &__content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    padding: 41px 41px 28px 41px;
  }

  &__img-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__img {
    transition: all 1000ms ease-in-out;
    object-fit: cover;
    object-position: top;
    width: 100%;
    height: 100%;
  }

  &__title {
    font-family: $font-secondary;
    font-size: 50px;
    line-height: 50px;
    text-align: right;
    color: $color-white;
    margin-bottom: 30px;
    z-index: 10;
  }

  &__marquee {
    position: absolute;
    bottom: 16px;
    left: 0px;
  }
}

@include media-lg {
  .hero-banner {
    height: 658px;
    padding-bottom: 71px;

    &__content {
      padding: 118px 118px 105px 118px;
    }

    &__title {
      font-size: 100px;
      line-height: 100px;
      margin-bottom: 37px;
    }

    &__marquee {
      bottom: 15px;
    }
  }
}

@include media-xxl {
  .hero-banner {
    height: 817px;

    &__content {
      padding: 178px 192px 183px 192px;
    }

    &__title {
      margin-bottom: 38px;
    }
  }
}

@include media-xxxl {
  .hero-banner {
    height: 889px;

    &__content {
      padding: 245px 18% 195px 451px;
    }
  }
}
</style>
