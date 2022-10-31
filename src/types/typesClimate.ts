interface Locales {
  ru?: string;
  en?: string;
}

interface ParamsValue {
  time: string;
  avgmin?: string;
  avgmax?: string;
  extmin?: string;
  extmax?: string;
  avg?: string;
}

export interface ClimateValue {
  [index: string]: ParamsValue[] | string;
  dim: string;
  data: ParamsValue[];
}

export interface StoreClimateData {
  title: Locales;
  def?: Locales;
  value: ClimateValue[];
}

export interface WidgetClimateData {
  title: Locales;
  def?: Locales | undefined;
  dim: string;
  data: {
    min: string | undefined;
    max: string | undefined;
    avg: string | undefined;
  };
}

export interface PathSVG {
  class: string;
  def: string;
}

export interface EndPointsText {
  text: string;
  num: string | undefined;
  x: number;
  y: number;
}

export interface SubtitleToProgressName {
  isShow: boolean;
  text: string | undefined;
}
