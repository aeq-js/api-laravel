
export class AppError extends Error {
  message: string = 'Woops! Something went wrong. :('

  constructor (data: { [key: string]: any } = {}) {
    super()
  }
}
