import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Deadline } from './features/deadline/deadline';

@Component({
    selector: 'app-root',
    imports: [Deadline, RouterOutlet],
    templateUrl: './app.html',
    styleUrls: ['./app.scss']
})
export class App {
    protected title = 'deadline';
}
