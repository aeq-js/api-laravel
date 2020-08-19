import { ApiConfig, ApiLaravel } from './ApiLaravel'
import { Inject, Service } from 'typedi'
import { classToPlain } from 'class-transformer'

type DTO = { [key: string]: any }


@Service()
export class ApiLaravelTransformable {
  @Inject()
  api!: ApiLaravel

  get<T> (url: string, data: (T | DTO) = {}, config: ApiConfig = {}): Promise<T> {
    return this.api.get(url, classToPlain(data), config)
  }

  put<T> (url: string, data: (T | DTO) = {}, config: ApiConfig = {}): Promise<T> {
    return this.api.put(url, classToPlain(data), config)
  }

  post<T> (url: string, data: (T | DTO) = {}, config: ApiConfig = {}): Promise<T> {
    return this.api.post(url, classToPlain(data), config)
  }

  delete<T> (url: string, data: (T | DTO) = {}, config: ApiConfig = {}): Promise<T> {
    return this.api.delete(url, classToPlain(data), config)
  }
}
