import { Routes } from '@angular/router';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

export const routes: Routes = [
    { path:"", component: ReservationComponent },
    { path:"data-entry/:newId", component: ReservationFormComponent },
    { path:'edit/:id', component: ReservationFormComponent }
];
