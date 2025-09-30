// src/app/core/services/deadline.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

export interface Deadline {
    id: number;
    title: string;
    dueDate: Date;
}

@Injectable({
    providedIn: 'root' // singleton service, available throughout the app
})

export class DeadlineService {
    private deadlines: Deadline[] = [];

    private baseUrl = 'https://api.open-meteo.com'; // Replace with your API endpoint

    constructor(private http: HttpClient) { }

    retrieveEndTimeOfDeadline<T>(pathParams: (string | number)[], queryParams?: HttpParams): Observable<T> {
        var endPoint = '/v1/forecast'; // Replace with your actual endpoint
        let url = this.baseUrl + endPoint + '/' + pathParams.join('/');

        return this.http.get<T>(url, { params: queryParams }).pipe(
            retry(3),
            catchError(error => {
                console.error('Error fetching data:', error);
                return throwError(() => new Error('Failed to fetch data from server'));
            })
        );
    }
}
