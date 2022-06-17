<template>
  <CalendarMonth 
    :events-list="eventsList"
  />
</template>
<script setup lang="ts">
import CalendarMonth from '../components/Calendar/CalendarMonth/CalendarMonth.vue';
import useEvents from '../components/Calendar/composable/useEvents';

const {
  eventsList,
} = useEvents();

</script>
