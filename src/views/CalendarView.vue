<template>
  <el-select
    class="p-8"
    v-model="selectedView" 
    placeholder="Select view"
  >
    <el-option
      v-for="(view, index) in viewsTypes"
      :key="index"
      :label="view"
      :value="view"
    />
  </el-select>
  <CalendarMonth 
    v-if="selectedView === 'month'"
    :events-list="eventsList"
  />
  <CalendarWeek 
    v-if="selectedView === 'week'"
    :events-list="eventsList"
  />
</template>
<script setup lang="ts">
import CalendarMonth from '../components/Calendar/CalendarMonth/CalendarMonth.vue';
import CalendarWeek from '../components/Calendar/CalendarWeek/CalendarWeek.vue';
import useEvents from '../components/Calendar/composable/useEvents';
import { ElSelect, ElOption } from 'element-plus'
import { ref } from 'vue';
const {
  eventsList,
} = useEvents();

const selectedView = ref('month');

const viewsTypes = ['month', 'week']
</script>
