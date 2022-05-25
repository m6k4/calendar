import exampleEvents from '../exampleEvents';
import { Event, SingleDay } from '../../../types/types';
import moment from 'moment';
import { computed, ref } from 'vue';

export default function useEvents() {
    const eventsList = ref<Array<Event>>(exampleEvents);

    const addEvent = (event: Event) => {
      console.log(eventsList);
      eventsList.value.push(event);
    }

    const fillCalendarWithEvents = (calendar: Array<SingleDay>) => {
      calendar.forEach((day: SingleDay) => {
        const dayDate = day.momentDate.format('YYYY-MM-DD');

        eventsList.value.forEach((event: Event) => {
          const eventDateStart = moment(event.dateStart).format('YYYY-MM-DD');
          const eventDateEnd = moment(event.dateEnd).format('YYYY-MM-DD');

          if (moment(dayDate).isBetween(eventDateStart, eventDateEnd, null, '[]')) {
            if(!day.events.some(dayEvent => dayEvent.uuid === event.uuid)){
              day.events.push(event);
            }
          }
        });
      });
    }
  
    return {
      eventsList: computed(() => eventsList.value),
      addEvent,
      fillCalendarWithEvents
    }
}