// @flow
class Config {
  isServer = process.env.IS_SERVER != null
  graphUrl = process.env.GRAPH_URL || ''

  constructor () {
    if (this.graphUrl.length === 0) {
      throw new Error('GRAPH_URL environment variable was blank')
    }
  }

  // accessors
  get isClient (): boolean {
    return !this.isServer
  }

  get graphEndpoint (): string {
    return this.graphUrl + '/api/graphql'
  }
}

export const config = new Config()
