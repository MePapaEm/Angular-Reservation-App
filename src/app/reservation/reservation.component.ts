import { Component, OnDestroy, OnInit} from '@angular/core';
import { ReservationDataService } from '../shared/reservation-data.component';
import { ReservationEntry } from '../shared/reservation-entry.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, ReactiveFormsModule],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit, OnDestroy {
  reservationEntries: ReservationEntry[];
  reservationSubcription: Subscription = new Subscription;
  checkboxState = false;

  constructor(private reservationDataService: ReservationDataService, private router: Router) { }

  ngOnInit(): void {     
    this.reservationSubcription = this.reservationDataService.reservationSubject.subscribe(reservationEntries => { this.reservationEntries = reservationEntries});
    this.reservationEntries = this.reservationDataService.reservations;    
  }

  ngOnDestroy(): void {
    this.reservationSubcription.unsubscribe;  
  }

  onDelete(id: string, index: number) {
    console.log(id);
    this.reservationDataService.onDeleteEntry(index);
  }

  onEdit(id: string, index: number) {
    console.log(id); 
    this.router.navigate(['edit',id])   
  }
}