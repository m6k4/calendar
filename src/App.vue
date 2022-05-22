<script setup lang="ts">
import PageHeader from './components/Platform/Header/PageHeader.vue';
</script>
<template>
  <PageHeader />
  <router-view />
</template>

<style lang="sass">
body 
  margin: 0px
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

</style>
