<template>
  <div class="home">
    <div
      class="news_feed"
      v-for="item in newsFeed"
      :key="item.id"
      v-animateonscroll="{ enterClass: 'animate-scalein', leaveClass: 'animate-scaleout' }"
    >
      <div class="news_feed__item flex flex-col justify-between gap-5">
        <p class="news_feed__title text-3xl font-bold">{{ item.title }}</p>
        <p class="news_feed__date text-lg italic">{{ item.date }}</p>
        <div class="news_feed__content__container flex flex-col gap-9 p-5">
          <p class="new__feed__content text-2xl">{{ item.content }}</p>
          <img class="news_feed__img" :src="item.img" alt="news image" />
        </div>
        <div class="flex select-none gap-5 align-bottom">
          <div class="flex align-bottom" @click="handleLike(item.id)">
            <Icon
              style="font-size: var(--p-icon-size)"
              :icon="likedItems[item.id] ? 'prime:heart-fill' : 'prime:heart'"
              :color="likedItems[item.id] ? 'red' : 'silver'"
              width="24"
              :inline="true"
            ></Icon
            >{{ item.likes }}
          </div>
          <div class="flex select-none align-bottom">
            <Icon
              icon="prime:comment"
              @click="handleOpenComments(item.id)"
              class="news_feed__icon"
              width="24"
              >{{ item.comment }}</Icon
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="commentsOpen"
    class="dialog__comments"
    :style="{ width: '90%', height: '100vh' }"
  >
    <div class="position-relative flex h-full flex-col gap-5">
      <i
        @click="commentsOpen = false"
        class="pi pi-times absolute right-0 top-0 cursor-pointer p-3 text-2xl"
      ></i>
      <div class="flex flex-col">
        <p class="text-2xl font-bold">{{ currentItem?.title }}</p>
        <p id="new__feed__content" class="p-3 text-lg font-light">
          {{ currentItem?.content.match(/.{1,150}/)?.[0] }}...
        </p>
      </div>
      <div class="flex flex-col gap-3">
        <InputText v-model="inputComment" placeholder="Write your comment" />
        <ButtonDefault label="Send comment" />
      </div>
      <div class="flex h-full flex-col items-center gap-3 bg-gray-800 p-10">
        <p>Комментариев пока нет...</p>
      </div>
    </div>
  </Dialog>
  <Footer />
</template>

<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';
import Footer from '@/components/FooterDefault.vue';
import InputText from '@/components/InputText.vue';
import { newsFeed } from '@/mock/news-feed';
import { Icon } from '@iconify/vue/dist/iconify.js';
import 'primeicons/primeicons.css';
import Dialog from 'primevue/dialog';
import { computed, ref } from 'vue';

const inputComment = ref<null | string>(null);
const likedItems = ref<Record<number, boolean>>({});
const commentsOpen = ref(false);
const currentId = ref<number | null>(null);
const currentItem = computed(() => {
  return newsFeed.find((item) => item.id === currentId.value);
});
const handleLike = (id: number) => {
  const item = newsFeed.find((item) => item.id === id);
  if (!item) return;

  if (likedItems.value[id]) {
    item.likes--;
    likedItems.value[id] = false;
  } else {
    item.likes++;
    likedItems.value[id] = true;
  }
};

const handleOpenComments = (id: number) => {
  if (commentsOpen.value) {
    commentsOpen.value = false;
    currentId.value = null;
  } else {
    commentsOpen.value = true;
    currentId.value = id;
  }
};
</script>

<style lang="postcss" scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 50px var(--section-gap);
  overflow-y: hidden;

  @media screen and (max-width: 950px) {
    padding: 20px;
  }
}

.news_feed {
  padding: 10px 20px;
  background-color: var(--color-background-mute);
  border-radius: 10px;
  transition: all 0.5s ease;

  &__item {
    height: 100%;
    transition: all 0.2s ease;
  }
  &__img {
    max-height: 400px;
    object-fit: cover;
    border-radius: 10px;
  }
  &__icon {
    display: flex;
    gap: 5px;
    padding: 8px 15px;
    font-size: 1.1rem;
    border-radius: 10px;
    cursor: pointer;
  }

  @media screen and (max-width: 950px) {
    flex-direction: column;
    gap: 10px;

    &__title {
      font-size: 1rem;
      line-height: 25px;
    }
    &__date {
      font-size: 0.6rem;
      line-height: 0px;
    }
    &__content {
      font-size: 0.8rem;
      line-height: 25px;
    }
    &__content__container {
      padding: 0;
    }
  }
}
</style>
