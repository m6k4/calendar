<template>
  <div
    class="CalendarWeek"
  >
    <div class="CalendarWeek__header">
      <i 
        class="fa fa-chevron-left CalendarWeek__header__icon" 
        aria-hidden="true"
      />
      <div class="CalendarWeek__header__title"> 
        test
      </div>
      <i  
        class="fa fa-chevron-right CalendarWeek__header__icon" 
        aria-hidden="true"
      />
    </div>
    <div class="CalendarWeek__items">
      items
    </div>
  </div>
</template>

<script setup lang="ts">
import { Event } from '../../../types/types';
import { PropType } from 'vue';

// eslint-disable-next-line no-undef
const props = defineProps({
  eventsList: {
    type: Object as PropType<Array<Event>>,
    required: true,
  },
});

</script>
<style lang="sass">
.CalendarWeek
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
    grid-template-columns: repeat(7, minmax(0, 1fr))
    border-bottom: 1px solid grey
    border-left: 1px solid grey

  &__header
    font-size: 20px
    margin-bottom: 15px
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