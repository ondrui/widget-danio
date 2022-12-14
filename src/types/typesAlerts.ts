import { FilterStatus, CodeEvent } from "@/constants/alerts";
/**
 * Интерфейс для объекта со свойствами, которые определяют содержание и внешний вид предупреждения.
 */
export interface DataAlerts {
  /**
   * eventType - Код типа предупреждения (важность). Будет предопределено
   * несколько типов предупреждений. Определяет цветовую схему и параметры
   * используемых шрифтов. Цветовые схемы будут подключаться в корневой
   * компоненте из отдельного файла.
   */
  eventType: CodeEvent;
  /**
   * eventTime - Время действия предупреждения. Может быть точным (одно
   * значение) или интервальным (два значения). Значение времени передается в
   * формате timestamp.
   */
  eventTime: number | number[];
  /**
   * timeFormat -  Формат отображения времени и даты. Возможные варианты:
   * часы:минуты; часы:минуты день:месяц; другие.
   */
  timeFormat: string;
  /**
   * titleText -  Текст заголовка.
   */
  titleText: string;
  /**
   * eventText - Текст предупреждения.
   */
  eventText: string;
  /**
   * iconCode - Опциональный параметр. Код иконки предупреждения. Компонента
   * такой иконки будет создана позднее. Компонента будет представлять собой
   * графическое изображение в формате svg (на которое также будет
   * распространяться цветовая схема заданная типом предупреждения). Поэтому
   * предполагается передача в нее через Property кода, для отображения.
   */
  iconCode?: string;
  /**
   * isDayShow - Опциональный параметр. Отвечает за отображение блока с датой.
   * Если true, то блок отрисовывается.
   */
  isDayShow?: boolean;
}

/**
 * Вспомогательный тип.
 */
export type Datakeys = keyof DataAlerts;

/**
 * Интерфейс фильтра.
 */
export interface Filter {
  /**
   * name - Наименование фильтра.
   */
  name: string;
  /**
   * amount - Общее количество предупреждений с одинаковым кодом.
   */
  amount: number;
  /**
   * status - Отвечает за состояние кнопки фильтра. Возможно 3 состояния:
   * @property {number} Applied - кнопка заблокирована и неактивна
   * @property {number} Removed - фильтр применен
   * @property {number} Disabled - фильтр не применен
   */
  status: FilterStatus;
}

/**
 * Интерфейс для объекта, который управляет отображением блока с фильтрами
 * и их состояниями.
 */
export interface Filters {
  [index: number]: Filter;
}

/**
 * Интерфейс для объекта, который определяет строковые константы с учетом локали.
 */
export interface ExpressionsList {
  /**
   * Массив содержит слова-указатели времен.
   */
  timeMarker: string[];
  /**
   * Сообщения, которые отображаются при отсутствии предупреждений.
   */
  defaultEventMessage: string[];
  /**
   * Сообщение появляется если остается всего один фильтр.
   */
  messageForOneFilter: string;
  /**
   * Текст кнопки ShowAll.
   */
  valueButtonShowAll: string;
  /**
   * Начальные настройки фильтров.
   */
  defaultFilters: Filters;
}

/**
 * Объект содержит строковые константы с учетом локали.
 */
export interface ExpressionsLocales {
  [key: string]: ExpressionsList;
  ru: ExpressionsList;
}

/**
 * Вспомогательный тип.
 */
export type KeysExpressionsLocales =
  ExpressionsLocales[keyof ExpressionsLocales];

/**
 * Все разрешенные ключи объекта формата отображения времени и даты.
 * @param d День месяца, от 1 до 31. 2 цифры с ведущими нулями.
 * @param D Текстовое представление дня недели, 2 символа.
 * @param l Полное наименование дня недели.
 * @param m Порядковый номер месяца с ведущим нулём.
 * @param F Полное наименование месяца. Строка.
 * @param M Сокращённое наименование месяца, 3 символа.
 * @param Y Полное числовое представление года, 4 цифры.
 * @param H Часы в 24-часовом формате с ведущим нулём.
 * @param i Минуты с ведущим нулём.
 * @param S 	Секунды с ведущим нулём.
 */
export type KeyNameListFormat =
  | "d"
  | "D"
  | "l"
  | "m"
  | "F"
  | "M"
  | "Y"
  | "H"
  | "i"
  | "S";

/**
 * Все разрешенные ключи для свойств форматирования даты и времени.
 *  @param weekday День недели. Возможные значения: short, long.
 *  @param year Год. 4 цифры. Возможные значения: numeric.
 *  @param month Месяц. Возможные значения: 2-digit, short, long.
 *  @param day День месяца. Возможные значения: 2-digit.
 *  @param hour Час. Возможные значения: 2-digit.
 *  @param minute Минуты. Возможные значения: 2-digit.
 *  @param second Секунды. Возможные значения: 2-digit.
 */
export type KeyOptionsDateTimeFormat = keyof Intl.DateTimeFormatOptions;
