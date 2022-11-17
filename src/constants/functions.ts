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
 */
export function getField<T, K extends keyof T>(
  obj: T,
  key: string | K,
  def: T[K]
): T[K] {
  return typeof key === "string"
    ? (console.log("key as: ", key, obj), obj[key as K]) ??
        (console.log(`Ключ ${key} не найден в объекте: `, obj), def)
    : (console.log(`Ключ: `, key), obj[key]);
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
