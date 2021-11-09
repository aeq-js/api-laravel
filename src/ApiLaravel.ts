import { EntityError } from './Errors/EntityError'
import { NotFoundError, ApiError, NetworkError, UnauthorizedError } from '@aeq/http-errors'
import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { Inject, Service, Token } from 'typedi'

type DTO = { [key: string]: any }

export interface ApiConfig extends AxiosRequestConfig {
  noWrapper?: boolean
}

export const HttpService = new Token<AxiosInstance>()

@Service()
export class ApiLaravel {
  @Inject(HttpService)
  http!: AxiosInstance

  get (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.http.get(url, {
      ...config,
      params: data
    }), config.noWrapper)
  }

  put (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.http.put(url, data, config), config.noWrapper)
  }

  post (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.http.post(url, data, config), config.noWrapper)
  }

  delete (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.handleExceptions(() => this.http.delete(url, data), config.noWrapper)
  }

  setToken (token: string) {
    // NOTE: api is the singleton so we are using it like storage.
    // This is the hack, but we have no idea how to make other way. We don`t want to send token manually each time.
    this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  isNetworkErrorException (error: AxiosError) {
    return error.message === 'Network Error'
  }

  isApiException (error: AxiosError) {
    return !!error.response
  }

  async handleExceptions (cb: Function, noWrapper: boolean = false) {
    let response = null
    try {
      response = await cb()
    } catch (exception: any) {
      const exceptionResponse = exception && exception.response
      const data = exceptionResponse && exceptionResponse.data
      const status = exceptionResponse && exceptionResponse.status

      if (EntityError.isEntityError(exception)) {
        throw EntityError.createFromAxiosError(exception)
      }
      if (status === 401) {
        throw new UnauthorizedError({
          error: data.error,
          description: data.message,
          previous: exception,
          data: data.data
        })
      }
      if (status === 404) {
        throw new NotFoundError({
          previous: exception,
          data: data.data
        })
      }
      if (this.isNetworkErrorException(exception)) {
        throw new NetworkError({
          message: exception.message
        })
      }
      if (this.isApiException(exception)) {
        throw new ApiError({
          message: data.message
        })
      }
      throw exception
    }
    const responseData = response.data
    if (noWrapper || typeof (responseData && responseData.data) === 'undefined') {
      return responseData
    }
    return responseData && responseData.data
  }
}
