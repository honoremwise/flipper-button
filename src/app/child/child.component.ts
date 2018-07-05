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

		for (let propName in changes) {
			let change = changes[propName];

			let curVal = JSON.stringify(change.currentValue);
			let prevVal = JSON.stringify(change.previousValue);
			let changeLog = `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`;

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
