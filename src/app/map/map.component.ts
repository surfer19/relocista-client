import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
declare var google: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
  // current selected point
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  formattedAddress: string;
  foundName: string;
  value = '';
  // list of selected points
  selectedPlaces: Array<any>;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  // markerDragEnd($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  //   // console.log('foundAddress', foundAddress);
  // }

  private getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log('get this.address', this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  public onAddNewPlace(e) {
    this.selectedPlaces.push({
      formattedAddress: this.formattedAddress,
      name: this.foundName,
      latitude: this.latitude,
      longitude: this.longitude
    });
  }

  ngOnInit() {
    this.selectedPlaces = [];
    this.setCurrentLocation();
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      // this.geoCoder = new google.maps.Geocoder();

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log('place', place);
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.formattedAddress = place.formatted_address;
          this.foundName = place.name;
          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 16;
          this.onAddNewPlace(null)
        });
      });
    });
  }
}
