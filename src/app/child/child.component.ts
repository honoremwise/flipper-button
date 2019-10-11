import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Employee } from '../app.component';

@Component({
	selector: 'app-child',
	templateUrl: './child.component.html',
	styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges {

	@Input() employee: Employee;
	@Input() message: string;


	allMsgChangeLogs: string[] = [];
	allEmployeeChangeLogs: string[] = [];

	ngOnChanges(changes: SimpleChanges) {

		for (const propName in changes) {
			const change = changes[propName];

			const curVal = JSON.stringify(change.currentValue);
			const prevVal = JSON.stringify(change.previousValue);
			const changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;

			if (propName === 'message') {
				this.allMsgChangeLogs.push(changeLog);
			} else if (propName === 'employee') {
				this.allEmployeeChangeLogs.push(changeLog);
			}
		}
	}

	ngOnInit(): void {

	}

}
