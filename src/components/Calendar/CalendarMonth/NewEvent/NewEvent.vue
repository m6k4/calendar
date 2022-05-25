<template>
  <div class="h-full flex flex-col">
    <input
      id="eventName"
      v-model="eventName"
      aria-label="eventName"
      type="text"
      required
      min="1"
      class="w-full rounded border border-transparent border-gray-300 p-2 cursor-text focus:outline-none focus:border-gray-500"
      placeholder="event name"
    >
    <button
      class="w-full p-2 rounded border border-transparent border-gray-300 focus:outline-none hover:scale-105 focus:border-gray-500 mt-auto bg-purple-500 text-white focus:bg-purple-600"
      @click="addEvent"
    >
      Add new event
    </button> 
  </div>  
</template>

<script setup lang="ts">import { ref } from 'vue';
import { Event } from '../../../../types/types';
import { uuid } from 'vue-uuid'; 

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeModal', 'addEvent']);

const eventName = ref('');

const addEvent = () => {
  console.log('dd');
  const event: Event = {
    uuid: uuid.v1(),
    name: eventName.value,
    dateStart: '2022-05-04',
    dateEnd: '2022-05-05',
    color: '#A0CCE4'
  };
  emit('addEvent', event);
};
</script>