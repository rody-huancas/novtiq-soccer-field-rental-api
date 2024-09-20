/**
 * Comprobar si es un correo electrónico válido
 * @param email Correo electrónico
 * @returns {boolean} Boolean
 */
export function isEmail(email: string): boolean {
  const regx = /\S+@\S+\.\S+/;
  return regx.test(email);
}
/**
 * Comprobar si es una URL válida
 * @param urlString Url de un sitio web
 * @returns {boolean} Boolean
 */
export function isValidUrl(urlString: string): boolean {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}
