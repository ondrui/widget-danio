interface Locales {
  ru?: string;
  en?: string;
}

interface ParamsValue {
  time: string;
  avgmin: string;
  avgmax: string;
  extmin: string;
  extmax: string;
  avg: string;
}

interface ClimateValue {
  [index: string]: ParamsValue[] | string;
  dim: string;
  data: ParamsValue[];
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

export interface PathSVG {
  class: string;
  def: string;
}

export interface EndPointsText {
  text: string;
  num: string;
  x: number;
  y: number;
}

export interface SubtitleToProgressName {
  isShow: boolean;
  text: string | undefined;
}
