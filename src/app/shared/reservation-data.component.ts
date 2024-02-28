import { Injectable } from "@angular/core";
import { ReservationEntry } from "./reservation-entry.model";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ReservationDataService {

    reservationSubject = new Subject<ReservationEntry[]>();

    reservations: ReservationEntry[] = [];

    constructor() {
        let localStorageReservations: any = localStorage.getItem('reservations');
        if (!this.isEmpty(localStorageReservations)) {
            let targetReservations = JSON.parse(localStorageReservations);
            targetReservations.forEach((element: ReservationEntry) => {
                this.reservations.push(new ReservationEntry(element.partyName, element.partySize, element.fullfilled, element.dateTimePart, element.dateDatePart));
            });
        }
    }

    updateEntry(id: string, entry: ReservationEntry) {
        this.reservations = this.reservations.map(x => x.id === id? entry : x);
        this.reservationSubject.next(this.reservations);
        localStorage.setItem('reservations',JSON.stringify(this.reservations))
    }

    onDeleteEntry(index: number){
        console.log('DELETE ' + index)
        this.reservations.splice(index, 1); 
        this.reservationSubject.next(this.reservations)
        localStorage.setItem('reservations',JSON.stringify(this.reservations))
    }

    onAddReservationEntry(reservationEntry: ReservationEntry){        
        console.log(reservationEntry);
        this.reservations.push(reservationEntry);
        this.reservationSubject.next(this.reservations);
        localStorage.setItem('reservations',JSON.stringify(this.reservations))
    }

    getDiaryEntry(id: string){        
        const index = this.reservations.findIndex(el => {
            return el.id == id;
        })
        return this.reservations[index];
    }

    isEmpty(value: any) {
        return (value == null || (typeof value === "string" && value.trim().length === 0));
    }

}