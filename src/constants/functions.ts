/**
 * Возвращает единицу измерения параметра. Если параметр не задан,
 * то возвращается пустая строка.
 * @param val Значение параметра.
 * @param text Строка, которая выводится если параметр не задан.
 * @param dim Размерность.
 * @example "%" "н/д"
 */
export const snowDimension = (val: string, text: string, dim: string): string =>
  val === text ? "" : dim;
/**
 * Функция возвращает значение поля объекта по заданному ключу.
 * @param obj - объект значение паля которого надо найти.
 * @param key - ключ для поиска.
 * @param def - дефолтное значение, которое вернет функция
 * если ключ не будет найден в объекте.
 */
export function getField<T, K extends keyof T>(
  obj: T,
  key: string,
  def: T[K]
): T[K] {
  return obj[key as K] ?? def;
}
/**
 * Функция присваивает полю объекта значение по ключу.
 * @param obj - объект
 * @param key - ключ
 * @param value - значение
 */
export function setProperty<T, K extends keyof T>(
  obj: T,
  key: string,
  value: T[K]
) {
  obj[key as K] = value;
}
