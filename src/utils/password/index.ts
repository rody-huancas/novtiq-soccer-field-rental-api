// Librarys
import * as bcrypt from 'bcrypt'

/**
 * Encriptar contraseña
 * @param password Contraseña de usuario para encriptar
 * @param n Longitud del hash
 * @returns Contraseña cifrada
 */
export async function encryptPassword(password: string, n = 10): Promise<string> {
  const salt = await bcrypt.genSalt(n)
  return bcrypt.hash(password, salt)
}

/**
 * Comparar actual contraseña de usuario con contraseña recibida en 'body'
 * @param {string} password Contraseña de usuario recibida en el 'body'
 * @param {string} encryptedPassword Contraseña encriptada del usuario guardada en la base de datos
 * @returns {booleano} Booleano
 */
export async function equalPasswords(password: string, encryptedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, encryptedPassword)
}
