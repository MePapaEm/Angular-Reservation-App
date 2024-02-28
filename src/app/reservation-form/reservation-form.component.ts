import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReservationEntry } from '../shared/reservation-entry.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationDataService } from '../shared/reservation-data.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {

  editMode = false;
  entryMode = false;
  private paramId: string;
  reservationEntry: ReservationEntry;
  reservationForm: FormGroup;
  time: string; 

  constructor(private reservationDataService: ReservationDataService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.setNow();    
   }

  ngOnInit(): void {
    console.log('ReservationFormComponent.ngOnInit');
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.editMode = true;
        this.paramId = paramMap.get('id')!;
        let targetReservationEntry: ReservationEntry = this.reservationDataService.getDiaryEntry(this.paramId);
        //let dateTime: string = targetReservationEntry.dateDatePart + ' ' + targetReservationEntry.dateTimePart;
        this.reservationEntry = new ReservationEntry(targetReservationEntry.partyName, targetReservationEntry.partySize, targetReservationEntry.fullfilled, targetReservationEntry.dateTimePart, targetReservationEntry.dateDatePart);
        this.time = this.reservationEntry.dateTimePart
      }
      else if(paramMap.has('newId')){
        this.editMode = false;
        this.entryMode = true;
      }  
      else{
        this.editMode = false;
        this.entryMode = false;
      }
    })
    
    if (this.editMode) {
      this.reservationForm = new FormGroup({
        'date': new FormControl(this.reservationEntry.getFormattedDate(), [
          Validators.required,
          // validates date format yyyy-mm-dd with regular expression
          Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
        'time': new FormControl(this.reservationEntry.getFormattedTime()),
        'partyName': new FormControl(this.reservationEntry.partyName, [Validators.required]),
        'partySize' : new FormControl(this.reservationEntry.partySize, [
          Validators.required,
          // validates number with regular expression
          Validators.pattern("^[0-9]*$")]),
        'fullfilled' : new FormControl(this.reservationEntry.fullfilled, [Validators.required])
      });
    }
    
    if (this.entryMode) {
      const entry = new ReservationEntry("", 1, false, "", "");
      this.reservationForm = new FormGroup({
        'date': new FormControl(entry.getFormattedDate(), [
            Validators.required,
            // validates date format yyyy-mm-dd with regular expression
            Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]),
        'time': new FormControl(entry.getFormattedTime()),
        'partyName': new FormControl(null, [Validators.required]),
        'partySize' : new FormControl(1, [
            Validators.required,
            // validates number with regular expression
            Validators.pattern("^[0-9]*$")]),
        'fullfilled' : new FormControl(entry.fullfilled, [Validators.required])
      });
    } 
    
  }

  onSubmit(){
    let dateTime: string = this.reservationForm.value.date + ' ' + this.reservationForm.value.time;
    const entry = new ReservationEntry(this.reservationForm.value.partyName, this.reservationForm.value.partySize, this.reservationForm.value.fullfilled, this.reservationForm.value.time, this.reservationForm.value.date);
    console.log(this.reservationForm.value.fullfilled)
    if(this.editMode){
      entry.id = this.paramId;
      this.reservationDataService.updateEntry(this.paramId, entry);
    }
    else{
      this.reservationDataService.onAddReservationEntry(entry);
    }
    this.router.navigateByUrl("");
  }
  
  isDate(object: any): object is Date {
    return object instanceof Date && !isNaN(object.getTime());
  }

  setNow(){
    let now = new Date();
    let hours = ("0" + now.getHours()).slice(-2);
    let minutes = ("0" + now.getMinutes()).slice(-2);
    let str = hours + ':' + minutes;
    this.time = str;
  }

}
