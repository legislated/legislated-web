// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import { createFragmentContainer, graphql } from 'react-relay'
import { withRouter, type ContextRouter } from 'react-router-dom'
import { BillTitle, BillStatus, Button, Link, CopyLink } from '@/components'
import { href } from '@/functions'
import { mixins } from '@/styles'
import type { Bill } from '@/types'

type Props = {
  bill: Bill
}

let BillDetail = function BillDetail ({ bill }: Props) {
  return (
    <Detail>
      <BillTitle bill={bill} />
      <BillStatus bill={bill} />
      <Elements>
        <Element>
          <h6>Synopsis</h6>
          <p>{bill.summary}</p>
          <Links>
            <Link to={bill.fullTextUrl}>View Full Text</Link>
            <Link to={bill.detailsUrl}>View Details</Link>
          </Links>
        </Element>
        <Element>
          <h6>Committee</h6>
          <p>{bill.committee.name}</p>
        </Element>
        <Element>
          <h6>Primary Sponsor</h6>
          <p>{bill.sponsorName}</p>
        </Element>
      </Elements>
      <Actions>
        <Button
          to={bill.witnessSlipUrl}
          children='Take Action'
        />
        <Link
          to={bill.witnessSlipResultUrl}
          children='View Results'
        />
      </Actions>
      <Copy value={href()} />
    </Detail>
  )
}

BillDetail = createFragmentContainer(BillDetail, graphql`
  fragment BillDetail_bill on Bill {
    summary
    sponsorName
    detailsUrl
    fullTextUrl
    witnessSlipUrl
    witnessSlipResultUrl
    committee {
      name
    }
    ...BillTitle_bill
    ...BillStatus_bill
  }
`)

const Detail = styled.div`
  ${mixins.flexColumn};
  position: relative;
`

const Elements = styled.div`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(3, 1fr);
  margin: 30px 0;

  > *:first-child {
    grid-column: span 3;
  }

  ${mixins.mobile`
    grid-template-columns: repeat(2, 1fr);

    > *:first-child {
      gird-column: span 2;
    }
  `}
`

const Element = styled.div`
  > h6 {
    margin-bottom: 5px;
  }
`

const row = css`
  ${mixins.flexRow};

  > * + * {
    margin-left: 10px;
  }
`

const Links = styled.div`
  ${row}
  margin-top: 5px;
`

const Actions = styled.div`
  ${row};
  align-items: center;
`

const Copy = styled(CopyLink)`
  position: absolute;
  top: 0;
  right: 0;
`

export { BillDetail }
