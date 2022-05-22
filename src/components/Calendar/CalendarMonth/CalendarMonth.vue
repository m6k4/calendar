<template>
  <div class="CalendarMonth">
    {{ monthDaysArray }}
    <!-- <CalendarItem
      v-for="dayElement in monthDaysArray"
      :key="dayElement.id"
      :day="dayElement.dayNumber"
      :is-active="dayElement.isActive"
      :current-day="currentDay"
    >
      <template #title>
        {{ weekDayNames.find((day) => day.id === dayElement.id)?.shortName }}
      </template>
    </CalendarItem> -->
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, ref } from 'vue';
import { SingleDay } from '../../../types/types';
import weekDayNames from './weekDayNames';
import CalendarItem from './CalendarItem/CalendarItem.vue';

const currentDate = moment();
const monthDaysArray: Array<SingleDay> = [];
const totalDaysSlots = 42;
const firstDayIndex = ref(0);
const firstDayOfPreviousMonthShowed = ref(0);


const daysInMonthCount = computed(() => {
  return currentDate.daysInMonth();
});

const currentDay = computed(() => {
  return currentDate.date();
});

const prepareCurrentMonthObject = () => {
    for (let i = 0; i < totalDaysSlots; i += 1) {
        const exampleObject = {
          id: i,
          dayNumber: checkIfDayInSlotActive(i)
            ? i - firstDayIndex.value + 1
            : 0,
          isActive: checkIfDayInSlotActive(i),
        };
        monthDaysArray.push(exampleObject);
      }
}

const checkIfDayInSlotActive = (slot: number) => {
    return !(
    slot < firstDayIndex.value
    || slot > daysInMonthCount.value + 1
    );
};

prepareCurrentMonthObject();
</script>
<style lang="sass">

.TheCalendar 
  display: flex

</style>