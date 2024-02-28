import { DatePipe } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';

export class ReservationEntry{
    id!: string
    date!: Date;
    dateDatePart!: string;
    dateTimePart!: string;
    partyName!: string;
    partySize!: number;
    cancelled!: boolean;
    cancelReason!: string;
    cancelledBy!: string;
    cancelledDate!: Date;
    fullfilled!: boolean;

    constructor(partyName: string, partySize: number, fullfilled: boolean, dateTimePart: string, dateDatePart: string) {
        this.id = uuidv4();
        this.date = new Date();       
        this.partyName = partyName;
        if (this.isEmpty(partySize) || partySize < 1) { this.partySize = 1; } else { this.partySize = partySize; };
        this.fullfilled = fullfilled;
        this.dateTimePart = dateTimePart;
        this.dateDatePart = dateDatePart;
        let dateTime: string = this.dateDatePart + ' ' + this.dateTimePart;
        if (!this.isEmpty(dateTime)) { this.date = new Date(dateTime); } 
    }

    getDate(): Date {
        return this.date;
    }
    getPartyName(): string {
        return this.partyName;
    } 
    getPartySize(): number {
        return this.partySize;    
    }
    getCancelled(): boolean {
       return this.cancelled;
    } 
    getCancelReason(): string {
        return this.cancelReason;
    }
    getCancelledBy(): string {
        return this.cancelledBy;
    }
    getCancelledDate(): Date {
        return this.cancelledDate;
    } 
    getFullfilled(): boolean {
        return this.fullfilled;
    } 

    setID(id: string) {
        this.id = id;
    }
    setDate(date: Date): void {
        this.date = date;
    } 
    setPartyName(partyName: string): void {
        this.partyName = partyName;
    }
    setPartySize(partySize: number): void {
        this.partySize = partySize;
    }
    setCancelled(cancelled: boolean): void {
        this.cancelled = cancelled;
    } 
    setCancelReason(cancelReason: string): void {
        this.cancelReason = cancelReason;
    }
    setCancelledBy(cancelledBy: string): void {
        this.cancelledBy = cancelledBy;
    }
    setCancelledDate(cancelledDate: Date): void {
        this.cancelledDate = cancelledDate;
    }
    setFullfilled(fullfilled: boolean): void {
        this.fullfilled = fullfilled;
    }
    
    getFormattedDate(): string {
        if (this.isEmpty(this.date)) { this.date = new Date(); };
        let frommattedDate = new DatePipe('en-US').transform(this.date, 'yyyy-MM-dd');  
        if (frommattedDate == null) {
            return "";
        }   
        else 
        {
            return frommattedDate;    
        }
    }

    getFormattedDateTime(): string {
        let frommattedDate = new DatePipe('en-US').transform(this.date, 'short');  
        if (frommattedDate == null) {
            return "";
        }   
        else 
        {
            return frommattedDate;    
        }
    }

    getFormattedTime(): string {
        let frommattedDate = new DatePipe('en-US').transform(this.date, 'shortTime');  
        if (frommattedDate == null) {
            return "";
        }   
        else 
        {
            return frommattedDate;    
        }
    }

    print(): void {
        console.log(`${this.date} ${this.partyName} ${this.partySize}`);
    }
    printLong(): void {
       console.log(`${this.date} ${this.partyName} ${this.partySize}`);
    }

    isEmpty(value: any) {
        return (value == null || (typeof value === "string" && value.trim().length === 0));
    }
}