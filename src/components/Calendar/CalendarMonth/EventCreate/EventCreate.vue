<template>
  <div class="EventCreate"> 
    <div class="EventCreate__popover-content">
      <div class="EventCreate__popover-header">
        Create new event
      </div>
      <div class="EventCreate__popover-description">
        <div class="EventCreate__popover-row">
          <label class="EventCreate__popover--title">
            name: 
          </label>
          <!-- <input 
            v-model="newEvent.name"
            
          > -->
        </div>
        <div class="EventCreate__popover-row">
          <label class="EventCreate__popover--title">
            start at: 
          </label>
          <datepicker
            v-model="newEvent.dateStart"
            :monday-first="true"
            class="EventCreate__popover--datepicker" 
          />
        </div>
        <div class="EventCreate__popover-row">
          <label class="EventCreate__popover--title">
            end at:
          </label>
          <datepicker
            v-model="newEvent.dateEnd"
            :monday-first="true"
            class="EventCreate__popover--datepicker" 
          />
        </div>
        <!-- <div class="EventCreate__popover-row">
          <label class="EventCreate__popover--title">
            color:
          </label>
          <span class="rounded-full h-1 w-1" />
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import Datepicker from 'vuejs3-datepicker';
import useEvents from '../../composable/useEvents';
import { uuid } from 'vue-uuid'; 
import { Event } from '../../../../types/types';

const {
    editEvent,
    removeEvent,
} = useEvents();

const newEvent: Event = {
    uuid: uuid.v1(),
    name: '',
    dateStart: '',
    dateEnd: '',
    color: '#A0CCE4',
};
</script>

<style lang="sass">
.EventCreate
    width: 100%
    border: 0px solid  !important

    &__popover
        &--title
            font-size: 11px
            font-weight: bold
            min-width: 50px
            color: darken(gray, 20%)

    &__popover-content
        height: 180px
        width: 280px
        
    &__popover-header
        height: 40px
        background: #FFF5E6
        border-bottom: 1px solid darken(#FFF5E6, 20%)
        padding: 10px
        display: flex
        align-items: baseline

    &__popover-header-icons
        display: flex
        margin-left: auto
        gap: 10px
        font-size: 14px

        .icons__icon
            margin: 0
            &:hover
                color: grey

    &__popover-description
        display: flex
        flex-direction: column
        padding: 10px
        text-align: left
        gap: 10px
        font-size: 13px

    &__popover-row
        display: flex
        flex-direction: row
        align-items: center
        gap: 10px
        font-size: 13px
        min-height: 34px

</style>