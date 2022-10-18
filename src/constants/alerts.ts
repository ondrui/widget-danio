import {
  KeyNameListFormat,
  ExpressionLocales,
  IconItem,
} from "@/types/typesAlerts";
/**
 * Enum связывает код типа
 * предупреждения eventType из объекта event
 * и класс CSS устанавливающий цветовую схему предупреждения.
 * @property {number} warning
 * @property {number} danger
 * @property {number} primary
 * @readonly
 * @enum {number}
 */
export enum CodeEvent {
  warning = 1,
  danger = 2,
  primary = 3,
}

/**
 * Enum содержит статусы фильтра.
 * Отвечает за состояние кнопки фильтра. Возможно 3 состояния:
 * @property {number} Applied - кнопка заблокирована и неактивна
 * @property {number} Removed - фильтр применен
 * @property {number} Disabled - фильтр не применен
 * @readonly
 * @enum {number}
 */
export enum FilterStatus {
  Applied,
  Removed,
  Disabled,
}

/**
 * Переменная хранит количество миллисекунд в сутках.
 * @constant
 */
export const ALLDAYMS = 86400000;

/**
 * Переменная хранит языковую метку для определения локали.
 * @constant
 */
export const LOCALES = "ru";

/**
 * Строковые константы с учетом локали.
 * @property ru - Объект содержит строковые константы с учетом локали.
 * @property ru.timeMarker - Массив содержит слова-указатели времен.
 * @property ru.defaultEventMessage - Сообщения, которые отображаются при
 * отсутствии предупреждений.
 * @property ru.defaultFilters - Начальные настройки фильтров.
 */
export const expression: ExpressionLocales = {
  ru: {
    /**
     * Массив содержит слова-указатели времен.
     */
    timeMarker: ["Вчера", "Сегодня", "Завтра", "Послезавтра", "с", "до"],
    /**
     * Сообщения, которые отображаются при отсутствии предупреждений.
     */
    defaultEventMessage: [
      "В ближайшее время никаких значимых событий в погоде не ожидается :)",
      "Мы сразу сообщим, как появится что-то интересное.",
    ],
    /**
     * Сообщение появляется если остается всего один фильтр.
     */
    messageForOneFilter: "Нельзя отключить все фильтры!",
    /**
     * Текст кнопки ShowAll.
     */
    valueButtonShowAll: "Показать все",
    /**
     * Начальные настройки фильтров.
     */
    defaultFilters: {
      3: { name: "Общие", amount: 0, status: 2 },
      1: { name: "Внимание", amount: 0, status: 2 },
      2: { name: "Опасно", amount: 0, status: 2 },
      5: { name: "Очень опасно", amount: 0, status: 2 },
      6: { name: "Неблагоприятно", amount: 0, status: 2 },
    },
  },
};

/**
 * Возможные значения формата отображения времени и даты.
 * Ключи - символы описывающие возможный формат даты и времени.
 * Значения - массив с параметрами для объекта options, который
 * настраивает формат даты и времени и передается аргументом
 * в конструктор new Intl.DateTimeFormat
 * @property d - День месяца, от 1 до 31. 2 цифры с ведущими нулями.
 * @property D - Текстовое представление дня недели, 2 символа.
 * @property l - Полное наименование дня недели.
 * @property m - Порядковый номер месяца с ведущим нулём.
 * @property F - Полное наименование месяца. Строка.
 * @property M - Сокращённое наименование месяца, 3 символа.
 * @property Y - Полное числовое представление года, 4 цифры.
 * @property H - Часы в 24-часовом формате с ведущим нулём.
 * @property i - Минуты с ведущим нулём.
 * @property S - Секунды с ведущим нулём.
 */
export const formatListDateTime: Record<KeyNameListFormat, string[]> = {
  d: ["day", "2-digit"],
  D: ["weekday", "short"],
  l: ["weekday", "long"],
  m: ["month", "2-digit"],
  F: ["month", "long"],
  M: ["month", "short"],
  Y: ["year", "numeric"],
  H: ["hour", "2-digit"],
  i: ["minute", "2-digit"],
  S: ["second", "2-digit"],
};

/**
 * Объект с дефолтными значениями свойств форматирования даты и времени.
 */
export const defaultOptionsDateTimeFormat:
  | Intl.DateTimeFormatOptions
  | { [index: string]: string } = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

/**
 * Параметры для отображения иконки фильтра.
 */
export const filterIcon = {
  open: [
    "filter-icon-open",
    "M3.5 4.5L3.5 8H4.5L4.5 4.5H8L8 3.5L4.5 3.5L4.5 0L3.5 0L3.5 3.5L0 3.5L0 4.5L3.5 4.5Z",
  ],
  close: [
    "filter-icon-close",
    "M4.07115 4.7784L7.25309 7.96033L7.9602 7.25323L4.77826 4.07129L7.9602 0.88935L7.25309 0.182244L4.07115 3.36418L0.889129 0.18216L0.182022 0.889267L3.36404 4.07129L0.182022 7.25331L0.889129 7.96042L4.07115 4.7784Z",
  ],
};

/**
 * Объект со свойствами, которые связывают код иконки
 * предупреждения iconCode из объекта event и названием файла иконки.
 */
export const iconItem: IconItem = {
  2: "wind",
  1: "uv-index",
};
