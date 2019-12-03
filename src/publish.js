const fs = require('fs')
const stringify = require('stringify-object')
const config = require('./config')


async function main () {
  const configDir = '../../config'
  if (!fs.existsSync(configDir)){
    fs.mkdirSync(configDir)
  }

  const file = process.env.CONFIG || `${configDir}/ApiLaravelConfig.ts`
  const initConfig = config
  await fs.promises.writeFile(file,
    `import { Service } from 'typedi'

@Service()
export class ApiLaravelConfig {
  readonly url: string = '/api'
}

export const theApiLaravelConfig = new ApiLaravelConfig()`
  )

  console.log('Config was created in: ', file)
}

main()
