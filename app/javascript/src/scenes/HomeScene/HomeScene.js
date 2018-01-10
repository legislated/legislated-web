// @flow
import * as React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import styled from 'react-emotion'
import { HomeIntro } from './HomeIntro'
import { BillSearch } from '@/components'
import type { Viewer } from '@/types'
import { mixins } from '@/styles'

type Props = {
  viewer: ?Viewer
}

let HomeScene = function HomeScene ({ viewer }: Props) {
  return (
    <Scene>
      <HomeIntro />
      <BillSearch
        viewer={viewer}
      />
    </Scene>
  )
}

HomeScene = createFragmentContainer(HomeScene, graphql`
  fragment HomeScene_viewer on Viewer {
    ...BillSearch_viewer
  }
`)

const Scene = styled.section`
  ${mixins.flexColumn};
  position: relative;
`

export { HomeScene }
