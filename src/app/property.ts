export interface Property {
  imageUrls: Array<string>;
  _id: string;
  createdAt: string;
  gpsCoord: GpsCoord;
  city: string;
  offerType: string;
  livingArea: string;
  type: string;
  arrangement: string;
  price: string;
  priceCurrency: string;
  priceType: string;
  url: string;
  __v: number;
}

interface GpsCoord {
  lat: number;
  lon: number;
}
