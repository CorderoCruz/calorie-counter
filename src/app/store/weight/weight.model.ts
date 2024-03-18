export type Weight = {
  lbs: number;
  date: string;
};

export type WeightState = {
  weights: Weight[];
  getWeightLoading: boolean;
  addWeightLoading: boolean;
  editWeightLoading: boolean;
  deleteWeightLoading: boolean;
  getWeightError: boolean | { message: string };
  addWeightError: boolean | { message: string };
  editWeightError: boolean | { message: string };
  deleteWeightError: boolean | { message: string };
};

export type WeightResponse = {
  status: number;
  data: Weight;
  message: string;
};
