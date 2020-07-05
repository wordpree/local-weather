type Prediction = {
  description: string;
  place_id: string;
};

export interface Autocomplete {
  predictions: Prediction[];
}

export interface GetUrl {
  (location: string): string;
}
