/**
 * Genera una URL amigable a partir de una cadena de texto.
 *
 * @param {string} str - La cadena de texto original.
 * @returns {string} La URL generada.
 */
export const generateUrlFromString = (str: string): string => {
  let url = '/' + str.toLowerCase().replace(/\s+/g, '-');

  url = url.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  url = url.replace(/[^/a-z0-9-]/g, '');
  url = url.replace(/-+/g, '-');
  url = url.replace(/^-+|-+$/g, '');

  return url;
};
