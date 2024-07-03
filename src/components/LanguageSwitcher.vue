<template>
  <div>
    <button class="english" @click="setLanguage('en')"></button>
    <button class="german" @click="setLanguage('ger')"></button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { watchEffect } from 'vue'

const { locale } = useI18n()

const setLanguage = (newLang) => {
  locale.value = newLang
  localStorage.setItem('lang', newLang)
  window.location.reload()
}

watchEffect(() => {
  const storedLang = localStorage.getItem('lang')
  if (storedLang) {
    locale.value = storedLang
  }
})
</script>

<style scoped>
button {
  height: 1.5rem;
  width: 2.15rem;
  padding: 0;
  outline: none;
  background-repeat: no-repeat;
  background-size: cover;
}
.english {
  background-image: url(../../public/images/uk-flag.svg);
}
.german {
  background-image: url(../../public/images/german-flag.svg);
}
</style>
