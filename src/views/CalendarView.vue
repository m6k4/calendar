<template>
  <CalendarMonth 
    :events-list="eventsList"
    @show-new-event-modal="isNewEventModalVisible = !isNewEventModalVisible"
  />
  <ModalWindow 
    v-if="isNewEventModalVisible"
    @close-modal="isNewEventModalVisible = false"
  >
    <template #header>
      New event
    </template>
    <template #description>
      <NewEvent 
        @add-event="handleAddEvent"
        @close-modal="isNewEventModalVisible = false"
      />
    </template>
  </ModalWindow>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import ModalWindow from '../components/Common/ModalWindow.vue';
import NewEvent from '../components/Calendar/CalendarMonth/NewEvent/NewEvent.vue';
import CalendarMonth from '../components/Calendar/CalendarMonth/CalendarMonth.vue';
import useEvents from '../components/Calendar/composable/useEvents';
import { Event } from '../types/types';
const isNewEventModalVisible = ref(false);

const {
  addEvent,
  eventsList,
} = useEvents();

const handleAddEvent = (event: Event) => {
  addEvent(event);
  isNewEventModalVisible.value = false;
};
</script>
