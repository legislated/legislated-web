// @flow
import * as React from 'react'
import styled, { css } from 'react-emotion'
import { createFragmentContainer, graphql } from 'react-relay'
import { BillHead } from './BillHead'
import { BillTitle, BillStatus, Button, Link, CopyLink } from '@/components'
import { href } from '@/functions'
import { mixins } from '@/styles'
import { type BillDetail_bill as Bill } from './__generated__/BillDetail_bill.graphql.js'

type Props = {
  bill: Bill
}

let BillDetail = function BillDetail ({ bill }: Props) {
  const { hearing, document } = bill

  return (
    <Detail>
      <BillHead bill={bill} />
      <BillTitle bill={bill} />
      <BillStatus bill={bill} />
      <Elements>
        <Element>
          <h6>Synopsis</h6>
          <p>{bill.summary}</p>
          <Links>
            <Link
              to={document && document.fullTextUrl}
              children='View Full Text'
            />
            <Link
              to={bill.detailsUrl}
              children='View Details'
            />
          </Links>
        </Element>
        <Element>
          <h6>Committee</h6>
          <p>{hearing && hearing.committee.name}</p>
        </Element>
        <Element>
          <h6>Primary Sponsor</h6>
          <p>{bill.sponsorName}</p>
        </Element>
      </Elements>
      <Actions>
        <Button
          to={bill.slipUrl}
          children='Take Action'
        />
        <Link
          to={bill.slipResultsUrl}
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
    detailsUrl
    sponsorName
    slipUrl
    slipResultsUrl
    document {
      fullTextUrl
    }
    hearing {
      committee {
        name
      }
    }
    ...BillHead_bill
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
