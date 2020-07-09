type Geometry = {
  lat: string;
  lng: string;
};
type Photo = {
  photo_reference: string;
};
export type Prediction = {
  description: string;
  place_id: string;
};
type Form = {
  input: string;
};
export interface PlaceDetail {
  geometry: {
    location: Geometry;
  };
  photos: Photo[];
}
export type Autocomplete = Prediction[];

export interface DataFetching<T> {
  data: T;
  loading: boolean;
  error: "";
  success: boolean;
}

export interface StateType {
  form: Form;
  autocomplete: DataFetching<Autocomplete>;
  placeDetail: DataFetching<PlaceDetail>;
}
