// @flow
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from '@/components'
import { colors, mixins } from '@/styles'
import { media } from '&/images'

export function Help () {
  return (
    <Scene>
      <h3>Frequently Asked Questions</h3>
      <dl>
        <dt>What is a witness slip?</dt>
        <dd>
          <h6>What It Is</h6>
          <p>A witness slip allows a person or group to voice support for or against a particular bill that can be filed as a record online. While it is not a vote, it helps the legislative committee gauge how the community feels about the bill.</p>
        </dd>
        <dd>
          <h6>Why It Matters</h6>
          <p>While you can only vote for your representatives every other year, you can submit a witness slip on every bill and affect how decisions are made. For as much time as it would take to share an article online, you can make a contribution to your government.</p>
        </dd>
        <dd>
          <h6>How It Works</h6>
          <p>The Slips are then read at the start of committee hearings. Because of the influx in participation with witness slips, we have been able to influence bills like HB40 which was passed in committee!</p>
        </dd>
        <dd>
          <h6>What It Isn't</h6>
          <p>Witness slips are not substitutes for in-person visits, calls, letters, or emails. Your state representative or senator will not know that you filled out a witness slip. witness slips are a different tool. It is vitally important that you call, write, and/or visit your ILGA representative and senator on issues that are important to you. Ask your friends to do the same! Slips are counted by a small group of ILGA members to move the bill out of committee, but your reps need to hear from you. It is by far the most effective way to influence them.</p>
          <p>If you are not sure who your representatives are, look them up here and find their contact information either in the House or Senate. Thank you for making amazing things happen in Illinois.</p>
        </dd>

        <dt>When is the witness slip submission deadline?</dt>
        <dd>
          <h6>Senate</h6>
          <p>The Senate allows you to submit a witness slip until the end of the day of the committee hearing's scheduled date.</p>
        </dd>
        <dd>
          <h6>House</h6>
          <p>The House allows you to submit a witness slip until the conclusion of the committee hearing.</p>
        </dd>

        <dt>Where do I fill out witness slips?</dt>
        <dd>
          For any bill on legislated.org, the "Take Action" button will open a form that you can use to submit the witness slip. If you cannot find a bill here, you can try to find it on the
          <Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>
        </dd>

        <dt>How do I complete a witness slip?</dt>
        <dd>For any bill on legislated.org, the "Take Action" button will open a form that you can use to submit the witness slip. If you cannot find a bill here, you can try to find it on the Illinois General Assembly's Dashboard.</dd>
        <dd>
          <h6>Watch this video!</h6>
          <Video to='https://www.youtube.com/watch?v=6SaODB11-AA'>
            <img src={media} alt='Video' />
          </Video>
        </dd>
        <dd>
          <h6>Step-by-step</h6>
          <ol>
            <li>
              Click the "Take Action” on a bill page to go to the
              <Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>.
            </li>
            <li>Sign in or fill out your personal information as prompted (Enter your job title or "Self" under "Title," and your organization or "Self" under "Firm/business or agency").</li>
            <li>Under the representation section, enter "Self".</li>
            <li>
              Check "Proponent” or "Opponent” in the position section. If you are unsure of your stance on a particular witness slip please visit
              <Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link>
              on Facebook or
              <Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link>
              on Twitter.
            </li>
            <li>Check the box marked "Record of Appearance Only" in the testimony section.</li>
            <li>Enter CAPTCHA and agree to terms of service.</li>
            <li>Click "Create Slip".</li>
          </ol>
        </dd>

        <dt>Should I create an account?</dt>
        <dd>Creating an account is highly recommended! If you have an account you will only have to fill out your personal information once. After that simply choose proponent/opponent for any Slip and submit. You will also be able to keep track of the Slips you've created.</dd>
        <dd>The next time you select a witness slip, all of your information will be prepopulated, and you will only need to select Proponent or Opponent.</dd>

        <dt>How do I create an account?</dt>
        <dd>
          <ol>
            <li>
              Go to the
              {' '}<Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>
            </li>
            <li>In the left sidebar, select "Register"</li>
            <li>Enter email and password</li>
            <li>Check "Agree to Terms"</li>
            <li>Click "Register"</li>
            <li>You will receive a confirmation email. Follow the link to verify your account and enter your profile information.</li>
          </ol>
        </dd>
        <dd>
          More detailed instructions are available in the
          {' '}<Link to='http://my.ilga.gov/Documents/ILGA%20Dashboard%20User%20Guide.pdf'>ILGA witness slip user guide</Link>.
        </dd>

        <dt>Are there witness slips at the federal level?</dt>
        <dd>No.</dd>

        <dt>Why am I filling out a slip for the same bill each week?</dt>
        <dd>If a bill isn't called at a committee meeting, you have to re-file one for the new hearing date.</dd>

        <dt>Where can I go for more help?</dt>
        <dd>
          For more information please checkout
          {' '}<Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The Witness Slip Project (Illinois)</Link>{' '}
          on Facebook or
          {' '}<Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link>{' '}
          on Twitter. Questions? Please ask!
        </dd>

        <dt>How can I get involved?</dt>
        <dd>
          To get involved,
          {' '}<Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>{' '}
          to attend a Chi Hack Night meeting or join our
          {' '}<Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.{' '}
          We are proud of our volunteers, and would be happy to have you join us!
        </dd>
      </dl>
    </Scene>
  )
}

const Scene = styled.section`
  ${mixins.flexColumn};
  ${mixins.pageContent};

  align-self: center;
  margin-top: 30px;
  margin-bottom: 30px;

  h3 {
    margin-bottom: 30px;
  }

  dt {
    ${mixins.font.sizes.h5};
    margin-bottom: 15px;
    color: ${colors.primary};
  }

  dd + dt {
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid ${colors.gray5};
  }

  dd + dd {
    margin-top: 15px;
  }

  h6 {
    color: ${colors.gray1};
  }

  h6 + *, * + p {
    margin-top: 10px;
  }
`

const Video = styled(Link)`
  ${mixins.flexRow};
`
