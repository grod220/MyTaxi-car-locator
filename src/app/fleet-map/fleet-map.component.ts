import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.component.html',
  styleUrls: ['./fleet-map.component.css']
})
export class FleetMapComponent implements OnInit, OnChanges {
  @Input() fleetData: object;
  @Input() showTaxis: boolean;
  @Input() showCars: boolean;

  allMarkers: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.showTaxis) {
      this.allMarkers.filter(marker => marker.name === 'taxi')
                     .forEach(marker => marker.setVisible(this.showTaxis));
    }

    if (changes.showCars) {
      this.allMarkers.filter(marker => marker.name === 'car2go')
                     .forEach(marker => marker.setVisible(this.showCars));
    }
  }

  initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13
    });

    const runningSum = { lat: 0, lng: 0 };

    const taxiIcon = {
      scaledSize: new google.maps.Size(25, 25),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 0)
    };

    this.fleetData['taxis'].forEach(taxi => {
      taxiIcon['url'] = taxi.state === 'ACTIVE' ? '../assets/taxi-active.png'
                                                : '../assets/taxi-inactive.png';
      const newMarker = new google.maps.Marker({
        position: {
          lat: taxi.coordinate.latitude,
          lng: taxi.coordinate.longitude
        },
        map: map,
        icon: taxiIcon,
        name: 'taxi'
        });

        const infowindow = new google.maps.InfoWindow({
          content: String(taxi.id)
        });

        newMarker.addListener('click', function() {
          infowindow.open(map, newMarker);
        });

      this.allMarkers.push(newMarker);
      runningSum.lat += taxi.coordinate.latitude,
      runningSum.lng += taxi.coordinate.longitude;
    });

    const carIcon = {
        url: '../assets/car2go.png',
        scaledSize: new google.maps.Size(27, 17),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0)
    };

    this.fleetData['car2go'].forEach(car2go => {

      const newMarker = new google.maps.Marker({
          position: {
            lat: car2go.coordinates[1],
            lng: car2go.coordinates[0]
          },
          map: map,
          icon: carIcon,
          name: 'car2go'
        });

      const infowindow = new google.maps.InfoWindow({
        content: car2go.name
      });

      newMarker.addListener('click', function() {
        infowindow.open(map, newMarker);
      });

      this.allMarkers.push(newMarker);
      runningSum.lat += car2go.coordinates[1];
      runningSum.lng += car2go.coordinates[0];
    });

    // Get average location to center the Map
    const totalCount = this.fleetData['car2go'].length + this.fleetData['taxis'].length;
    const averageLoc = {
      lat: runningSum.lat / totalCount,
      lng: runningSum.lng / totalCount
    };
    map.setCenter(averageLoc);
  }
}
