import { ApiConfig, ApiLaravel } from './ApiLaravel'
import { Inject, Service } from 'typedi'
import { classToPlain } from 'class-transformer'

type DTO = { [key: string]: any }

@Service()
export class ApiLaravelTransformable {
  @Inject()
  http!: ApiLaravel

  get (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.http.get(url, classToPlain(data), config)
  }

  put (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.http.put(url, classToPlain(data), config)
  }

  post (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.http.post(url, classToPlain(data), config)
  }

  delete (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.http.delete(url, classToPlain(data), config)
  }
}
