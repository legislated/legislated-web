// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { HelpQuestion as Question } from './HelpQuestion'
import { Link } from '@/components'
import { colors, mixins } from '@/styles'

export function Help () {
  return (
    <Scene>
      <h1>Frequently Asked Questions</h1>
      <Question>
        <h4>What is a Witness Slip?</h4>
        <h6>What It Is</h6>
        <p>A Witness Slip allows a person or group to voice support for or against a particular bill that can be filed as a record online. While it is not a vote, it helps the legislative committee gauge how the community feels about the bill.</p>
        <h6>Why It Matters</h6>
        <p>While you can only vote for your representatives every other year, you can submit a witness slip on every bill and affect how decisions are made. For as much time as it would take to share an article online, you can make a contribution to your government.</p>
        <h6>How It Works</h6>
        <p>The Slips are then read at the start of committee hearings. Because of the influx in participation with witness slips, we have been able to influence bills like HB40 which was passed in committee!</p>
        <h6>What It Isn't</h6>
        <p>Witness Slips are not substitutes for in-person visits, calls, letters, or emails. Your State Representative or Senator will not know that you filled out a Witness Slip. Witness Slips are a different tool. It is vitally important that you call, write, and/or visit your ILGA Representative and Senator on issues that are important to you. Ask your friends to do the same! Slips are counted by a small group of ILGA members to move the bill out of committee, but your reps need to hear from you. It is by far the most effective way to influence them.</p>
        <p>If you are not sure who your representatives are, look them up here and find their contact information either in the House or Senate. Thank you for making amazing things happen in Illinois.</p>
      </Question>
      <Question>
        <h4>When is the Witness Slip submission deadline?'</h4>
        <p>The Senate allows you to submit a Witness Slip until the end of the day of the committee hearing's scheduled date.</p>
        <p>The House allows you to submit a Witness Slip until the conclusion of the committee hearing.</p>
      </Question>
      <Question>
        <h4>Where do I fill out Witness Slips?'</h4>
        <p>
          <span>For any bill on legislated.org, the "Take Action" button will open a form that you can use to submit the Witness Slip. If you cannot find a bill here, you can try to find it on the</span>
          <Link to='http://my.ilga.gov' children='Illinois General Assembly\'s Dashboard' />
        </p>
      </Question>
      <Question>
        <h4>How do I complete a Witness Slip?'</h4>
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
      <Question>
        <h4>How do I create an account'</h4>
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
      <Question>
        <h4>Are there Witness Slips at the federal level?'</h4>
        <p>
          No.
        </p>
      </Question>
      <Question>
        <h4>Why am I filling out a Slip for the same bill each week?'</h4>
        <p>
          If a bill isn't called at a committee meeting, you have to re-file one
          for the new hearing date.
        </p>
      </Question>
      <Question>
        <h4>Where can I go for more help?'</h4>
        <p>
          For more information please checkout
          {' '}<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link> on Facebook or
          {' '}<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link> on Twitter. Questions? Please ask!
        </p>
      </Question>
      <Question>
        <h4>How can I get involved?'</h4>
        <p>
          To get involved,
          {' '}<Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>{' '}
          to attend a Chi Hack Night meeting or join our
          {' '}<Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.
          We are so proud of our volunteers, and would be happy to have you join us!
        </p>
      </Question>
    </div>
  )
}

const Scene = styled.section`
  ${mixins.flexColumn};
  ${mixins.pageWidth};
`

const Question = styled.div`
  > h4 {
    color: ${colors.red};
  }
`
