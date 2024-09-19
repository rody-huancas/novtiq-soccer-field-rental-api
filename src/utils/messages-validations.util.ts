export const validationMessages = {
  boolean : (field: string) => `El campo ${field} debe ser un valor booleano`,
  date    : (field: string) => `El campo ${field} debe ser una fecha válida`,
  email   : (field: string) => `El campo ${field} debe ser una dirección de correo electrónico válida`,
  enum    : (field: string, values: string[]) => `El campo ${field} debe ser uno de los siguientes valores: ${values.join(', ')}`,
  length  : (field: string, min: number, max: number) => `El campo ${field} debe tener entre ${min} y ${max} caracteres`,
  max     : (field: string, max: number) => `El campo ${field} debe ser menor o igual a ${max}`,
  min     : (field: string, min: number) => `El campo ${field} debe ser mayor o igual a ${min}`,
  number  : (field: string) => `El campo ${field} debe ser un número`,
  required: (field: string) => `El campo ${field} es requerido`,
  string  : (field: string) => `El campo ${field} debe ser una cadena de texto`,
  url     : (field: string) => `El campo ${field} debe ser una URL válida`,
};
