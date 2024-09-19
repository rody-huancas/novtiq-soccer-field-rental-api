// Librarys
import { NestMiddleware } from '@nestjs/common'
import { Logger, Injectable } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
// Interfaces
import { UseLoggerMiddlewareParams } from './interfaces'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const host = req.get('host') || '' // Obtener host
    const userAgent = req.get('user-agent') || '' // Obtener agente
    const contentType = req.get('content-type') || '' // Obtener tipo de contenido

    res.on(
      'finish',
      this.log({
        ip         : req.ip,
        host       : host,
        method     : req.method,
        userAgent  : userAgent,
        contentType: contentType,
        originalUrl: req.originalUrl
      })
    )

    next()
  }

  /**
   * Muestra un log por consola cuando se obtiene una respuesta
   * @param {UseLoggerMiddlewareParams} payload Valores a mostrar en Logger
   * @returns Clousure
   */
  private log(payload: UseLoggerMiddlewareParams) {
    const { ip, host, method, userAgent, contentType, originalUrl } = payload

    return () => {
      console.log(
        '\x1b[35m',
        '-------------------------------------------------------------------------'
      )
      Logger.debug(
        `\nTipo de petición: '${method}'\nIP: '${ip}'\nEndpoint: '${originalUrl}'\nHost: '${host}'\nTipo de contenido: '${contentType}'\nAgente: '${userAgent}'`,
        LoggerMiddleware.name
      )
      console.log(
        '\x1b[35m',
        '-------------------------------------------------------------------------'
      )
    }
  }
}
