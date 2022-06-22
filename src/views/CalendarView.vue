<template>
<select>
  <CalendarMonth 
    :events-list="eventsList"
  />
  <CalendarWeek
    :events-list="eventsList"
  />
</template>
<script setup lang="ts">
import CalendarMonth from '../components/Calendar/CalendarMonth/CalendarMonth.vue';
import CalendarWeek from '../components/Calendar/CalendarWeek/CalendarWeek.vue';
import useEvents from '../components/Calendar/composable/useEvents';

const {
  eventsList,
} = useEvents();

</script>
