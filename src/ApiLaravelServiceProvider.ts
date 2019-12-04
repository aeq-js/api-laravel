import axios from 'axios'
import Qs from 'qs'
import { Container, Service } from 'typedi'
import { ApiLaravelTransformable } from './ApiLaravelTransformable'
import { ApiLaravel } from './ApiLaravel'

@Service()
export class ApiLaravelServiceProvider {
  boot ({ store, config }: { store: any, config: { url: string } }) {
    const axiosInstance = axios.create({
      baseURL: config.url,
      headers: {
        'Content-Type': 'application/json'
      },
      paramsSerializer: (params) => {
        return Qs.stringify(params, { encodeValuesOnly: true })
      }
    })

    Container.set('http', axiosInstance)
    Container.set('api', Container.get(ApiLaravel))
  }
}
