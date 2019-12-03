import { ValidationError } from './ValidationError'

type DTO = { [key: string]: any }

export class ValidationErrorCollection {
  errors: ValidationError[] = []

  constructor (data = {}) {
    Object.assign(this, data)
  }

  getFor (field: string): string | string[] | null {
    const validationError = this.errors.find(
      error => error.key === field || error.key === `${field}_id`)
    return validationError ? validationError.value : null
  }

  clearFor (field = '') {
    const validationError = this.errors.find(
      error => error.key === field || error.key === `${field}_id`)
    if (validationError) {
      validationError.value = []
    }
  }

  clear () {
    this.errors = []
  }

  static createFromLaravelErrors (laravelErrors: DTO) {
    let errors = Object.keys(laravelErrors.errors).map(key => {
      const value = laravelErrors.errors[key]
      return new ValidationError({ key: key, value })
    })
    return new ValidationErrorCollection({ errors })
  }

  addError (key: string, value: string) {
    this.errors.push(new ValidationError({ key, value }))
  }

  clearCollection () {
    this.errors = []
  }

  get hasError () {
    return !!this.errors.length
  }
}
