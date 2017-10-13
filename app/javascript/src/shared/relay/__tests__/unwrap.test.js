/* eslint-env jest */
import { unwrap } from '../unwrap'

describe('#unwrap', () => {
  it('unwraps the nodes', () => {
    const connection = {
      edges: [
        { node: 1 },
        { node: 2 }
      ]
    }

    expect(unwrap(connection)).toEqual([1, 2])
  })
})
