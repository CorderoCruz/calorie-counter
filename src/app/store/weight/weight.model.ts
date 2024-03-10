export type Weight = {
  lbs: number;
  date: string;
};

export type WeightState = {
  weights: Weight[];
  loading: boolean;
  error: boolean | { message: string };
};
