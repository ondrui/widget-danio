import { ExpressionsLocales } from "@/types/typesClimate";

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
 * Объект с параметрами, которые применяются при изменении
 * состояния radio button в компоненте Navbar.vue.
 * @property usually - значение  ["avgmin", "avgmax"]
 * @property records - значение ["extmin", "extmax"]
 */
export const radioBtnValue = {
  usually: ["avgmin", "avgmax"],
  records: ["extmin", "extmax"],
} as const;

/**
 * Строковые константы с учетом локали.
 * @property ru - Объект содержит строковые константы с учетом локали.
 * @property ru.prepositions - Массив содержит предлоги, которые
 * используются в подписи начальной и конечной точки прогресс бара.
 * @property ru.changeDimensionLocale - размерности, которые требуют
 * модификацию при отображении.
 * @property ru.radioBtnCaption - Массив с названиями radio button
 * в компоненте Navbar.vue.
 * @property ru.selectCaptions - Подписи селекта в компоненте Navbar.vue.
 * @property ru.noData - Фраза при отсутствии данных.
 * @property ru.navBarLink - Название ссылки для отображения подробной
 * информации.
 */
export const expressions: ExpressionsLocales = {
  ru: {
    /**
     * Массив содержит предлоги, которые используются в
     * подписи начальной и конечной точки прогресс бара.
     */
    prepositions: ["от", "до"],
    /**
     * размерности, которые требуют
     * модификацию при отображении.
     */
    changeDimensionLocale: ["см"],
    /**
     * Массив с названиями radio button
     * в компоненте Navbar.vue.
     */
    radioBtnCaption: ["обычно", "рекорды"],
    /**
     * Подписи селекта в компоненте Navbar.vue.
     */
    selectCaptions: ["в среднем за", "лет"],
    /**
     * Выражение отображается при отсутствии данных.
     */
    noData: "н/д",
    /**
     * Название ссылки для отображения подробной
     * информации.
     */
    navBarLink: "подробнее",
  },
  en: {
    /**
     * Массив содержит предлоги, которые используются в
     * подписи начальной и конечной точки прогресс бара.
     */
    prepositions: ["from", "to"],
    /**
     * размерности, которые требуют
     * модификацию при отображении.
     */
    changeDimensionLocale: ["sm"],
    /**
     * Массив с названиями radio button
     * в компоненте Navbar.vue.
     */
    radioBtnCaption: ["usually", "records"],
    /**
     * Подписи селекта в компоненте Navbar.vue.
     */
    selectCaptions: ["average", "years"],
    /**
     * Выражение отображается при отсутствии данных.
     */
    noData: "n/a",
    /**
     * Название ссылки для отображения подробной
     * информации.
     */
    navBarLink: "detail",
  },
};
