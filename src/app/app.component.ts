import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  apiCalls: Array<string> = ['/car2go/vehicles', '/mytaxi/vehicles']
  fleetData: object = {};
  showTaxis: boolean = true;
  showCars: boolean = true;

  ngOnInit() {
    this.apiCalls.forEach(apiCall=>{
      fetch(apiCall)
      .then(response=>response.json())
      .then(data=>{
        console.log(data)
        if (data.placemarks) this.fleetData['car2go'] = data.placemarks;
        if (data.poiList) this.fleetData['taxis'] = data.poiList;
      })
      .catch(err=>console.log(err))
    })
  }
}
