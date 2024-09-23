import { ActionType, ResponseMessage } from "./types";

/**
 * Genera una URL amigable a partir de una cadena de texto.
 *
 * @param {string} str - La cadena de texto original.
 * @returns {string} La URL generada.
 */
export const generateUrl = (str: string): string => {
  let url = '/' + str.toLowerCase().replace(/\s+/g, '-');

  url = url.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  url = url.replace(/[^/a-z0-9-]/g, '');
  url = url.replace(/-+/g, '-');
  url = url.replace(/^-+|-+$/g, '');

  return url;
};

/**
 * Concatena una lista de palabras en una sola cadena.
 *
 * @param {string[]} words - La lista de palabras a concatenar.
 * @param {string} separator - El separador a usar entre palabras (por defecto es un espacio).
 * @returns {string} La cadena resultante de la concatenación.
 */
export const concatenateWords = (words: string[], separator: string = ' '): string => {
  if (!Array.isArray(words) || words.length === 0) {
    return '';
  }

  const filteredWords = words.filter(word => typeof word === 'string' && word.trim() !== '');

  return filteredWords.join(separator);
};


/**
 * Genera un mensaje de respuesta basado en la entidad, el identificador y la acción realizada.
 *
 * @param {string} entity - El tipo de entidad (por ejemplo, 'usuario', 'rol', 'menú', 'permiso').
 * @param {string} identifier - El identificador único de la entidad.
 * @param {ActionType} action - El tipo de acción realizada (crear, actualizar, eliminar).
 * @returns {ResponseMessage} Un objeto con el mensaje de respuesta generado.
 */
export const createActionMessage = (entity: string, identifier: string, action: ActionType): ResponseMessage => {
  const actionMessages: Record<ActionType, string> = {
    [ActionType.Create]: 'creado',
    [ActionType.Update]: 'actualizado',
    [ActionType.Delete]: 'eliminado'
  };

  const actionMessage = actionMessages[action];

  return {
    message: `El ${entity} '${identifier}' ha sido ${actionMessage} correctamente.`
  };
};