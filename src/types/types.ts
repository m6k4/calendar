export interface SingleDay { 
    id: number;
    dayNumber: number;
    isActive: boolean;
    momentDate: moment.Moment;
    events: Array<Event>;
}

export interface Event {
    uuid: string;
    name?: string;
    dateStart: string;
    dateEnd: string;
    color?: string;
}
