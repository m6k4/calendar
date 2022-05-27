<template>
  <div class="CalendarItem">
    <div class="CalendarItem__title">
      <slot name="title" />
    </div>
    <div
      class="CalendarItem__header"
    >
      <Popper
        arrow
        :disable-click-away="false"
        class="CalendarItem__popover popover-header"
      >
        <span 
          role="button"
          class="CalendarItem__content"
          :style="{ color: !isActive ? '#b7b7b7' : '' }"
          :class="{ 'CalendarItem__content--current' : isToday }"
        >
          {{ day }}
        </span>
        <template
          #content="{ close }"
        >
          <EventCreate 
            :date-details="momentDate"
            @close-popover="close"
          />
        </template>
      </Popper>
    </div>
    <div class="CalendarItem__events"> 
      <div
        v-for="event in getOnlyThreeEvents"
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
            <EventDetails
              :event="event"
            />
          </template>
        </Popper>
      </div>
      <span 
        v-if="events.length > 3"
        role="button" 
        class="CalendarItem__events--bottom"
        @click="$emit('showAllEvents', events)"
      >
        ...
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment, { Moment } from 'moment';
import { computed, PropType, ref } from 'vue';
import { Event } from '../../../../types/types';
import Popper from 'vue3-popper';
import EventDetails from '../EventDetails/EventDetails.vue';
import EventCreate from '../EventCreate/EventCreate.vue';
import Datepicker from 'vuejs3-datepicker';

// eslint-disable-next-line no-undef
defineEmits(['showAllEvents', 'editEvent']);
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
    type: Object as PropType<Moment>,
    required: true,
  },
  events: {
    type: Object as PropType<Array<Event>>,
    required: true,
  },
  });


const getOnlyThreeEvents = computed(() => {
  const eventsCopy: Array<Event> = props.events;
  if (eventsCopy.length > 3) {
    return eventsCopy.slice(0, 3);
  }
  return eventsCopy;
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
  height: 110px
  position: relative

  &__title
    font-size: 12px
    position: absolute
    bottom: 110px
    left: 66px

  &__header
    display: flex
    justify-content: center
    align-items: center
    position: relative
    padding: 2px

  &__content
    font-size: 13px
    padding: 4px
    
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
    margin-top: 4px
    gap: 2px
    font-size: 13px
    height: 70%
    position: relative
    &--bottom
      font-size: 18px
      position: absolute
      bottom: 0px
      left: 70px
      cursor: pointer
      &:hover
        cursor: pointer
        color: lighten(gray, 10%)

  &__popover
    width: 100%
    border: 0px solid  !important
    text-align: center

    &--title
      font-size: 11px
      font-weight: bold
      color: darken(gray, 20%)

  .popover-header
    padding: 12px

  &__event
    border-radius: 5px
    color: #fff
    width: 98%
    display: inline-block
    text-overflow: ellipsis
    white-space: nowrap
    overflow: hidden
    padding: 0 6px 0 6px

    &:hover
      cursor: pointer
      opacity: 0.8

</style>