import { KeyNameListFormat } from "@/types/types";
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

export const defaultOptionsDateTimeFormat: Record<string, string> = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

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
