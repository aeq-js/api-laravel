const fs = require('fs')

async function main () {
  const configDir = './src/config'
  if (!fs.existsSync(configDir)){
    fs.mkdirSync(configDir)
  }

  const file = process.env.CONFIG || `${configDir}/ApiLaravelConfig.ts`
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
