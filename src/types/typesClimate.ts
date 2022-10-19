interface ParamsValue {
  avgmin: string;
  avgmax: string;
  extmin: string;
  extmax: string;
  avg: string;
}

interface ClimateValue {
  [index: string]: string | ParamsValue;
  dim: string;
}

interface Locales {
  ru?: string;
  en?: string;
}

export interface DataClimate {
  title: Locales;
  def?: Locales;
  value: ClimateValue[];
}

export interface GetterClimateData {
  values: DataClimate[];
  date: string;
}
