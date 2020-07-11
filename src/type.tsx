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
export interface Detail {
  geometry: {
    location: Geometry;
  };
  photos: Photo[];
}
export type PlaceDetail = { result: Detail };
export type Autocomplete = { predictions: Prediction[] };

export interface DataFetching<T> {
  data: T;
  loading: boolean;
  error: "";
  success: boolean;
}

export interface StateType {
  form: Form;
  autocomplete: DataFetching<Prediction[]>;
  placeDetail: DataFetching<Detail>;
}
