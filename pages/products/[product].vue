<template>
  <div class="page-product">
    <div class="product-main-block">
      <ProductGallery
        :medias="product?.medias || []"
        :product-slug="productSlug"
        :percentage="product?.percentage || 0"
        :is-favourite="isProductInWishlist"
        class="product-main-block__slider"
        @openLooksModal="openLooksModal"
        @toggleWishlist="toggleWishlist"
      />
      <ProductInfoBlock
        class="product-main-block__info"
        :medias="product?.medias || []"
        :product="product"
        :current-size="currentSize"
        :is-favourite="isProductInWishlist"
        @openSizes="toggleModal"
        @select-size="selectSize"
        @openSizeHelper="openSizeHelper"
        @toggleWishlist="toggleWishlist"
      />
    </div>
    <div class="product-main-block__sliders">
      <ProductInstaBlock />
      <ProductArticlesBlock
        v-if="!!latestProducts?.length"
        :latest-products="latestProducts"
      />

      <AdvantagesBlock />
      <ProductSizeModal
        :is-open="isOpenProductSizeModal"
        :sizes="product?.sizes"
        @close="toggleModal"
        @selectSize="selectSize"
      />
      <ProductLooksModal
        v-if="isOpenLooksModal"
        :product="product"
        @openSizeHelper="openSizeHelper"
        @close="closeLooksModal"
      />
      <SizeHelperModal v-if="isOpenSizeHelper" @close="closeSizeHelper" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ProductGallery from '~/components/product/ProductGallery.vue'
import ProductInfoBlock from '~/components/product/ProductInfoBlock.vue'
import ProductInstaBlock from '~/components/product/ProductInstaBlock.vue'
import ProductArticlesBlock from '~/components/product/ProductArticlesBlock.vue'
import AdvantagesBlock from '~/components/common/AdvantagesBlock.vue'

import {
  ICatalogProduct,
  IProduct,
  IProductCategory,
  IProductSize,
  ISyliusProduct,
  ISyliusProductVariant,
} from '~~/types/product.interface'
import { useProductsStore } from '~~/store/products'
import { IBreadcrumbs } from '~~/types/breadcrumbs.interface'
import { useBreadcrumbsStore } from '~~/store/breadcrumbs'
import { IPIMError } from '~~/types/error.interface'
import { EModals } from '~~/constants/modals'
import { useLayoutStore } from '~~/store/layout'
import { useWishlistStore } from '~~/store/wishlist'
import { IWishlistProductWrapper } from '~~/types/wishlist.interface'

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const productsStore = useProductsStore()
const breadcrumbsStore = useBreadcrumbsStore()
const wishlistStore = useWishlistStore()
const layoutStore = useLayoutStore()

const isOpenProductSizeModal = ref(false)
const currentSize = ref<IProductSize | null>(null)
const latestProducts = shallowRef<ICatalogProduct[]>([])
const isOpenSizeHelper = ref(false)
const isOpenLooksModal = ref(false)
const isProductInWishlist = ref(false)

const { data: product } = await useFetch<IProduct & IPIMError>(
  `https://divat.nafnaf.io/api/v1/${
    useRuntimeConfig().public.channelCode
  }/product/${route.params.product}`
).then((result) => {
  return result
})

const { data: syliusProduct } = await useFetch<ISyliusProduct>(
  `${runtimeConfig.public.apiUrl}/shop/products-by-slug/${route.params.product}`
).then((result) => {
  return result
})

const mergeSyliusWithDivat = (sProduct: ISyliusProduct) => {
  if (sProduct?.name) {
    product.value.name = sProduct.name
  }

  if (sProduct?.variants?.[0]) {
    product.value.price = transformPriceFromSylius(
      sProduct.variants[0].originalPrice
    )
    product.value.price_discounted = transformPriceFromSylius(
      sProduct.variants[0].price
    )
    product.value.percentage = sProduct.variants[0].percentage
    product.value.is_discounted = !!sProduct.variants[0].originalPrice
  }

  if (sProduct?.description) {
    product.value.description = sProduct.description
  }

  if (sProduct?.images?.length) {
    product.value.medias = sProduct.images
  }

  if (sProduct.variants?.length) {
    const sizes: IProductSize[] = []
    sProduct.variants.forEach((item: ISyliusProductVariant) => {
      const name =
        product.value.sizes.find((size) => size?.ean === item?.code)?.size || ''

      if (name) {
        sizes.push({
          ean: item?.code || null,
          price: '',
          price_discounted: '',
          size: name,
          stock: item?.inventorySourceStocksOnHand || 0,
        })
      }
    })

    product.value.sizes = sizes
  }
}

if (syliusProduct.value) {
  mergeSyliusWithDivat(syliusProduct.value)
}

if (product.value?.error) {
  throw createError({
    statusCode: +product.value?.error || 404,
    statusMessage: product.value?.message || '',
  })
}

const metaTitle = computed(() => {
  const categoryName = product.value?.category?.[0]?.name || ''
  const productName = product.value?.name || ''

  if (categoryName) return `${product.value?.name} | ${categoryName}`
  else return productName
})

useHead({
  title: metaTitle.value,
  meta: [{ name: 'description', content: product.value?.description }],
})

const productSlug = computed(() => {
  return route.params.product as string
})

const wishlistProducts = computed<IWishlistProductWrapper[]>(() => {
  return wishlistStore.wishlist?.wishlistProducts || []
})

const isProductInWishlistStore = computed<boolean>(() => {
  return !!wishlistProducts.value?.find(
    (item: IWishlistProductWrapper) => item?.product?.slug === productSlug.value
  )
})

const selectSize = (size: IProductSize) => {
  currentSize.value = size
}

const toggleModal = (): void => {
  isOpenProductSizeModal.value = !isOpenProductSizeModal.value
}

const openSizeHelper = () => {
  isOpenSizeHelper.value = true
}

const closeSizeHelper = () => {
  isOpenSizeHelper.value = false
}

const openLooksModal = () => {
  isOpenLooksModal.value = true

  layoutStore.openModal(EModals.PRODUCT_LOOKS)
}

const closeLooksModal = () => {
  isOpenLooksModal.value = false

  layoutStore.closeModal(EModals.PRODUCT_LOOKS)
}

const setLatestProducts = () => {
  latestProducts.value = productsStore.latestProducts?.slice() || []

  productsStore.saveNextProductInStore()
}

const toggleWishlist = async () => {
  const slug: string = productSlug.value || ''
  const inWishlist = isProductInWishlist.value

  isProductInWishlist.value = !isProductInWishlist.value

  !inWishlist
    ? await wishlistStore.addToWishlist(slug)
    : await wishlistStore.removeItem(slug)

  isProductInWishlist.value = checkInWishlistProduct()
}

const checkInWishlistProduct = () => {
  return !!wishlistProducts.value?.find(
    (item: IWishlistProductWrapper) => item?.product?.slug === productSlug.value
  )
}

const setBreadcrumbs = () => {
  const categories: IProductCategory[] = product.value?.category || []
  const breadcrumbs: IBreadcrumbs[] = []

  if (categories.length) {
    categories.forEach((category: IProductCategory) => {
      breadcrumbs.push({
        name: category?.name,
        path: `/collections/${category?.slug}`,
      })
    })
  }

  if (product.value) {
    breadcrumbs.push({
      name: product.value?.name,
      path: '/',
    })
  }

  breadcrumbsStore.updateBreadcrumbs(breadcrumbs)
}

onMounted(() => {
  currentSize.value =
    product.value?.sizes.find((size: IProductSize) => size.stock > 0) || null

  setLatestProducts()

  setTimeout(() => {
    setBreadcrumbs()
  }, 0)

  isProductInWishlist.value = checkInWishlistProduct()
})

onUnmounted(() => {
  breadcrumbsStore.clearBreadcrumbs()
})

watch(
  () => isProductInWishlistStore.value,
  (value) => {
    isProductInWishlist.value = value
  }
)

const ProductSizeModal = defineAsyncComponent(
  () => import('~/components/modals/ProductSizeModal.vue')
)

const SizeHelperModal = defineAsyncComponent(
  () => import('~/components/modals/SizeHelperModal.vue')
)

const ProductLooksModal = defineAsyncComponent(
  () => import('~/components/product/ProductLooksModal.vue')
)
</script>

<style lang="scss" scoped>
.page-product {
  position: relative;
}

.product-main-block {
  &__sliders {
    overflow: hidden;
  }
}

@include media-lg {
  .product-main-block {
    display: grid;
    grid-template-columns: calc(59% - 45px) calc(42% - 30px);
    padding: 0 20px;
    gap: 30px;

    &__slider {
      margin-bottom: 10px;
    }

    &__info {
      position: sticky;
      top: 20px;
      height: max-content;
      margin: 0;
    }
  }
}

@include media-xl {
  .product-main-block {
    display: grid;
    grid-template-columns: calc(59% - 45px) calc(42% - 30px);
    padding: 0 60px;
    gap: 62px;
  }
}

@include media-xxl {
  .product-main-block {
    grid-template-columns: calc(59% - 49px) calc(42% - 109px);
    gap: 127px;
    padding-left: calc((100vw - 1800px) / 2);
    padding-right: calc((100vw - 1800px) / 2);
  }
}
</style>
