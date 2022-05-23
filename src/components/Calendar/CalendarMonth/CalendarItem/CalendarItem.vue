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
        class="CalendarItem__day"
        :class="{ 'CalendarItem__day--current' : currentDay === day && isCurrentMonth }"
      >
        {{ day }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">


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
  currentDay: {
    type: Number,
    required: true,
  },
   isCurrentMonth: {
    type: Boolean,
    required: false,
  },
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

  &__day
    &--current
      border: 1px solid blue
      background: blue
      color: #fff
      padding: 4px
      border-radius: 50%


</style>