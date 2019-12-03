import { ApiConfig, ApiLaravel } from './ApiLaravel'
import { Inject, Service } from 'typedi'
import { classToPlain } from 'class-transformer'

type DTO = { [key: string]: any }

@Service()
export class ApiLaravelTransformable {
  @Inject()
  api!: ApiLaravel

  get (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.api.get(url, classToPlain(data), config)
  }

  put (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.api.put(url, classToPlain(data), config)
  }

  post (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.api.post(url, classToPlain(data), config)
  }

  delete (url: string, data: DTO = {}, config: ApiConfig = {}) {
    return this.api.delete(url, classToPlain(data), config)
  }
}
