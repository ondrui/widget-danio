import { ExpressionLocales } from "@/types/typesClimate";

/**
 * Названия классов элемента path, который отвечает за отображение
 * графика.
 * "svg-bg" - Показывает отрезок между минимальным и максимальным значением.
 * "svg-meter" - Показывает отрезок между минимальным и средним
 * значением показателя.
 */
export const svgClassForPath = ["svg-bg", "svg-meter"];

/**
 * Толщина прогресс бара.
 */
export const thicknessProgress = 8;

/**
 * Длина стороны треугольной метки прогресс бара.
 */
export const triagleSideLength = 9;

/**
 *
 */
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
