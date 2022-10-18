import type {
  DataAlerts,
  Datakeys,
  KeyNameListFormat,
  KeyOptionsDateTimeFormat,
} from "../types/typesAlerts";
import {
  CodeEvent,
  defaultOptionsDateTimeFormat,
  formatListDateTime,
} from "@/constants/alerts";
/**
 * Класс HandlerEvent модифицирует данные из объекта предупреждения в соответствии с
 * потребностью компоненты.
 * @class
 */
export class HandlerEvent implements DataAlerts {
  [index: string]:
    | number
    | number[]
    | string
    | boolean
    | undefined
    | (() => number)
    | ((timestamp: number, format: string, locales: string) => string);
  /**
   * eventType - Код типа предупреждения (важность). Будет предопределено
   * несколько типов предупреждений. Определяет цветовую схему и параметры
   * используемых шрифтов. Цветовые схемы будут подключаться в корневой
   * компоненте из отдельного файла.
   */
  eventType!: CodeEvent;
  /**
   * eventTime - Время действия предупреждения. Может быть точным (одно
   * значение) или интервальным (два значения). Значение времени передается в
   * формате timestamp.
   */
  eventTime!: number | number[];
  /**
   * timeFormat -  Формат отображения времени. Возможные варианты:
   * часы:минуты; часы:минуты день:месяц; другие.
   */
  timeFormat!: string;
  /**
   * titleText -  Текст заголовка.
   */
  titleText!: string;
  /**
   * eventText - Текст предупреждения.
   */
  eventText!: string;
  /**
   * iconCode - Опциональный параметр. Код иконки предупреждения. Компонента
   * такой иконки будет создана позднее. Компонента будет представлять собой
   * графическое изображение в формате svg (на которое также будет
   * распространяться цветовая схема заданная типом предупреждения). Поэтому
   * предполагается передача в нее через Property кода, для отображения.
   */
  iconCode?: number;
  /**
   * isDayShow - Опциональный параметр. Отвечает за отображение блока с датой.
   * Если true, то блок отрисовывается.
   */
  isDayShow?: boolean;

  constructor(_event: DataAlerts) {
    for (const prop in _event) {
      const key = prop as Datakeys;
      this[prop] = _event[key];
    }
  }
  /**
   * Метод проверяет тип значения свойства eventTime и возвращает определенный timestamp
   * @returns {number}
   * @example
   * 1665553200000
   */
  //timestamp: number;
  getTimestamp = (): number =>
    typeof this.eventTime === "number" ? this.eventTime : this.eventTime[0];

  /**
   * Возвращает строку с датой и временем в заданном формате.
   * @param timestamp Числовое значение даты.
   * @param format Строковое представление формата.
   * @param locales Языковая метка для определения локали.
   * @returns {string}
   * @example
   * "20:30"
   */
  static setTimeFormat(
    timestamp: number,
    format: string,
    locales: string
  ): string {
    /**
     * Объект options настраивает формат даты и времени и передается
     *  аргументом в конструктор new Intl.DateTimeFormat.
     * @example
     * {
     * weekday: "long",
     * year: "numeric",
     * month: "long",
     * day: "numeric",
     * hour: "2-digit",
     * minute: "2-digit",
     * second: "2-digit",
     * };
     */
    const options = {
      ...defaultOptionsDateTimeFormat,
    };
    /**
     * Формируем объект с заданными свойствами форматирования даты и времени.
     */
    for (const key in formatListDateTime) {
      const value = formatListDateTime[key as KeyNameListFormat];
      if (format.includes(key)) {
        options[value[0] as KeyOptionsDateTimeFormat] = value[1];
      }
    }
    /**
     * Массив объектов, содержащий отформатированную дату по частям.
     * @example
     * [
     * { type: "weekday", value: "вторник" },
     * { type: "literal", value: ", " },
     * { type: "day", value: "11" },
     * { type: "literal", value: " " },
     * { type: "month", value: "октября" },
     * { type: "literal", value: " " },
     * { type: "year", value: "2022" },
     * { type: "literal", value: " г., " },
     * { type: "hour", value: "08" },
     * { type: "literal", value: ":" },
     * { type: "minute", value: "00" },
     * { type: "literal", value: ":" },
     * { type: "second", value: "00" },
     * ];
     */
    const datePartsArr = new Intl.DateTimeFormat(
      locales,
      options
    ).formatToParts(timestamp);

    /**
     * Формируем строку дата-время с заданным форматированием.
     */
    let dateFormated = format;
    for (const key in formatListDateTime) {
      const value = formatListDateTime[key as KeyNameListFormat];
      const item = datePartsArr.find((i) => i.type === value[0]);
      dateFormated = dateFormated.replace(
        key,
        item === undefined ? "" : item.value
      );
    }

    return dateFormated;
  }
}
