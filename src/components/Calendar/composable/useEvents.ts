import exampleEvents from '../exampleEvents';
import { Event, SingleDay } from '../../../types/types';
import moment from 'moment';
import { computed, ref } from 'vue';

const eventsList = ref<Array<Event>>(exampleEvents);
export default function useEvents() {
    // const eventsList = ref<Array<Event>>(exampleEvents);

    const addEvent = (event: Event) => {
      console.log(eventsList);
      eventsList.value.push(event);
    }

    const editEvent = (event: Event) => {
     
      eventsList.value = eventsList.value.map((item: Event) => {
        if (item.uuid === event.uuid) {
          console.log(event.dateStart, event.dateEnd)
          return {
            ...item,
            dateStart: event.dateStart,
            dateEnd: event.dateEnd
          };
        } else {
          return item;
        }
      });
    }

    const fillCalendarWithEvents = (calendar: Array<SingleDay>) => {
      calendar = clearEvents(calendar);
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

    const clearEvents = (calendar: Array<SingleDay>) => {
      calendar.forEach((day: SingleDay) => {
        day.events = [];
      });
      return calendar
    }
  
    return {
      eventsList: computed(() => eventsList.value),
      addEvent,
      editEvent,
      fillCalendarWithEvents
    }
}