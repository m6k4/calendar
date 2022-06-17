<template>
  <div class="EventList"> 
    <div class="EventList__popover-content">
      <div class="EventList__popover-header">
        <p class="EventList__popover-text">
          Events list
        </p>
        <div class="EventList__popover-header-icons">
          <i 
            role="button"
            class="fa fa-window-close icons__icon" 
            aria-hidden="true"
            @click="closeModal"
          />
        </div>
      </div>
      <div class="EventList__popover-description">
        <div
          v-for="event in events"
          :key="event.uuid"
          class="EventList__popover-row"
        >
          <div class="EventList__popover-row-left">
            <p class="EventList__popover-name">
              <b>{{ event.name }}</b>
            </p>
          </div>
          <div class="EventList__popover-row-right">
            duration: {{ moment.duration(moment(event.dateEnd).diff(moment(event.dateStart))).asDays() + 1 }} days
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Event } from '../../../../types/types';
import moment from 'moment';
// eslint-disable-next-line no-undef
const emit = defineEmits(['closePopover']);
// eslint-disable-next-line no-undef
const props = defineProps({
  events: {
    type: Object as PropType<Array<Event>>,
    required: true,
  },
});

const closeModal = () => {
  emit('closePopover');
};

</script>

<style lang="sass">
.EventList
    width: 100%
    border: 0px solid  !important

    &__popover
        &--title
            font-size: 11px
            font-weight: bold
            min-width: 50px
            color: darken(gray, 20%)

    &__popover-content
        max-height: 100px
        width: 280px
        overflow: auto 
        
    &__popover-header
        height: 40px
        background: #FFF5E6
        border-bottom: 1px solid darken(#FFF5E6, 20%)
        padding: 10px
        display: flex
        align-items: baseline
      
    &__popover-text
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden

    &__popover-name
      text-transform: capitalize
      font-size: 12px

    &__popover-header-icons
        display: flex
        margin-left: auto
        gap: 10px
        font-size: 14px
        color: darken(grey, 20%)

        .icons__icon
            margin: 0
            &:hover
                color: grey

    &__popover-description
        display: flex
        flex-direction: column
        padding: 10px
        text-align: left
        gap: 2px
        font-size: 13px

    &__popover-row
        display: flex
        flex-direction: row
        justify-content: space-between
        font-size: 13px
        min-height: 34px

</style>