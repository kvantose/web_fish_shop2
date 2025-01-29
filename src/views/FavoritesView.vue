<template>
  <div class="w-screen">
    <div class="text-4xl">Избранное</div>

    <DataView :value="mockData" data-key="id">
      <template #list="slotprops">
        <div
          class="container flex flex-col rounded-3xl bg-rose-900 bg-opacity-5 shadow-sm shadow-slate-600"
        >
          <div
            class="flex flex-col px-2 py-3"
            v-for="(item, index) in slotprops.items"
            :key="index"
          >
            <div class="flex flex-row justify-between">
              <div class="flex gap-4">
                <div class="flex" v-if="!!item.img">
                  <Image :src="item.img" :alt="`favorite cigar ${index}`" preview>
                    <template #image>
                      <img class="object-contain" :src="item.img" width="250" />
                    </template>
                  </Image>
                </div>
                <div class="flex flex-col items-start">
                  <div class="text-xs font-medium text-slate-400">{{ item.country }}</div>
                  <div class="font-semibold">{{ item.name }}</div>
                </div>
              </div>
              <div class="flex flex-col justify-center">
                <Button size="small" severity="secondary" @click="deleteFromFavorites(index)"
                  ><Icon icon="prime:star-fill" color="yellow"
                /></Button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script lang="ts" setup>
//TODO чекнуть импорт мб переделать
import { Icon } from '@iconify/vue/dist/iconify.js';
import _ from 'lodash';
import { useConfirm, useToast } from 'primevue';
import { ref } from 'vue';

const toast = useToast();
const confirm = useConfirm();

const mockData = ref<{ id: number; name: string; img: string; country: string }[]>([]);
for (let index = 0; index < 15; index++) {
  mockData.value.push({
    id: index,
    name: `Cigar ${index} lorem lorem lorem lorem lorem lorem`,
    country: 'Cuban',
    img: 'https://cigarday.ru/images/cms/thumbs/0930c4f51bb70f13d4fc90546d3a6df785243836/wild-chirchill_370_auto_png_5_80.png',
  });
}

async function deleteFromFavorites(id: number) {
  const question: Promise<boolean> = new Promise((res, rej) => {
    confirm.require({
      message: 'Подтвердите удаление',
      accept: () => {
        res(true);
      },
      reject: () => res(false),
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
    });
  });

  let questionResult = await question;
  if (!questionResult) return;

  const deletedItem = mockData.value.find((s) => s.id === id);
  mockData.value = _.filter(mockData.value, (s) => s.id !== id);
  toast.add({
    severity: 'success',
    summary: 'Успешно',
    detail: `Удаление из избранного ${deletedItem?.name}`,
    life: 3000,
  });
}
</script>

<style lang="postcss" scoped></style>
