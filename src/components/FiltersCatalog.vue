<template>
  <div class="flex flex-col gap-9">
    <div class="flex flex-col gap-1">
      <p class="text-2xl font-bold">Страна</p>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.country.cuba" value="Куба" input-id="cuba" />
        <label for="cuba">Куба</label>
      </div>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.country.dominican" value="Куба" input-id="dominican" />
        <label for="dominican">Доминикана</label>
      </div>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.country.nicaragua" value="Куба" input-id="nicaragua" />
        <label for="nicaragua">Никарагуа</label>
      </div>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.country.russia" value="Куба" input-id="russia" />
        <label for="russia">Россия</label>
      </div>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.country.others" value="Куба" input-id="others" />
        <label for="others">Другие</label>
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <p class="text-2xl font-bold">Бренд</p>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.brand.cohiba" value="Cohiba" input-id="cohiba" />
        <label for="cohiba">Cohiba</label>
      </div>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.brand.montecristo" value="Cohiba" input-id="montecristo" />
        <label for="montecristo">Montecristo</label>
      </div>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.brand.partagas" value="Cohiba" input-id="partagas" />
        <label for="partagas">Partagas</label>
      </div>
      <div class="flex gap-3 p-1">
        <Checkbox v-model="filters.brand.others" value="Cohiba" input-id="others" />
        <label for="others">Другие</label>
      </div>
    </div>

    <div class="flex flex-col justify-center gap-2">
      <p class="text-2xl font-bold">Цена</p>
      <p>{{ filters.price[0].toLocaleString('ru-RU') }} - {{ filters.price[1].toLocaleString('ru-RU') }}</p>
      <Slider class="w-full" range v-model="filters.price" :step="1000" :min="minPrice" :max="maxPrice" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { catalog } from '@/mock/news-feed';

defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const maxPrice = catalog.reduce((max, item) => max < item.price ? item.price : max, 0)
const minPrice = catalog.reduce((min, item) => min > item.price ? item.price : min, maxPrice)
</script>


<style scoped></style>
