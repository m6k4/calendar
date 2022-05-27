<template>
  <CalendarMonth 
    :events-list="eventsList"
    @show-all-events-modal="handleShowAllEventsModal"
  />
  <ModalWindow 
    v-if="isAllEventsModalVisible"
    @close-modal="isAllEventsModalVisible = false"
  >
    <template #header>
      All event list
    </template>
    <template #description>
      <AllEvents 
        :events="allEvents"
      />
    </template>
  </ModalWindow>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ModalWindow from '../components/Common/ModalWindow.vue';
import AllEvents from '../components/Calendar/CalendarMonth/AllEvents/AllEvents.vue';
import CalendarMonth from '../components/Calendar/CalendarMonth/CalendarMonth.vue';
import { Event } from '../types/types';
import useEvents from '../components/Calendar/composable/useEvents';
const isAllEventsModalVisible = ref(false);

const {
  eventsList,
} = useEvents();

const allEvents = ref<Array<Event>>([]);

const handleShowAllEventsModal = (events: Array<Event>) => {
  allEvents.value = events;
  isAllEventsModalVisible.value = true;
};
</script>
