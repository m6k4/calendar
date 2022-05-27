<template>
  <div class="h-full flex flex-col">
    <div
      v-for="event in events"
      :key="event.uuid"
      class="flex flex-row justify-between items-center px-4 py-2"
    >
      <div class="text-s text-gray-600">
        {{ event.name }}
      </div>
      <div class="text-xs text-gray-500 font-bold">
        {{ event.dateStart }} - {{ event.dateEnd }} 
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Event } from '../../../../types/types';

// eslint-disable-next-line no-undef
defineProps({
  events: {
    type: Object as PropType<Array<Event>>,
    required: true,
  },
});

</script>