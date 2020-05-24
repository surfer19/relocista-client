import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { gMapThemeStyles, mockSelectedPlaces, mockPropertyList } from './map.constants';

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
  options;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
    this.selectedPlaces = [];
    this.propertyList = [];
  }
  // current selected point
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  formattedAddress: string;
  foundName: string;
  value = '';
  // list of selected points
  selectedPlaces;
  propertyList: Array<any>;
  selectedRoutes: Array<any>;
  themeStyle = gMapThemeStyles;
  public renderOptions1 = {
    suppressMarkers: true,
    preserveViewport: true,
  };
  public renderOptions2 = {
    suppressMarkers: true,
    preserveViewport: true,
    polylineOptions: {
      strokeColor: '#0f0',
    }
  };
  public done = false;
  private geoCoder;

  labelOrigin = {
    x: 12,
    y: 27
  };
  @ViewChild('search')
  public searchElementRef: ElementRef;

  labelOptions = {
    color: 'white',
    fontFamily: '',
    fontSize: '14px',
    fontWeight: 'bold',
    position: 'absolute',
    left: '-26px',
    bottom: '-20px',
    background: '#ff4080',
    padding: '1px 5px',
    borderRadius: '5px',
    // text: 'text',
  };

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

  public onAddNewPlace(e) {
    this.selectedPlaces.push({
      formattedAddress: this.formattedAddress,
      name: this.foundName,
      lat: this.latitude,
      lng: this.longitude
    });
    console.log('selectedPlaces', this.selectedPlaces);
  }
  async calcTimeTravel(marker) {
    console.log('predtym', this.selectedPlaces);
    const updatedPlaces = this.selectedPlaces.map(async selectedPlace => {
      const request = {
        origin: {
          lat: marker.lat,
          lng: marker.lng
        },
        destination: {
          lat: selectedPlace.lat,
          lng: selectedPlace.lng
        },
        travelMode: 'TRANSIT'
      };
      const response = await this.mapRoute(request);
      return {
          ...selectedPlace,
          labelOptions: {
            ...this.labelOptions,
            text: response.routes[0].legs[0].duration.text
          }
        };
    });
    console.log('updatedPlaces', await Promise.all(updatedPlaces));
    this.selectedPlaces = await Promise.all(updatedPlaces);
  }

  mapRoute(request): Promise<any> {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(request, (dr, status) => {
        if (status === 'OK') {
          resolve(dr);
        } else {
          reject(status);
        }
      });
    });
  }

  onMarkerClick(marker) {
    console.log('marker', marker);
    this.setSelectedRoutes(marker);
    this.calcTimeTravel(marker);
  }

  setSelectedRoutes(property) {
    const routes = this.selectedPlaces.map(selectedPlace => ({
        origin: {
          lat: property.lat,
          lng: property.lng
        },
        destination: {
          lat: selectedPlace.lat,
          lng: selectedPlace.lng
        }
    }));
    console.log('routes', routes);
    this.selectedRoutes = routes;
  }

  onTravelTypeChange(value) {
    console.log('value', value);
  }

  ngOnInit() {
    this.options = {
      style: 'HORIZONTAL_BAR', // google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: 'TOP_CENTER', // google.maps.ControlPosition.TOP_CENTER
    };
    console.log('styles', gMapThemeStyles);
    // setTimeout(() => { this.done = true; }, 1500);
    this.selectedPlaces = mockSelectedPlaces(this.labelOptions);
    this.propertyList = mockPropertyList();
    // this.setCurrentLocation();
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
          this.onAddNewPlace(null);
        });
      });
    });
  }
}
