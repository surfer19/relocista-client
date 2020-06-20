import * as uuid from 'uuid';

export const mockPropertyList = () => ([
  {
    lat: +49.22415420000001,
    lng: +16.5859078,
  },
  {
    lat: +49.22635420000001,
    lng: 16.5779078,
  }
]);
export const clusterStyles = (): any => [
  {
      textColor: 'white',
      // textColor: 'rgba(255, 255, 255, 0.2)',
      url: './assets/svg/tooltip-home-ext.svg',
      // url: './assets/svg/tooltip-home-ext.svg',
      width: 75,
      height: 75,
      textSize: 12,
      anchor: [19, 18]
  },
];

export const clusterStylesTransparent = () => [
  {
    // ...clusterStyles()[0],
    // textColor: 'white',
    // textColor: 'rgba(255, 255, 255, 0.2)',
    // url: './assets/svg/tooltip-home-ext.svg',
    // url: './assets/svg/tooltip-home-ext.svg',
    width: 74,
    height: 74,
    textSize: 12,
    anchor: [19, 18],
    url: './assets/svg/tooltip-home-ext-transparent.svg',
    textColor: 'rgba(255, 255, 255, 0.2)'
  }
];

// active ? 1 : 0.2,
// export const mapOptions = () => ({
  // styles: [{
  //   height: 53,
  //   url: "assets/map-machine-icons/green.png",
  //   width: 52
  // },
  // {
  //   height: 53,
  //   url: "assets/map-machine-icons/red.png",
  //   width: 52
  // }],
  // calculator: (markers) => {
  //   for (let i = 0; i < markers.length; i++) {
  //     // you have access all the markers from each cluster
  //   }
  //   return { text: markers.length, index: 1 };

  //   // index: 1 -> for green icon
  //   // index: 2 -> for red icon
  // }
// });

export const mockSelectedPlaces = (labelOptions) => ([
// {
//   id: uuid.v4(),
//   formattedAddress: 'Fakulta informačních technologií Vysokého učení technického v Brně, Božetěchova 1/2, 612 66 Brno-Královo Pole, Česko',
//   lat: +49.22685420000001,
//   lng: +16.5969078,
//   name: 'Kláštor Královo Pole',
//   labelOptions: {
//     ...labelOptions,
//     // text: null
//   }
// },
// {
//   id: uuid.v4(),
//   formattedAddress: 'Purkyňova 99, 612 00 Brno-Brno-Královo Pole, Česko',
//   lat: 49.2260795,
//   lng: 16.581219,
//   name: 'Red Hat Czech s.r.o.',
//   labelOptions: {
//     ...labelOptions,
//     // text: '.'
//   }
// }
]);

export const gMapThemeStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121'
      }
    ]
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e'
      }
    ]
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off'
      }
    ]
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd'
      }
    ]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c'
      }
    ]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a'
      }
    ]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737'
      }
    ]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c'
      }
    ]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e'
      }
    ]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161'
      }
    ]
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000'
      }
    ]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d'
      }
    ]
  }
];
