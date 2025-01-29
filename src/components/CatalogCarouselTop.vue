<template>
  <div class="carousel flex flex-col gap-3 items-center">
    <p class="text-2xl font-bold">ТОП-10 сигар</p>
    <Carousel :autoplayInterval="2000" circular :value="resProducts" :numVisible="3" :numScroll="1"
      :responsiveOptions="responsiveOptions" class="w-full">
      <template #item="slotProps">
        <div class="card-item w-fit">
          <div class="flex flex-col gap-3">
            <div v-show="showStar[slotProps.data.id]" class="flex flex-row gap-1">
              <i :class="likedItems[slotProps.data.id] ? 'pi pi-star-fill cursor-pointer' : 'pi pi-star cursor-pointer'"
                :style="{ color: likedItems[slotProps.data.id] ? 'yellow' : '' }"
                v-on:click="handleLike(slotProps.data.id)"></i>
            </div>
            <img class="w-full" :src="slotProps.data.img" :alt="slotProps.data.title" />
            <div class="card-content flex flex-col gap-1">
              <p class="text-lg">{{ slotProps.data.title }}</p>
              <p class="text-xs">Бренд: {{ slotProps.data.brand }}</p>
              <p class="text-xs">Страна: {{ slotProps.data.country }}</p>
              <p class="text-xs">Цена: от {{ slotProps.data.price.toLocaleString('ru-RU') }}₽ до {{
                (slotProps.data.price *
                  2).toLocaleString('ru-RU') }}₽</p>
              <i class="pi pi-star-fill" style="font-size: 1.2rem;">{{ slotProps.data.popular }}</i>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { catalog } from "@/mock/news-feed";
import { ref } from "vue";

const likedItems = ref<Record<number, boolean>>({});
const showStar = ref<Record<number, boolean>>({});
const handleLike = (id: number) => {
  const item = catalog.find((item) => item.id === id);
  if (!item) return;

  if (likedItems.value[id]) {
    delete likedItems.value[id];
  } else {
    likedItems.value[id] = true;
  }
}

const handleStar = (id: number) => {
  const item = catalog.find((item) => item.id === id);
  if (!item) return;

  if (showStar.value[id]) {
    delete showStar.value[id];
  } else {
    showStar.value[id] = true;
  }
}
const resProducts = catalog.sort((a, b) => b.popular - a.popular).slice(0, 10);

const responsiveOptions = [
  {
    breakpoint: "1024px",
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: "768px",
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: "560px",
    numVisible: 1,
    numScroll: 1,
  }
]
</script>

<style>
.carousel {
  margin: var(--section-gap);
}

.p-carousel-indicator-list {
  width: 100% !important;
  display: flex !important;
  flex-direction: row !important;
  gap: 10px !important;
}

.p-carousel-indicator .p-carousel-indicator-button {
  width: 20px !important;
  height: 10px !important;
}

@media screen and (max-width: 950px) {
  .carousel {
    margin: 50px 0;
  }

}
</style>
