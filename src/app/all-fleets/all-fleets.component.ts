import { Component, Input } from '@angular/core';

@Component({
  selector: 'all-fleets',
  templateUrl: './all-fleets.component.html',
  styleUrls: ['./all-fleets.component.css']
})
export class AllFleetsComponent {
  @Input() fleetData: object;
  constructor() { }
}
