<template>
  <div class="catalog__container">
    <CatalogCarouselTop :likedItems="likedItems" :showStar="showStar" @handleLike="handleLike"
      @handleStar="handleStar" />
    <div v-if="showFilter" class="p-5">
      <Drawer v-model:visible="showFilter" class="dialog__filter" :style="{ height: '100vh' }">
        <FiltersCatalog v-model:filters="filters" />
        <ButtonDefault label="Применить" @click="handleChangeCatalog" class="mt-9" />
      </Drawer>
    </div>

    <div class="catalog flex flex-col gap-3">
      <div class="filters-top">
        <InputText placeholder="Поиск по названию или бренду" class="w-full amimated-search" v-model="search"
          @keyup.enter="handleSearch(search)" @keyup.backspace="handleSearch(search)" />
        <ButtonDefault icon="pi pi-search" label="Найти" class="p-button-outlined animated-btn-search"
          @click="handleSearch(search)" />
      </div>

      <div class="filters-botoom">
        <Button icon="pi pi-filter" label="Фильтры" class="p-button-outlined animated-btn-filter"
          @click="openFilter"></Button>
        <Select v-model="selectFilter" :options="sortOptions" placeholder="Сортировка по" class="w-full animated-select"
          @change="handleFilterOptions(selectFilter.value)" optionLabel="label" optionGroupLabel="label"
          optionGroupChildren="items">
          <template #option="slotProps">
            <div class="flex items-center gap-3">
              <i :class="'pi' + ' ' + slotProps.option.img"></i>
              {{ slotProps.option.label }}
            </div>
          </template>
        </Select>
        <ButtonDefault style="background-color: var(--color-background); color: var(--color-text-primary)"
          icon="pi pi-refresh" label="Сбросить" class="p-button-outlined animated-btn-reset"
          @click="handleResetFilters" />
      </div>
    </div>


    <div class="catalog flex flex-row flex-wrap justify-between items-center gap-3">
      <div class="card-item flex flex-col" v-for=" item in productsCatalog" key="item.id"
        @mouseenter="handleStar(item.id)" @mouseleave="handleStar(item.id)"
        v-animateonscroll="{ enterClass: 'animate-scalein', leaveClass: 'animate-fadeout' }">
        <div v-show="showStar[item.id]" class="flex flex-row gap-1">
          <i :class="likedItems[item.id] ? 'pi pi-star-fill cursor-pointer' : 'pi pi-star cursor-pointer'"
            :style="{ color: likedItems[item.id] ? 'yellow' : '' }" v-on:click="handleLike(item.id)"></i>
        </div>
        <img :src="item.img" :alt="item.title" />
        <div class="card-content flex flex-col gap-1">
          <p class="text-lg">{{ item.title }}</p>
          <p class="text-xs">Бренд: {{ item.brand }}</p>
          <p class="text-xs">Страна: {{ item.country }}</p>
          <p class="text-xs">Цена: от {{ item.price.toLocaleString('ru-RU') }}₽ до {{ (item.price *
            2).toLocaleString('ru-RU') }}₽</p>
        </div>
      </div>
    </div>

    <Paginator v-model:page="page" :rows="paginatorRows" :totalRecords="productsCatalog.length"
      :template="'PrevPageLink PageLinks NextPageLink'" class="flex justify-center items-center gap-5 mb-8">
    </Paginator>
    <FooterDefault />
  </div>
</template>

<script lang="ts" setup>
import ButtonDefault from '@/components/ButtonDefault.vue';
import CatalogCarouselTop from '@/components/CatalogCarouselTop.vue';
import FiltersCatalog from '@/components/FiltersCatalog.vue';
import InputText from '@/components/InputText.vue';
import { catalog } from '@/mock/news-feed';
import 'primeicons/primeicons.css'
import { ref, watch } from 'vue';

const likedItems = ref<Record<number, boolean>>({});
const showStar = ref<Record<number, boolean>>({});
const showFilter = ref(false);
const productsCatalog = ref(catalog);
const search = ref('');
const selectFilter = ref();
const maxPagesPaginator = ref(0);
const paginatorRows = catalog.length / 9
const page = ref(1)

watch(productsCatalog, (newCatalog, oldCatalog) => {

  maxPagesPaginator.value = catalog.length / 9

  if (productsCatalog.value.length > 3) {
    productsCatalog.value = productsCatalog.value.slice(0, 9);
  } else {
    productsCatalog.value = productsCatalog.value;
  }
}, { immediate: true });

const sortOptions = ref([
  {
    label: 'По цене',
    items: [
      { label: 'Возрастанию', value: 'price-asc', img: 'pi-sort-amount-up' },
      { label: 'Убыванию', value: 'price-desc', img: 'pi-sort-amount-down' }
    ]
  },
  {
    label: 'По популярности',
    items: [
      { label: 'Возрастанию', value: 'popular-asc', img: 'pi-sort-amount-up' },
      { label: 'Убыванию', value: 'popular-desc', img: 'pi-sort-amount-down' }
    ]
  }
]);

const filters = ref({
  country: {
    cuba: false,
    dominican: false,
    nicaragua: false,
    russia: false,
    others: false
  },
  brand: {
    cohiba: false,
    montecristo: false,
    partagas: false,
    others: false
  },
  price: [5000, 100000]
})
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

const openFilter = () => {
  showFilter.value = !showFilter.value
}

const handleChangeCatalog = () => {
  showFilter.value = false

  productsCatalog.value = catalog.filter((item) => {
    return (
      ((filters.value.country.cuba && item.country === 'Куба') ||
        (filters.value.country.dominican && item.country === 'Доминикана') ||
        (filters.value.country.nicaragua && item.country === 'Никарагуа') ||
        (filters.value.country.russia && item.country === 'Россия') ||
        (filters.value.country.others && item.country !== 'Куба' && item.country !== 'Доминикана' && item.country !== 'Никарагуа' && item.country !== 'Россия'))

      && ((filters.value.brand.cohiba && item.brand === 'Cohiba') ||
        (filters.value.brand.montecristo && item.brand === 'Montecristo') ||
        (filters.value.brand.partagas && item.brand === 'Partagas') ||
        (filters.value.brand.others && item.brand !== 'Cohiba' && item.brand !== 'Montecristo' && item.brand !== 'Partagas'))
      &&
      (item.price >= filters.value.price[0] && item.price <= filters.value.price[1])
    )
  })
}

const handleSearch = (search: string) => {
  productsCatalog.value = catalog.filter((item) => {
    if (item.title.toLowerCase().includes(search.toLowerCase()) || item.brand.toLowerCase().includes(search.toLowerCase())) {
      return item
    }
  })
}

const handleFilterOptions = (selected: string) => {
  if (selected === 'price-asc') {
    return productsCatalog.value.sort((a, b) => a.price - b.price)
  } else if (selected === 'price-desc') {
    return productsCatalog.value.sort((a, b) => b.price - a.price)
  } else if (selected === 'popular-asc') {
    return productsCatalog.value.sort((a, b) => a.popular - b.popular)
  } else if (selected === 'popular-desc') {
    return productsCatalog.value.sort((a, b) => b.popular - a.popular)
  }
  return productsCatalog.value
}

const handleResetFilters = () => {
  filters.value = {
    country: {
      cuba: false,
      dominican: false,
      nicaragua: false,
      russia: false,
      others: false
    },
    brand: {
      cohiba: false,
      montecristo: false,
      partagas: false,
      others: false
    },
    price: [5000, 100000]
  }

  productsCatalog.value = catalog
  showFilter.value = false
}

</script>

<style>
.catalog__container {
  position: relative;
}

.p-paginator-page {
  transform: scale(0.8);
  transition: all 0.5s ease;
}

.p-paginator-page-selected {
  background: var(--background-link-hover) !important;
  transform: scale(1.2);
  transition: all 0.5s ease;
}

.catalog {
  margin: var(--section-gap);
}

.card-item {
  position: relative;
  border: 1px solid var(--background-link-hover);
  border-radius: 10px;
  min-width: 1/4;
  transition: all 0.6s ease;

  img {
    cursor: pointer;
    width: 500px;
    height: 300px;
    border-radius: 10px;
    object-fit: cover;
  }

  .card-content {
    padding: 20px;
  }

  i {
    position: absolute;
    top: 10px;
    right: 10px;
  }


}

.filters-top {
  display: grid;
  grid-template-columns: 10fr 1fr;
  gap: 10px;
}

.filters-botoom {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}

.amimated-search {
  animation: amimated-search 5s ease;
}

@keyframes amimated-search {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  50% {
    transform: translateX(0%);
    transform: rotate(5deg);
  }

  75% {
    transform: rotate(0);
  }

  100% {
    opacity: 1;
  }

}

.animated-btn-search {
  animation: amimated-btn-search 5s ease;
}

@keyframes amimated-btn-search {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }

  50% {
    transform: translateX(0%);
    transform: rotate(-5deg);
  }

  75% {
    transform: rotate(0);
  }

  100% {
    opacity: 1;
  }
}

.animated-btn-filter {
  animation: amimated-btn-filter 5s ease;
}

@keyframes amimated-btn-filter {
  0% {
    opacity: 0;
    transform: translate(-100%, -100%);
  }

  25% {
    opacity: 0.5;
    transform: translate(150%, 150%);
  }

  50% {
    opacity: 1;
    transform: translate(0%, 0%);
  }

  75% {
    opacity: 0.5;
    transform: translate(-150%, -150%);
  }

  100% {
    opacity: 1;
    transform: translate(0%, 0%);
  }
}


.animated-select {
  animation: amimated-select 5s ease;
}

@keyframes amimated-select {
  0% {
    opacity: 0;
    transform: translate(-100%, -100%);
  }

  25% {
    opacity: 0.5;
    transform: translate(150%, 150%);
  }

  50% {
    opacity: 1;
    transform: rotate(0.5turn);
  }

  75% {
    opacity: 0.5;
    transform: rotate(0.5turn);
  }

  100% {
    opacity: 1;
    transform: translate(0%, 0%);
  }
}

.animated-btn-reset {
  animation: amimated-btn-reset 5s ease;
}

@keyframes amimated-btn-reset {
  0% {
    opacity: 0;
    transform: translate(100%, 100%);
  }

  25% {
    opacity: 0.5;
    background-color: red;
    transform: translate(-150%, -150%);
  }

  50% {
    opacity: 1;
    transform: matrix3d(1.5, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 1.5, 0, 0, 0, 0, 1);
  }

  75% {
    opacity: 0.5;
    transform: matrix3d(0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 1);
  }

  100% {
    opacity: 1;
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}


@media screen and (max-width: 950px) {

  .catalog,
  .filters {
    margin: 30px;
  }

  .filters {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .card-item {
    img {
      width: 300px;
      height: 200px;
    }
  }

}
</style>
