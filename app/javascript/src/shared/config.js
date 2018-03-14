// @flow
/* globals $Keys */
type Config = {|
  graphUrl: string,
|}

const configs = {
  development: {
    graphUrl: 'http://localhost:3000/api/graphql'
  },
  staging: {
    graphUrl: 'https://legislated-staging.herokuapp.com/api/graphql'
  },
  production: {
    graphUrl: 'https://legislated.herokuapp.com/api/graphql'
  },
  server: {
    graphUrl: 'http://localhost:3000/api/graphql'
  }
}

type Environment
  = $Keys<typeof configs>

function getEnv (): Environment {
  const env = process.env.ENVIRONMENT

  switch (env) {
    case 'development':
    case 'staging':
    case 'production':
    case 'server':
      return env
    default:
      throw new Error(`Invalid environment specified: ${env || 'null'}`)
  }
}

export function loadConfig () {
  let env = getEnv()
  const config: Config = configs[env]

  return {
    ...config,
    env
  }
}

export const config = loadConfig()
