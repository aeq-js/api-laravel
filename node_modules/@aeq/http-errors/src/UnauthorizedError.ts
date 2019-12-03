import { AppError } from './AppError'
export class UnauthorizedError extends AppError {
  static DEFAULT_MESSAGE: string = 'Unauthenticated'
  error: any
  message: string = UnauthorizedError.DEFAULT_MESSAGE
  description: string = ''
  previous: any
  data: any

  constructor (data: { [key: string]: any } = {}) {
    super(data)
    Object.assign(this, data)
  }
}
