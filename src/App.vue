<script setup lang="ts">
import AlertAdult from '@/components/AlertAdult.vue';
import HeaderView from '@/views/HeaderView.vue';
import { ConfirmDialog, Toast } from 'primevue';
import './assets/base.css';
</script>

<template>
  <AlertAdult />
  <HeaderView />
  <div class="container-fluid w-full">
    <div id="mainSize" class="flex flex-row">
      <div class="col h-full w-full">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
  <Toast />
  <ConfirmDialog class="sm:w-full md:w-full lg:w-8 xl:w-6" />
</template>

<style scoped lang="postcss">
#mainSize {
  height: calc(100vh - 60px);
  min-height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
}
</style>
