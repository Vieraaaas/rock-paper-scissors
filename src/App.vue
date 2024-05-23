<template>
  <header class="site-header">
    <h1>
      <span class="rock">ROCK</span>
      <span class="paper">PAPER</span>
      <span class="scissors">SCISSORS</span>
    </h1>
  </header>

  <router-view />
</template>

<style>
.site-header {
  font-family: 'Permanent Marker', cursive;
  font-size: 1.5rem;
  background-color: var(--main-color);
  width: 100vw;
  text-align: center;
}
.rock {
  display: inline-block;
  transform: rotate(-10deg);
}
.paper {
  display: inline-block;
  margin: 0 2rem;
  transform: rotate(8deg);
}
.scissors {
  display: inline-block;
  transform: rotate(-5deg);
}
</style>
