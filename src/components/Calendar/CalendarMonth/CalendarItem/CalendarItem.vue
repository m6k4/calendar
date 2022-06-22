<template>
  <div class="CalendarItem">
    <div class="CalendarItem__title">
      <slot name="title" />
    </div>
    <div
      class="CalendarItem__header"
    >
      <Popper
        :disable-click-away="true"
        class="CalendarItem__popover popover-header"
      >
        <span 
          role="button"
          class="CalendarItem__content"
          :style="{ color: !dayElement.isActive ? '#b7b7b7' : '' }"
          :class="{ 'CalendarItem__content--current' : isToday }"
          @click="showCreateEventModal = true"
        >
          {{ dayElement.dayNumber }}
        </span>
        <template
          #content="{ close }"
        >
          <EventCreate
            v-if="showCreateEventModal"
            :date-details="dayElement.momentDate"
            @close-popover="close; showCreateEventModal = false"
          />
        </template>
      </Popper>
    </div>
    <div class="CalendarItem__events"> 
      <div
        v-for="event in getOnlyThreeEvents"
        :key="event.uuid"
        draggable="true"
        @dragstart="startDrag($event, event.uuid)"
      >
        <Popper
          :disable-click-away="true"
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
            #content="{ close }"
          >
            <EventDetails
              :event="event"
              @close-popover="close"
            />
          </template>
        </Popper>
      </div>
      <span 
        v-if="dayElement.events.length > 3"
        role="button" 
        class="CalendarItem__events--bottom"
      >
        <Popper
          :disable-click-away="true"
          class="CalendarItem__popover"
        >
          <span v-tooltip:bottom.tooltip="`Show ${dayElement.events.length - 3} more`">
            ...
          </span>
          <template
            #content="{ close }"
          >
            <EventList
              :events="dayElement.events"
              @close-popover="close"
            />
          </template>
        </Popper>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, PropType, ref } from 'vue';
import { Event, SingleDay } from '../../../../types/types';
import Popper from 'vue3-popper';
import EventDetails from '../EventModalContents/EventDetails/EventDetails.vue';
import EventCreate from '../EventModalContents/EventCreate/EventCreate.vue';
import EventList from '../EventModalContents/EventList/EventList.vue';
// eslint-disable-next-line no-undef
defineEmits(['editEvent']);
// eslint-disable-next-line no-undef
const props = defineProps({
    dayElement: {
      type: Object as PropType<SingleDay>,
      required: true,
    },
  });

const showCreateEventModal = ref(false);

const getOnlyThreeEvents = computed(() => {
  const eventsCopy: Array<Event> = props.dayElement.events;
  if (eventsCopy.length > 3) {
    return eventsCopy.slice(0, 3);
  }
  return eventsCopy;
});

//isToday
const isToday = computed(() => {
  return moment(moment().format('YYYY-MM-DD')).isSame(props.dayElement.momentDate.format('YYYY-MM-DD'));
});

const startDrag = (event: DragEvent, eventUuid: string) => {
  console.log('eventUuid', eventUuid)
};

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