import { ExpressionLocales } from "@/types/typesClimate";

export const svgClassForPath = ["svg-bg", "svg-meter"];

export const thicknessProgress = 8;

export const triagleSideLength = 9;

export const radioBtnValue = {
  usually: ["avgmin", "avgmax"],
  records: ["extmin", "extmax"],
};

export const expression: ExpressionLocales = {
  ru: {
    prepositions: ["от", "до"],
    changeDimensionLocale: ["см"],
    radioBtnCaption: ["обычно", "рекорды"],
    selectCaptions: ["В среднем за", "лет"],
    noData: "н/д",
  },
};
