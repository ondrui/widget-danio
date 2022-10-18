export interface Params {
  avgmin: string;
  avgmax: string;
  extmin: string;
  extmax: string;
  avg: string;
}

export interface ClimateValue {
  [index: string]: string | Params | undefined;
  dim: string;
  def?: string;
}

export interface DataClimate {
  title: {
    ru: string;
    en: string;
  };
  value: ClimateValue[];
}
