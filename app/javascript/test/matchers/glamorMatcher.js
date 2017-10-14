export function glamorMatcher (findRule) {
  return function (enzymeWrapper, pattern) {
    let actual = '(none)'
    let pass = false

    // handle different lengths of enzymeWrappers
    switch (enzymeWrapper.nodes.length) {
      case 0:
        break // this will and should fail the test
      case 1:
        actual = findRule(enzymeWrapper)
        pass = actual.match(pattern) != null
        break
      default:
        pass = enzymeWrapper.reduce((memo, node) => {
          actual = findRule(enzymeWrapper)
          return memo && actual.match(pattern)
        }, true)
    }

    // generate output
    const message = pass
      ? () => this.utils.matcherHint('.not.toBe') + '\n\n' +
        `Expected rule to not match (using 'match')\n` +
        `  ${this.utils.printExpected(pattern)}\n` +
        `Received:\n` +
        `  ${this.utils.printReceived(actual)}`
      : () => this.utils.matcherHint('.toBe') + '\n\n' +
        `Expected rule to match (using 'match')\n` +
        `  ${this.utils.printExpected(pattern)}\n` +
        `Received:\n` +
        `  ${this.utils.printReceived(actual)}`

    return { pass, message }
  }
}
