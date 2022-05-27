<template>
  <div class="EventDetails"> 
    <div class="EventDetails__popover-content">
      <div class="EventDetails__popover-header">
        <p class="EventDetails__popover-text">
          {{ event.name }}
        </p>
        <div class="EventDetails__popover-header-icons">
          <i 
            v-if="!isEditing"
            role="button"
            class="fa fa-pencil icons__icon" 
            aria-hidden="true"
            @click="isEditing = true"
          />
          <i 
            v-if="isEditing"
            role="button"
            class="fa fa-floppy-o icons__icon" 
            aria-hidden="true"
            @click="saveEvent"
          />
          <i 
            role="button"
            class="fa fa-trash icons__icon" 
            aria-hidden="true"
            @click="removeEvent(event)"
          />
        </div>
      </div>
      <div class="EventDetails__popover-description">
        <div class="EventDetails__popover-row">
          <label class="EventDetails__popover--title">
            start at: 
          </label>
          <span v-if="!isEditing">
            {{ event.dateStart }}
          </span>
          <span v-else>
            <datepicker
              v-model="newDateStart"
              :monday-first="true"
              class="EventDetails__popover--datepicker" 
            />
          </span>
        </div>
        <div class="EventDetails__popover-row">
          <label class="EventDetails__popover--title">
            end at:
          </label>
          <span v-if="!isEditing">
            {{ event.dateEnd }}
          </span>
          <span v-else>
            <datepicker
              v-model="newDateEnd"
              :monday-first="true"
              class="EventDetails__popover--datepicker" 
            />
          </span>
        </div>
        <div class="EventDetails__popover-row">
          <label class="EventDetails__popover--title">
            duration:
          </label>
          {{ moment.duration(moment(event.dateEnd).diff(moment(event.dateStart))).asDays() }} days
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { PropType, ref } from 'vue';
import { Event } from '../../../../types/types';
import Datepicker from 'vuejs3-datepicker';
import useEvents from '../../composable/useEvents';

// eslint-disable-next-line no-undef
const emit = defineEmits(['editEvent']);
// eslint-disable-next-line no-undef
const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
});

const {
    editEvent,
    removeEvent,
} = useEvents();

const isEditing = ref(false);
const newDateStart = ref(moment(props.event.dateStart).format('YYYY-MM-DD'));
const newDateEnd = ref(moment(props.event.dateEnd).format('YYYY-MM-DD'));

const saveEvent = () => {
  editEvent({
    uuid: props.event.uuid,
    dateStart: moment(newDateStart.value).format('YYYY-MM-DD'),
    dateEnd: moment(newDateEnd.value).format('YYYY-MM-DD'),
  });
  isEditing.value = false;
};

</script>

<style lang="sass">
.EventDetails
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
      
    &__popover-text
      text-overflow: ellipsis
      white-space: nowrap
      overflow: hidden

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