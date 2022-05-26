<template>
  <div class="CalendarItem">
    <div
      class="CalendarItem__box"
      :class="{ 'CalendarItem__box--inactive': !isActive }"
    >
      <slot name="title" />
      <label
        class="CalendarItem__header"
      >
        <span 
          role="button"
          class="CalendarItem__content"
          :class="{ 'CalendarItem__content--current' : isToday }"
          @click="$emit('showNewEventModal', {day})"
        >
          {{ day }}
        </span>
      </label>
      <div class="CalendarItem__events"> 
        <div
          v-for="event in events"
          :key="event.uuid"
        >
          <Popper
            arrow
            class="CalendarItem__popover"
          >
            <div 
              class="CalendarItem__event"
              :style="`background:${event.color}`"
            >
              <span class="CalendarItem__event__title">
                {{ event.name }}
              </span>
            </div>
            <template
              #content
            >
              <TaskDetails
                :event="event"
              />
            </template>
          </Popper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, PropType } from 'vue';
import { Event } from '../../../../types/types';
import Popper from 'vue3-popper';
import TaskDetails from '../TaskDetails/TaskDetails.vue';

// eslint-disable-next-line no-undef
defineEmits(['showNewEventModal', 'editEvent']);
// eslint-disable-next-line no-undef
const props = defineProps({
  day: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  momentDate: {
    type: Object,
    required: true,
  },
  events: {
    type: Object as PropType<Array<Event>>,
    required: true,
  },
  });

//isToday
const isToday = computed(() => {
  return moment(moment().format('YYYY-MM-DD')).isSame(props.momentDate.format('YYYY-MM-DD'));
});

</script>

<style lang="sass">
.CalendarItem
  border-top: 1px solid grey
  border-right: 1px solid grey

  &__box
    width: 100%
    min-height: 110px
    padding-bottom: 4px
    max-height: 140px

    &--inactive
      color: lighten(grey, 20%)

  &__header
    margin-top: 2px
    display: flex
    justify-content: center
    align-items: center

  &__content
    padding: 4px
    width: 30px
    font-size: 13px
    
    &:hover
      cursor: pointer
      background: lighten(gray, 45%)
      border-radius: 50%

    &--current
      background: #5461c4
      color: #fff
      border-radius: 50%
      &:hover
        cursor: pointer
        background: lighten(#5461c4, 20%)
        border-radius: 50%
  
  &__events
    display: flex
    flex-direction: column
    margin-top: 2px
    gap: 2px
    font-size: 13px

  &__popover
    width: 100%
    border: 0px solid  !important
    &--title
      font-size: 11px
      font-weight: bold
      color: darken(gray, 20%)

  &__event
    border-radius: 5px
    color: #fff
    width: 99%
    &:hover
      cursor: pointer
      opacity: 0.8

</style>