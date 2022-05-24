<template>
  <CalendarMonth 
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

const isNewEventModalVisible = ref(false);

</script>
