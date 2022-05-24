<template>
  <div class="CalendarMonth">
    <div class="CalendarMonth__header">
      <i 
        class="fa fa-chevron-left CalendarMonth__header__icon" 
        aria-hidden="true"
        @click="prevMonth"
      />
      {{ monthDetails?.engName }} {{ currentDate.year() }}
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
        :current-day="currentDay"
        :is-current-month="moment().month() === selectedMonth"
      >
        <template #title>
          {{ weekDayNames.find((day) => day.id === dayElement.id)?.shortName }}
        </template>
      </CalendarItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import weekDayNames from '../weekDayNames';
import CalendarItem from './CalendarItem/CalendarItem.vue';
import useCalendar from '../composable/useCalendar';

const {
  selectedMonth,
  currentDate,
  monthDaysArray,
  currentDay,
  monthDetails,
  prepareCalendarMonth,
  prevMonth,
  nextMonth
} = useCalendar();

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

    &__icon
      cursor: pointer
      color: grey
      font-size: 20px
      &:hover
        color: blue

</style>