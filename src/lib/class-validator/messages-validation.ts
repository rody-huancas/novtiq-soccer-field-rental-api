import { ValidationArguments } from 'class-validator'

export function IS_UUID(field = 'id') {
  return `[${field}] Este campo debe ser un identificador`
}

export function IS_STRING(field: string) {
  return `[${field}] Este campo debe ser texto plano`
}

export function IS_BOOLEAN(field: string) {
  return `[${field}] Este campo debe ser 'true' o 'false'`
}

export function IS_HEX_COLOR(field: string) {
  return `[${field}] Este campo debe ser un color hexadecimal`
}

export function IS_NUMBER(field: string) {
  return `[${field}] Este campo debe ser un valor numérico`
}

export function IS_POSITIVE_NUMBER(field: string) {
  return `[${field}] Este campo debe ser un número positivo`
}

export function IS_LIST(field: string) {
  return `[${field}] Este campo debe ser una lista`
}

export function IS_REQUIRED(field: string) {
  return `[${field}] Este campo es requerido`
}

export function IS_INT(field: string) {
  return `[${field}] Este campo debe ser un número entero`
}

export function IS_ALLOWED(field: string) {
  return ({ value }: ValidationArguments) => {
    return `[${field}] '${value}' no es un valor permitido`
  }
}

export function IS_EMAIL(field: string) {
  return `[${field}] Este campo debe ser una dirección de correo electrónico válida`
}

export function IS_DATE(field: string) {
  return `[${field}] Este campo debe ser una fecha válida`
}

export function IS_ARRAY(field: string) {
  return `[${field}] Este campo debe ser un arreglo`
}

export function IS_OBJECT(field: string) {
  return `[${field}] Este campo debe ser un objeto`
}

export function IS_LENGTH(field: string, min: number, max: number) {
  return `[${field}] Este campo debe tener entre ${min} y ${max} caracteres`
}

export function IS_ENUM(field: string, enumValues: string[]) {
  return `[${field}] Este campo debe ser uno de los siguientes valores: ${enumValues.join(', ')}`
}

export function IS_MIN_LENGTH(field: string, min: number) {
  return `[${field}] Este campo debe tener al menos ${min} caracteres`
}

export function IS_MAX_LENGTH(field: string, max: number) {
  return `[${field}] Este campo debe tener máximo ${max} caracteres`
}

export function IS_MIN_VALUE(field: string, min: number) {
  return `[${field}] Este campo debe tener al menos ${min} caracteres`
}

export function IS_MAX_VALUE(field: string, max: number) {
  return `[${field}] Este campo debe tener máximo ${max} caracteres`
}