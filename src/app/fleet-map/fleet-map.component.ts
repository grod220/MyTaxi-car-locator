import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var google: any;

@Component({
  selector: 'fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.css']
})
export class FleetMapComponent implements OnInit, OnChanges {
  @Input() fleetData: object;
  allMarkers: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('fleetData')) {
      console.log(changes);
    }
  }

  initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      disableDefaultUI: true
    });

    const runningSum = { lat:0, lng:0 };

    let taxiIcon = {
      scaledSize: new google.maps.Size(25, 25),
      origin: new google.maps.Point(0,0),
      anchor: new google.maps.Point(0, 0)
    };

    this.fleetData['taxis'].forEach(taxi=>{
      taxiIcon['url'] = taxi.state === 'ACTIVE' ? "../assets/taxi-active.png"
                                                : "../assets/taxi-inactive.png";
      this.allMarkers.push(
        new google.maps.Marker({
          position: {
            lat: taxi.coordinate.latitude,
            lng: taxi.coordinate.longitude
          },
          map: map,
          icon: taxiIcon
        })
      )
      runningSum.lat += taxi.coordinate.latitude,
      runningSum.lng += taxi.coordinate.longitude
    })

    let carIcon = {
        url: '../assets/car2go.png',
        scaledSize: new google.maps.Size(27, 17),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
    };

    this.fleetData['car2go'].forEach(car2go=>{
      new google.maps.Marker({
        position: {
          lat: car2go.coordinates[1],
          lng: car2go.coordinates[0]
        },
        map: map,
        icon: carIcon
      })
      runningSum.lat += car2go.coordinates[1];
      runningSum.lng += car2go.coordinates[0];
    })

    // Get average location to center the Map
    let totalCount = this.fleetData['car2go'].length + this.fleetData['taxis'].length;
    const averageLoc = {
      lat: runningSum.lat / totalCount,
      lng: runningSum.lng / totalCount
    };
    map.setCenter(averageLoc);
  }

  hideMarkers() {
    this.allMarkers.forEach(marker => marker.setVisible(false));
  }
}
