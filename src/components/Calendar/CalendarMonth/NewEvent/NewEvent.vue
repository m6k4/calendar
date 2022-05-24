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
      @click="addEvent"
      class="w-full p-2 rounded border border-transparent border-gray-300 focus:outline-none hover:scale-105 focus:border-gray-500 mt-auto bg-purple-500 text-white focus:bg-purple-600"
    >
      Add new event
    </button> 
  </div>  
</template>

<script setup lang="ts">import { ref } from 'vue';

// eslint-disable-next-line no-undef
const emit = defineEmits(['closeModal']);

const eventName = ref('');
const addEvent = () => {
  emit('closeModal');
};

</script>