interface Locales {
  ru?: string;
  en?: string;
}

export interface ParamsValue {
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

export interface SelectRadioData {
  min: string | undefined;
  max: string | undefined;
  avg: string | undefined;
}

export interface WidgetClimateData {
  title: Locales;
  def?: Locales | undefined;
  dim: string;
  data: SelectRadioData;
}

export interface PathSVG {
  class: string;
  def: string;
}

export interface EndPointsText {
  text: string;
  num: string | undefined;
  x: number | undefined;
  y: number;
}

export interface SubtitleToProgressName {
  isShow: boolean;
  text: string | undefined;
}

export interface ExpressionLocales {
  ru: {
    prepositions: string[];
    changeDimensionLocale: string[];
    radioBtnCaption: string[];
    selectCaptions: string[];
    noData: string;
  };
}
