<template>
  <div
    class="EventCreate"
  > 
    <div class="EventCreate__popover-content">
      <div class="EventCreate__popover-header">
        Create new event {{ newEvent.dateStart }}
        <div class="EventCreate__popover-header-icons">
          <i 
            role="button"
            class="fa fa-floppy-o icons__icon" 
            aria-hidden="true"
            @click="saveEvent"
          />
          <i 
            role="button"
            class="fa fa-window-close icons__icon" 
            aria-hidden="true"
            @click="closeModal"
          />
        </div>
      </div>
      <div class="EventCreate__popover-description">
        <div class="EventCreate__popover-row">
          <label class="EventCreate__popover--title">
            name: 
          </label>
          <input
            v-model="newEvent.name"
            type="text"
            required
            min="1"
            class="h-7 w-full rounded border border-transparent border-gray-300 p-2 cursor-text focus:outline-none focus:border-gray-500"
            placeholder="event name"
          >
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment, { Moment } from 'moment';
import Datepicker from 'vuejs3-datepicker';
import useEvents from '../../../composable/useEvents';
import { uuid } from 'vue-uuid'; 
import { Event } from '../../../../types/types';
import { PropType, Ref, ref, watch } from 'vue';

// eslint-disable-next-line no-undef
const emit = defineEmits(['closePopover']);
// eslint-disable-next-line no-undef
const props = defineProps({
  dateDetails: {
    type: Object as PropType<Moment>,
    required: true,
  },
});

const {
    createEvent,
} = useEvents();

let newEvent: Ref<Event> = ref({
  uuid: uuid.v1(),
  name: '',
  dateStart: moment(props.dateDetails).format('YYYY-MM-DD'),
  dateEnd: moment(props.dateDetails).format('YYYY-MM-DD'),
  color: '#A0CCE4',
});

const saveEvent = () => {
  const eventParams = {
    ...newEvent,
        dateStart: moment(newEvent.value.dateStart).format('YYYY-MM-DD'),
        dateEnd: moment(newEvent.value.dateEnd).format('YYYY-MM-DD'),
    };
    createEvent(eventParams.value);
    clearForm();
    emit('closePopover');
};

const closeModal = () => {
  clearForm();
  emit('closePopover');
};

const clearForm = () => {
    newEvent.value.name = '';
    newEvent.value.dateStart = '';
    newEvent.value.dateEnd = '';
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