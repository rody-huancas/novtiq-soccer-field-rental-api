import { APP_CLIENT_URL, PUBLIC_URL } from "@config/env"

// Dominios permitidos
const allowedDomains = [PUBLIC_URL, APP_CLIENT_URL]

/**
 * Definir los orígenes que pueden solicitar a la API
 * @param {string} url Url que solicia la información de la API
 * @param {Function} callback Callback que recibe un error
 **/
const origin = (
  url: string,
  callback: (m: Error | null, b: boolean) => void
) => {
  if (!url) return callback(null, true) // La url no existe

  // Verificar si la url está dentro de los dominios permitidos
  const isAllowedDomain = (allowedDomains as string[]).some((allowedDomain) =>
    url.includes(allowedDomain)
  )

  if (isAllowedDomain) return callback(null, true)

  const msg = new Error(
    `Este sitio '${url}' no tiene acceso. Solo los dominios específicos pueden acceder a él.`
  )

  return callback(msg, false)
}

export const corstOptions = { 
  origin: origin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization']
}