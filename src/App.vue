<script setup lang="ts">
// import PageHeader from './components/Platform/Header/PageHeader.vue';
</script>
<template>
  <!-- <PageHeader /> -->
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

:root
  --popper-theme-background-color: #ffffff
  --popper-theme-background-color-hover: #ffffff
  --popper-theme-text-color: #333333
  --popper-theme-border-width: 0px
  --popper-theme-border-style: solid
  --popper-theme-border-radius: 6px
  --popper-theme-padding: 0
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.50)

.popper #arrow::before
  background: #FFF5E6 !important

.vuejs3-datepicker__value
    height: 20px
    min-width: 180px

.vuejs3-datepicker__icon
    position: absolute
    right: 10px
    top: 5px

.vuejs3-datepicker__content
    position: absolute
    top: 4px

.vuejs3-datepicker__calendar-topbar
    display: none

.vuejs3-datepicker__calendar
    bottom: 0px
</style>
