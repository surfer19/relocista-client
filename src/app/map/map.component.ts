import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Observable, merge } from 'rxjs';
import { mergeMap, shareReplay} from 'rxjs/operators';
import { gMapThemeStyles, mockSelectedPlaces, clusterStyles, clusterStylesTransparent } from './map.constants';
import * as uuid from 'uuid';

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
    private http: HttpClient,
  ) {
    this.selectedPlaces = [];
    this.propertyList = [];
    this.defaultTravelType = 'TRANSIT';
    this.clusterStyles = clusterStyles();
  }
  observableList: any; // Observable<any>;
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
  propertyList: Array<any>;
  selectedRoutes: Array<any>;
  selectedTravelType: string;
  defaultTravelType: string;
  selectedProperty: string;
  themeStyle = gMapThemeStyles;
  infoWindow: any;
  clusterStyles: any;
  public renderOptions1 = {
    suppressMarkers: true,
    preserveViewport: false,
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

  setMapStateDefault(event) {
    this.clusterStyles = clusterStyles();
    console.log('setMapStateDefault');
  }

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
      id: uuid.v4(),
      formattedAddress: this.formattedAddress,
      name: this.foundName,
      lat: this.latitude,
      lng: this.longitude
    });
    console.log('selectedPlaces', this.selectedPlaces);
  }

  public onRemovePlace(id) {
    console.log('filter', this.selectedPlaces.filter(place => place.id !== id));
    this.selectedPlaces = this.selectedPlaces.filter(place => place.id !== id);
  }

  async calcTimeTravel(marker) {
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
        travelMode: this.selectedTravelType || this.defaultTravelType
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

  onZoomChange(event) {
    console.log('event', event);
  }

  onMarkerClick(marker) {
    this.selectedProperty = marker;
    // console.log('marker', marker);
    this.setSelectedRoutes(marker);
    this.calcTimeTravel(marker);

    console.log('clusterStylesTransparent');
    // this.clusterStyles = clusterStylesTransparent();
  }

  // manageActiveProperties(activeMarker) {

  // }

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
    this.selectedTravelType = value;
    this.calcTimeTravel(this.selectedProperty);
  }

  closeInfoPopup(popup) {
    console.log('popup', popup);
  }

  convertToGoogleLatLong(notStructuredItems) {
    console.log('notStructuredItems', notStructuredItems);
    // console.log('LENGTH=', notStructuredItems.filter(item => item.city === 'Brno'));
    const googleItems = notStructuredItems.filter(item => item.city === 'Brno').slice(0, 100).map(item => (
      {
        ...item,
        lat: item.gpsCoord.lat,
        lng: item.gpsCoord.lon
      }
    ));
    return googleItems;
  }
  onMouseClick(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  // onMouseOut(infoWindow, $event: MouseEvent) {
  //   infoWindow.close();
  // }

  ngOnInit() {
    this.zoom = 20;
    const storedItems: any = localStorage.getItem('properties');
    console.log('storedItems', storedItems);
    if (!storedItems) {
    // get dataset
    this.observableList = this.http
      .get('https://api.apify.com/v2/datasets?token=Wwzi7SxDdoF5wbv8wnh7Lwbui')
      .pipe(
        mergeMap((resDataset: any) => {
          return this.http.get(`
            https://api.apify.com/v2/datasets/${resDataset.data.items[0].id}/items?token=Wwzi7SxDdoF5wbv8wnh7Lwbui&unwind=data
          `);
          // return resDataset;
        }),
        shareReplay({ bufferSize: 1, refCount: true }),
      )
      .subscribe(response => {
        console.log('watafaq', response);
        this.propertyList = this.convertToGoogleLatLong(response); // mockPropertyList();
        localStorage.setItem('properties', JSON.stringify(this.convertToGoogleLatLong(response)));
      });
    }
    else {
      this.propertyList = JSON.parse(storedItems);
    }
    console.log('propertyList', this.propertyList);
    this.selectedPlaces = mockSelectedPlaces(this.labelOptions);
    // this.setCurrentLocation();
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
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
