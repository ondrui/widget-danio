import { Module } from "vuex";
import { RootState } from "./index";
import {
  StoreClimateData,
  WidgetClimateData,
  ClimateValue,
  ParamsValue,
  SelectRadioData,
  Locales,
  ExpressionLocales,
} from "@/types/typesClimate";
import { HandlerEvent } from "@/handlers/HandlerEvent";
import { radioBtnValue, expression } from "@/constants/climate";

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
};

export const climateModule: Module<State, RootState> = {
  state: (): State => ({
    values: [],
    timestamp: 0,
    dateFormat: "",
    locales: "ru",
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
     * Возвращает языковую метку для определения локали.
     * @param state Текущее состояние store.
     * @example
     * "ru"
     */
    getLocales: (state: State): string => state.locales,
    /**
     * Возвращает дату в виде строки в заданном формате.
     * @param state Текущее состояние store.
     * @example "30 сентября"
     */
    getDate: (state: State): string => {
      const dateStr = HandlerEvent.setTimeFormat(
        state.timestamp,
        state.dateFormat,
        state.locales
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
     * @param radio - Содержит значение атрибута value радиокнопки
     * в компоненте Navbar.vue.
     * @param select - Интервал времени, который задается выбором опции
     * элемента select в компоненте Navbar.vue.
     */
    getClimateData:
      (state: State) =>
      ({
        radio,
        select,
      }: {
        radio: string;
        select: string;
      }): Array<WidgetClimateData | undefined> => {
        /**
         * Функция проверяет значение параметра и если оно равно undefined
         * возвращает строку определенную в expression.ru.noData или значение.
         * @param val - Значение параметра.
         */
        const numRender = (val: string | undefined): string =>
          val ?? expression[state.locales as keyof ExpressionLocales].noData;
        /**
         * Функция проверяет требуется ли модификация при отображении размерности
         * параметра. Например добавляет пробел перед "см". Возвращает исходную или
         * модифицированную строку с размерностью.
         * @param dim - Строка с размерностью.
         * @example " см"
         */
        const dimRender = (dim: string): string =>
          dim ===
          expression[state.locales as keyof ExpressionLocales]
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
                  const min =
                    radioBtnValue[radio as keyof typeof radioBtnValue][0];
                  const max =
                    radioBtnValue[radio as keyof typeof radioBtnValue][1];
                  return {
                    min: numRender(dataSelect[min as keyof ParamsValue]),
                    max: numRender(dataSelect[max as keyof ParamsValue]),
                    avg: numRender(dataSelect.avg),
                  };
                };

                return {
                  title,
                  def,
                  dim: dimRender(dim),
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
  },
  /**
   * Задаем собственное пространство имён для этого модуля.
   */
  namespaced: true,
};
