export interface ILatLon {
  lat?: number | undefined;
  lon?: number | undefined;
  q?: string;
}

export interface IWeatherSearchParams extends ILatLon {
  q?: string;
}
