/**
 * Enum который связывают код типа
 * предупреждения eventType из объекта event
 * и класс CSS устанавливающий цветовую схему предупреждения.
 * @enum
 */
export enum CodeEvent {
  warning = 1,
  danger = 2,
  primary = 3,
}

/**
 * Enum содержит статусы фильтра.
 * @enum
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
 * Массив содержит слова-указатели времен
 */
export const timeMarker = ["Вчера", "Сегодня", "Завтра", "Послезавтра"];

/**
 * Переменная хранит языковую метку для определения локали.
 * @constant
 */
export const LOCALES = "ru";

export const monthNamesRu = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

export const weekDaysRu = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
];

export const shortWeekDaysRu = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
