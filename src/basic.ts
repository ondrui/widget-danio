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
 * В переменной сохранено количество миллисекунд в сутках.
 * @constant
 */
export const allDayMs = 86400000;

/**
 * Массив содержит слова-указатели времен
 */
export const timeMarker = ["Вчера", "Сегодня", "Завтра", "Послезавтра"];
