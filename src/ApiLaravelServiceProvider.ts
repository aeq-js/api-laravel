import axios from 'axios'
import { stringify } from '../../utilities/Helper/StringHelpers'
import { Container } from 'typedi'

export class ApiLaravelServiceProvider {
  boot ({ store, config }: { store: any, config: { url: string } }) {
    const axiosInstance = axios.create({
      baseURL: config.url,
      headers: {
        'Content-Type': 'application/json'
      },
      paramsSerializer: (params) => {
        return stringify(params)
      }
    })

    Container.set('http', axiosInstance)
  }
}
