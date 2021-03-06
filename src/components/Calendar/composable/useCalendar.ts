import moment from 'moment';
import { computed, ref, Ref } from 'vue';
import { SingleDay } from '../../../types/types';
import monthNames from '../monthNames';
import weekDayNames from '../weekDayNames';

export default function useCalendar() {
    const currentDate = moment();
    const selectedMonth = ref(moment().month());
    const monthDaysArray = ref<Array<SingleDay>>([]);
    const totalDaysSlots = 42;

    let firstDayIndex = 0;
    let firstDayOfPreviousMonthShowed = 0;

    const firstDayDate = computed(() => {
        return moment(currentDate).set('month', selectedMonth.value).startOf('month');
      });
      
      const firstDayNumber = computed(() => {
        return firstDayDate.value.day();
      });
      
      const monthDetails = computed(() => {
        return monthNames.find((month) => month.id === selectedMonth.value);
      });
      
      const daysInMonthCount = computed(() => {
        return currentDate.set('month', selectedMonth.value).daysInMonth();
      });

      const firstDayDetails = computed(() => {
        return weekDayNames.find((day) => day.number === firstDayNumber.value);
      });

      const prepareCurrentMonthObject = () => {
        for (let i = 0; i < totalDaysSlots; i += 1) {
            const dayNumber = checkIfDayInSlotActive(i) ? i - firstDayIndex + 1 : 0;
            const exampleObject: SingleDay = {
              id: i,
              dayNumber: dayNumber,
              isActive: checkIfDayInSlotActive(i),
              momentDate: moment(currentDate).set('date', dayNumber),
              events: []
            };
            monthDaysArray.value.push(exampleObject);
          }
    }
    
    const addPreviousAndLastMothDays = () => {
      let indexForNextMonthDays = 0;
          for (let i = 0; i < totalDaysSlots; i += 1) {
            if (!monthDaysArray.value[i].isActive) {
              if (i < daysInMonthCount.value) {
                monthDaysArray.value[i].dayNumber = firstDayOfPreviousMonthShowed + i;
                monthDaysArray.value[i].momentDate = moment(currentDate).subtract(1, 'months').set('date', firstDayOfPreviousMonthShowed + i)
              } else {
                indexForNextMonthDays += 1;
                monthDaysArray.value[i].dayNumber = indexForNextMonthDays;
                monthDaysArray.value[i].momentDate = moment(currentDate).add(1, 'months').set('date', indexForNextMonthDays)
              }
            }
          }
    }
    const checkIfDayInSlotActive = (slot: number) => {
        return !(
        slot < firstDayIndex
        || slot >=  firstDayIndex + daysInMonthCount.value
        );
    };
      
    const prepareCalendarMonth = () => {
        firstDayIndex = firstDayDetails.value ? firstDayDetails.value.id : 0;
        firstDayOfPreviousMonthShowed = firstDayDate.value.subtract(firstDayIndex, 'days').date();
        monthDaysArray.value = [];
        prepareCurrentMonthObject();
        addPreviousAndLastMothDays();
      }

      const prevMonth = () => {
        selectedMonth.value = currentDate.set('month', selectedMonth.value).subtract(1, 'months').month();
        prepareCalendarMonth();
      }
      
      const nextMonth = () => {
        selectedMonth.value = currentDate.set('month', selectedMonth.value).add(1, 'months').month();
        prepareCalendarMonth();
      }


      return {
        currentDate,
        monthDaysArray,
        monthDetails,
        prepareCalendarMonth,
        prevMonth,
        nextMonth
      }
}