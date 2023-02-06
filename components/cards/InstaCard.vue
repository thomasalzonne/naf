<template>
  <a :href="post.link" target="_blank" rel="nofollow" class="insta-card">
    <div class="insta-card__img-container">
      <div class="insta-card__img-hover">
        <SvgIcon class="insta-card__icon" name="instagram-outline" />
      </div>
      <img
        class="insta-card__img"
        loading="lazy"
        :src="post.image + '?width=' + imageWidth"
        alt="Insta"
      />
    </div>
  </a>
</template>

<script lang="ts" setup>
import { IDivatInstagram } from '~~/types/divat.interface'

interface IProps {
  post: IDivatInstagram
}

withDefaults(defineProps<IProps>(), {
  post: null,
})

const imageWidth = ref(500)

onMounted(() => {
  if (window.innerWidth > 992) {
    imageWidth.value = 700
  }
})
</script>

<style lang="scss" scoped>
.insta-card {
  &__img-container {
    width: 264px;
    height: 264px;
    overflow: hidden;
    display: block;
    position: relative;
    background-color: $color-light-grey;
  }

  &__img-hover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
    transition: all 0.2s ease;
    align-items: center;
    justify-content: center;
    opacity: 0;
    display: none;

    &:hover {
      opacity: 1;
    }
  }

  &__img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 8px;
  }

  &__icon {
    color: $color-white;
    width: 22px;
    height: 22px;
  }

  &__name {
    color: $color-orange;
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }
}

@include media-lg {
  .insta-card {
    &__img-container {
      width: 354px;
      height: 354px;
      position: relative;
    }

    &__content {
      gap: 8px;
      margin-top: 10px;
    }

    &__icon {
      width: 32px;
      height: 32px;
      margin-left: -2px;
    }

    &__img-hover {
      display: flex;
    }
  }
}
</style>
