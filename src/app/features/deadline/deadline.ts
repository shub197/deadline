import { Component, OnInit } from '@angular/core';
import { DeadlineService } from '../../core/services/deadline.service';
import { HttpParams } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import { convertRawParamsToHttpParams } from '../../core/utilities/http-params.utils';

@Component({
    selector: 'app-deadline',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './deadline.html',
    styleUrls: ['./deadline.scss']
})

export class Deadline {
    constructor(private DeadlineService: DeadlineService) { }

    deadlineData: any = {};

    ngOnInit(): void {
        this.getEndTimeOfDeadline();
    }

    getEndTimeOfDeadline(): void {
        const pathParams: (number | string)[] = [];
        // add multiple path params as needed [1, 'details', 'more']

        var rawParams = {
            latitude: '26.2389',
            longitude: '73.0243',
            current: 'temperature_2m,wind_speed_10m'
        }

        const queryParams = convertRawParamsToHttpParams(rawParams);

        this.DeadlineService.retrieveEndTimeOfDeadline<any>(pathParams, queryParams)
            .subscribe({
                next: response => {
                    if (response) {
                        this.deadlineData = response;
                    } else {
                        this.deadlineData = { secondsLeft: "No Data Found" }
                    }

                    setTimeout(() => this.getEndTimeOfDeadline(), 1000);
                },
                error: err => {
                    console.error(err.message)
                }
            });
    }
}
