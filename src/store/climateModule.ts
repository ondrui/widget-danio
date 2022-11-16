import { Module } from "vuex";
import { RootState } from "./index";
import {
  StoreClimateData,
  WidgetClimateData,
  ClimateValue,
  SelectRadioData,
  Locales,
  ExpressionsLocales,
  KeysExpressionsLocales,
} from "@/types/typesClimate";
import { HandlerEvent } from "@/handlers/HandlerEvent";
import { radioBtnValue, expressions } from "@/constants/climate";
import { getField } from "@/constants/functions";

type State = {
  /**
   * Свойство содержит объект с данными с сервера для отображения виджета.
   */
  values: StoreClimateData[];
  /**
   * Дата для которой отображаются данные. Приходит с сервера в виде timestamp.
   */
  timestamp: number;
  /**
   * Формат отображения даты. Приходит с сервера в строковом формате.
   */
  dateFormat: string;
  /**
   * Языковая метка для определения локали.
   */
  locales: string;
  /**
   * Строковые константы с учетом локали.
   */
  expressions: ExpressionsLocales;
};

export const climateModule: Module<State, RootState> = {
  state: (): State => ({
    values: [],
    timestamp: 0,
    dateFormat: "",
    locales: "ru",
    expressions: expressions,
  }),
  mutations: {
    /**
     * Заполняет store данными, полученными с бэкэнда.
     * @param state Текущее состояние store.
     * @param climate Массив с данными для отображения виджетом.
     * @param format Формат отображения даты.
     */
    setDataClimate(
      state: State,
      { climate, format }: { climate: StoreClimateData[]; format: string }
    ): void {
      if (climate == null) {
        climate = [];
      }
      state.values = climate;
      state.dateFormat = format;
    },
    /**
     * Получение timestamp даты.
     * @param state Текущее состояние store.
     * @param timestamp Дата для которой отображаются данные.
     */
    setTimestampClimate(state: State, timestamp: number): void {
      state.timestamp = timestamp;
    },
    /**
     * Устанавливает языковую метку для определения локали.
     * @param state Текущее состояние store.
     * @param locales Языковая метка.
     */
    setLocales(state: State, locales: string): void {
      state.locales = locales;
    },
  },
  getters: {
    /**
     * Возвращает языковую метку для определения локали,
     * предварительно проверяет есть ли такая локаль в
     * строковых константах.
     * @param state Текущее состояние store.
     * @example
     * "ru"
     */
    getLocales: (state: State): string =>
      state.locales in state.expressions ? state.locales : "ru",
    /**
     * Возвращает дату в виде строки в заданном формате.
     * @param state Текущее состояние store.
     * @param getters Другие геттеры их данного модуля.
     * @example "30 сентября"
     */
    getDate: (state: State, getters): string => {
      const dateStr = HandlerEvent.setTimeFormat(
        state.timestamp,
        state.dateFormat,
        getters.getLocales
      );
      return dateStr;
    },
    /**
     * Возвращает массив временных интервалов для отображения в меню опций
     * элемента select.
     * @param state Текущее состояние store.
     * @example ["10","20","30"]
     */
    getNavbarSelectOptions(state: State): string[] {
      const arr: string[] = [
        ...state.values.reduce<Set<string>>(
          (acc, { value }) => (
            value[0].data.forEach(
              ({ time }: { time: string }) => acc.add(time),
              acc
            ),
            acc
          ),
          new Set()
        ),
      ].sort();
      return arr;
    },
    /**
     * Возвращает массив объектов с данными передаваемые из
     * store в компоненты для отображения.
     * @param state Текущее состояние store.
     * @param getters Другие геттеры их данного модуля.
     * @param radio - Содержит значение атрибута value радиокнопки
     * в компоненте Navbar.vue.
     * @param select - Интервал времени, который задается выбором опции
     * элемента select в компоненте Navbar.vue.
     */
    getClimateData:
      (state: State, getters) =>
      ({
        radio,
        select,
      }: {
        radio: keyof typeof radioBtnValue;
        select: string;
      }): Array<WidgetClimateData | undefined> => {
        /**
         * Функция проверяет значение параметра и если оно равно undefined
         * возвращает строку определенную в expression.ru.noData или значение.
         * @param val - Значение параметра.
         */
        const numRender = (val: string | undefined): string =>
          val ?? getField(state.expressions, getters.getLocales).noData;
        /**
         * Функция проверяет требуется ли модификация при отображении размерности
         * параметра. Например добавляет пробел перед "см". Возвращает исходную или
         * модифицированную строку с размерностью.
         * @param dim - Строка с размерностью.
         * @example " см"
         */
        const dimRender = (dim: string | undefined): string | undefined =>
          dim ===
          getField(state.expressions, getters.getLocales)
            .changeDimensionLocale[0]
            ? ` ${dim}`
            : dim;

        return (
          state.values
            .map(
              ({
                value,
                title,
                def,
              }: {
                value: ClimateValue[];
                title: Locales;
                def?: Locales;
              }) => {
                /**
                 * Функция фильтрации массива с данными в зависимости от требуемой
                 * размерности будет реализована позже.
                 * Пока она всегда возвращает первый элемент массива.
                 * @param prop - Исходный массив с данными.
                 * @param [dim] - Размерность.
                 */
                const findDimValue: (
                  prop: ClimateValue[],
                  dim?: string
                ) => ClimateValue = (prop) => prop[0];
                const { dim, data } = findDimValue(value);
                /**
                 * Функция возвращает объект с данными соответствующий выбранному
                 * интервалу который задается выбором опции
                 * элемента select в компоненте Navbar.vue.
                 */
                const dataSelect = data.find(
                  ({ time }: { time: string }) => time === select
                );

                /**
                 * Если требуемых данных нет в массив запишется undefined.
                 */
                if (dataSelect === undefined) return undefined;

                /**
                 * Функция возвращает данные соответствующие значению атрибута value радиокнопки в компоненте Navbar.vue.
                 */
                const dataSelectRadio = (): SelectRadioData => {
                  const min = getField(radioBtnValue, radio)[0];
                  const max = getField(radioBtnValue, radio)[1];
                  return {
                    min: numRender(getField(dataSelect, min)),
                    max: numRender(getField(dataSelect, max)),
                    avg: numRender(dataSelect.avg),
                  };
                };
                return {
                  title: getField(title, getters.getLocales),
                  def: def ? getField(def, getters.getLocales) : undefined,
                  dim: dimRender(getField(dim, getters.getLocales)),
                  data: dataSelectRadio(),
                };
              }
            )
            /**
             * Убираем из полученного массива с данными для виджета элементы со значением
             *  undefined.
             */
            .filter((i: WidgetClimateData | undefined) => i !== undefined)
        );
      },
    /**
     * Возвращает строковые константы с учетом локали.
     * @param state Текущее состояние store.
     * @param getters Другие геттеры их данного модуля.
     */
    getExpressions: (
      state: State,
      getters
    ): KeysExpressionsLocales | undefined =>
      getField(state.expressions, getters.getLocales),
  },
  /**
   * Задаем собственное пространство имён для этого модуля.
   */
  namespaced: true,
};
