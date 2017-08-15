import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-all-fleets',
  templateUrl: './all-fleets.component.html',
  styleUrls: ['./all-fleets.component.css']
})
export class AllFleetsComponent {
  @Input() fleetData: object;
  @Input() showTaxis: boolean;
  @Input() showCars: boolean;

  @Output() toggleMarkers: EventEmitter<TMarkerType> = new EventEmitter<TMarkerType>();

  constructor() { }

  toggleTaxiIcons() {
    this.toggleMarkers.emit('taxis');
  }

  toggleCarIcons() {
    this.toggleMarkers.emit('cars');
  }
}
