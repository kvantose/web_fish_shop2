<template>
  <div class="auth__container flex flex-col gap-3 items-center justify-center m-auto p-5">

    <SelectButton :options="options" v-model="value" class="select__btn" />
    <div v-if="value === 'Авторизация'" class="flex flex-col gap-3 w-full">
      <InputText placeholder="Электронная почта" type="text" />
      <InputText placeholder="Пароль" type="password" />
      <li><a class="forgot__pass" href="/auth">Забыли пароль?</a></li>
      <ButtonDefault label="Войти" />
    </div>
    <div v-if="value === 'Регистрация'" class="flex flex-col gap-3 w-full">
      <div class="card flex justify-center">
        <Stepper value="1" class="w-full">
          <StepList>
            <Step value="1"></Step>
            <Step value="2"></Step>
            <Step value="3"></Step>
          </StepList>
          <StepPanels>
            <StepPanel v-slot="{ activateCallback }" value="1">
              <div class="flex flex-col gap-3">
                <InputText placeholder="Логин" type="text" />
                <InputText placeholder="Пароль" type="password" />
                <ButtonDefault label="Следующий" icon="pi pi-arrow-left" @click="activateCallback('2')" />
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="2">
              <div class="flex flex-col w-full gap-3">
                <InputText placeholder="Электронная почта" />
                <div class="flex flex-row gap-3 w-full">
                  <ButtonDefault
                    style="background-color: var(--color-background-mute); color: var(--color-text-primary)"
                    label="Назад" icon="pi pi-arrow-left" @click="activateCallback('1')" />
                  <ButtonDefault label="Следующий" icon="pi pi-arrow-left" @click="activateCallback('3')" />
                </div>
              </div>
            </StepPanel>
            <StepPanel v-slot="{ activateCallback }" value="3">
              <div class="flex flex-col gap-3">
                <ButtonDefault style="background-color: var(--color-background-mute); color: var(--color-text-primary)"
                  label="Назад" icon="pi pi-arrow-left" @click="activateCallback('2')" />
              </div>
            </StepPanel>
          </StepPanels>
        </Stepper>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ButtonDefault from '@/components/ButtonDefault.vue';
import { ref } from 'vue';
const value = ref('Авторизация');
const options = ref(['Авторизация', 'Регистрация']);
</script>
<style scoped>
.select__btn {
  display: flex;
  gap: 5px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(44, 238, 5, 0.5);
  outline: var(--background-link-hover);
}

.auth__container {
  height: 80vh;
  width: 50vh;

  li {
    list-style-type: none;
    text-align: center;
    color: var(--color-text-primary);

    :hover {
      text-decoration: underline;
      text-underline-offset: 5px;
      color: var(--background-link-hover)
    }
  }
}


@media screen and (max-width: 950px) {
  .auth__container {
    height: 50vh;
    width: 100%;
  }
}
</style>
