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
