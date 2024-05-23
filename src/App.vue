<template>
  <header class="site-header">
    <h1><span>ROCK</span><span>PAPER</span><span>SCISSORS</span></h1>
  </header>

  <router-view />
</template>

<style>
.site-header {
  font-family: 'Permanent Marker', cursive;
  background-color: var(--main-color);
  width: 100vw;
  text-align: center;
}
</style>
