// @flow
// set this to your desired env key; try not to check in changes to this value
const debugEnv = null

type Config = {|
  graphUrl: string,
|}

export function loadConfig () {
  const configs: { [key: string]: Config } = {
    development: {
      graphUrl: 'http://localhost:5000/graphql'
    },
    staging: {
      graphUrl: 'https://legislated-staging.herokuapp.com/graphql'
    },
    production: {
      graphUrl: 'https://legislated.herokuapp.com/graphql'
    }
  }

  const buildEnv = process.env.ENVIRONMENT
  const env = buildEnv === 'development' ? debugEnv || buildEnv : buildEnv
  if (!env) {
    throw new Error('No environment specified!')
  }

  const config = configs[env]
  if (!config) {
    throw new Error(`No config for environment: ${env}!`)
  }

  return config
}

export default loadConfig()
