<template>
  <div class="CalendarMonth">
    <div class="CalendarMonth__header">
      <i 
        class="fa fa-chevron-left CalendarMonth__header__icon" 
        aria-hidden="true"
        @click="prevMonth"
      />
      <div class="CalendarMonth__header__title"> 
        {{ monthDetails?.engName }} {{ currentDate.year() }}
      </div>
      <i  
        class="fa fa-chevron-right CalendarMonth__header__icon" 
        aria-hidden="true"
        @click="nextMonth"
      />
    </div>
    <div class="CalendarMonth__items">
      <CalendarItem
        v-for="dayElement in monthDaysArray"
        :key="dayElement.id"
        :day="dayElement.dayNumber"
        :is-active="dayElement.isActive"
        :moment-date="dayElement.momentDate"
        :events="dayElement.events"
        @show-new-event-modal="$emit('showNewEventModal', $event)"
      >
        <template #title>
          {{ weekDayNames.find((day) => day.id === dayElement.id)?.shortName }}
        </template>
      </CalendarItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import weekDayNames from '../weekDayNames';
import CalendarItem from './CalendarItem/CalendarItem.vue';
import useCalendar from '../composable/useCalendar';
import { Event } from '../../../types/types';
import { PropType, watch } from 'vue';
import useEvents from '../composable/useEvents';

// eslint-disable-next-line no-undef
defineEmits(['showNewEventModal']);
// eslint-disable-next-line no-undef
const props = defineProps({
  eventsList: {
    type: Object as PropType<Array<Event>>,
    required: true,
  },
});

const {
  currentDate,
  monthDaysArray,
  monthDetails,
  prepareCalendarMonth,
  prevMonth,
  nextMonth
} = useCalendar();

const {
  eventsList,
  fillCalendarWithEvents,
} = useEvents();


watch(monthDaysArray, () => {
  fillCalendarWithEvents(monthDaysArray.value);
});

watch(eventsList, () => {
  console.log('TEST232');
  fillCalendarWithEvents(monthDaysArray.value);
}, { deep: true });

prepareCalendarMonth();

</script>
<style lang="sass">
.CalendarMonth
  margin: 0
  position: absolute
  top: 50%
  left: 50%
  -ms-transform: translate(-50%, -50%)
  transform: translate(-50%, -50%)
  width: 1100px
  height: 700px
  text-align: center

  &__items
    display: grid
    grid-template-columns: repeat(7, 1fr)
    border-bottom: 1px solid grey
    border-left: 1px solid grey
    grid-gap: 1px


  &__header
    font-size: 20px
    margin-bottom: 10px
    display: flex
    flex-direction: row
    justify-content: center

    &__title
      min-width: 200px

    &__icon
      cursor: pointer
      color: #bebfce
      font-size: 20px
      &:hover
        color: #5461c4

</style>