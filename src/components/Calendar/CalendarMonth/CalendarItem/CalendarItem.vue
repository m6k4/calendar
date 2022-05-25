<template>
  <div class="CalendarItem">
    <div class="CalendarItem__title">
      <slot name="title" />
    </div>
    <div
      class="CalendarItem__box"
      :class="{ 'CalendarItem__box--inactive': !isActive }"
    >
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
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed } from 'vue';

// eslint-disable-next-line no-undef
defineEmits(['showNewEventModal']);
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

  &__title
    margin-bottom: 10px
    color: lighten(grey, 20%)

  &__box
    width: 100%
    height: 100px

    &--inactive
      color: lighten(grey, 20%)

  &__header
    display: flex
    justify-content: center
    align-items: center

  &__content
    padding: 8px
    width: 40px
    
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

</style>