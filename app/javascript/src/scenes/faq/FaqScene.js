// @flow
import React, { Component } from 'react'
import { Question } from './components'
import { Link } from 'shared/components'
import { stylesheet, colors, mixins } from 'shared/styles'

export class FaqScene extends Component {
  render () {
    return <div {...rules.container}>
      <div {...rules.content}>
        <h1>FAQ</h1>
        <Question title='What is a Witness Slip?'>
          <h5>What it is</h5>
          <p>
            A Witness Slip allows a person or group to voice support for or against
            a particular bill that can be filed as a record online.
            While it is not a vote, it helps the legislative committee gauge how the
            community feels about the bill.
          </p>
          <h5>How it works</h5>
          <p>
            The Slips are then read at the start of committee hearings.
            Because of the influx in participation with witness slips, we have been
            able to influence bills like
            {' '}<Link to='http://www.ilga.gov/legislation/billstatus.asp?DocNum=40&GAID=14&GA=100&DocTypeID=HB&LegID=99242&SessionID=91'>HB40</Link>{' '}
            which was passed in committee!
          </p>
          <h5>Why it matters</h5>
          <p>
            While you can only vote for your representatives every other year,
            you can submit a witness slip on every bill and affect how decisions are made.
            For as much time as it would take to share an article online,
            you can make a contribution to your government.
          </p>
          <h5>What it isn't</h5>
          <p>
            Witness Slips are not substitutes for in-person visits, calls, letters, or emails.
            Your State Representative or Senator will not know that you filled out a Witness Slip.
            Witness Slips are a different tool.
            <strong> It is vitally important that you call, write, and/or visit your
            ILGA Representative and Senator on issues that are important to you.
            Ask your friends to do the same! </strong>
            Slips are counted by a small group of ILGA members to move the bill
            out of committee, but your reps need to hear from you.
            It is by far the most effective way to influence them.
          </p>
          <p>
            If you are not sure who your representatives are, look them up
            {' '}<Link to='https://ova.elections.il.gov/RegistrationLookup.aspx'>here</Link>{' '}
            and find their contact information either in the
            {' '}<Link to='http://ilga.gov/house/'>House</Link>{' '}
            or
            {' '}<Link to='http://ilga.gov/senate/'>Senate</Link>
            .
          </p>
          <p>
            <strong>Thank you for making amazing things happen in Illinois.</strong>
          </p>
        </Question>
        <Question title='When is the Witness Slip submission deadline?'>
          <p>
            The Senate allows you to submit a Witness Slip until the end of the
            day of the committee hearing's scheduled date.
          </p>
          <p>
            The House allows you to submit a Witness Slip until the conclusion of
            the committee hearing.
          </p>
        </Question>
        <Question title='Where do I fill out Witness Slips?'>
          <p>
            For any bill on Legislated.org, the "Take Action" button will open a form that
            you can use to submit the Witness Slip. If you cannot find a bill
            here, you can try to find it on the
            {' '}<Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>.
          </p>
        </Question>
        <Question title='How do I complete a Witness Slip?'>
          <div>
            <h5>Watch this video!</h5>
            <div {...rules.video}>
              <iframe {...rules.iframe}
                width='560'
                height='315'
                src='https://www.youtube.com/embed/6SaODB11-AA'
                frameBorder='0'
                allowFullScreen />
            </div>
            <h5>Step-by-step:</h5>
            <ol>
              <li>
                Click the "Take Action” button next to the bill, which will take you to the
                {' '}<Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>.
              </li>
              <li>
                Log in or fill out your personal identification information as prompted.
                (Enter your job title or "Self” under "Title,” and your organization or "Self” under "Firm/business or agency.”)
              </li>
              <li>Under "Persons, groups, firms represented in this appearance,” enter "Self.”</li>
              <li>In the representation section, enter "Self.”</li>
              <li>
                Check "Proponent” or "Opponent” in the position section.
                If you are unsure of your stance on a particular witness slip please visit
                {' '}<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link> on Facebook or
                {' '}<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link> on Twitter.
              </li>
              <li>Check the box marked "Record of Appearance Only” in the testimony section.</li>
              <li>Enter CAPTCHA and agree to terms of service.</li>
              <li>Click "Create Slip.”</li>
            </ol>
          </div>
        </Question>
        <Question title='How do I create an account'>
          <div>
            <strong>Creating an account is HIGHLY recommended! </strong>
            If you have an account you will only have to fill out your personal information once.
            After that simply choose proponent/opponent for any Slip and submit.
            You will also be able to keep track of the Slips you've created.
            <ol>
              <li>Go to the {' '}<Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link></li>
              <li>In the left sidebar, select "Register”</li>
              <li>Enter email and password</li>
              <li>Check "Agree to Terms”</li>
              <li>Click "Register”</li>
              <li>You will receive a confirmation email. Follow the link to verify your account and enter your profile information.</li>
            </ol>
            The next time you select a Witness Slip, all of your information will be
            prepopulated, and you will only need to select Proponent or Opponent.
          </div>
          <p>
            More detailed instructions are available in the
            {' '}<Link to='http://my.ilga.gov/Documents/ILGA%20Dashboard%20User%20Guide.pdf'>ILGA Witness Slip User Guide</Link>.
          </p>
        </Question>
        <Question title='Are there Witness Slips at the federal level?'>
          <p>
            No.
          </p>
        </Question>
        <Question title='Why am I filling out a Slip for the same bill each week?'>
          <p>
            If a bill isn't called at a committee meeting, you have to re-file one
            for the new hearing date.
          </p>
        </Question>
        <Question title='Where can I go for more help?'>
          <p>
            For more information please checkout
            {' '}<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link> on Facebook or
            {' '}<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link> on Twitter. Questions? Please ask!
          </p>
        </Question>
        <Question title='How can I get involved?'>
          <p>
            To get involved,
            {' '}<Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>{' '}
            to attend a Chi Hack Night meeting or join our
            {' '}<Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.
            We are so proud of our volunteers, and would be happy to have you join us!
          </p>
        </Question>
      </div>
    </div>
  }
}

const rules = stylesheet({
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    ...mixins.shadows.low,
    ...mixins.borders.low(),
    padding: 15,
    backgroundColor: colors.neutral,
    ' h5': {
      marginBottom: 5
    },
    ' ol': {
      marginTop: 10,
      marginBottom: 10
    },
    ' p:not(:last-of-type)': {
      marginBottom: 10
    }
  },
  video: {
    marginBottom: 10,
    ...mixins.mobile({
      position: 'relative',
      paddingBottom: '50%',
      paddingTop: 30,
      height: 0,
      overflow: 'hidden'
    })
  },
  iframe: {
    ...mixins.mobile({
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })
  }
})
