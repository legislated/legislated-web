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
          <h7>What It Is</h7>
          <p>A witness slip allows a person or group to voice support for or against a particular bill that can be filed as a record online. While it is not a vote, it helps the legislative committee gauge how the community feels about the bill.</p>
        </dd>
        <dd>
          <h7>Why It Matters</h7>
          <p>While you can only vote for your representatives every other year, you can submit a witness slip on every bill and affect how decisions are made. For as much time as it would take to share an article online, you can make a contribution to your government.</p>
        </dd>
        <dd>
          <h7>How It Works</h7>
          <p>The Slips are then read at the start of committee hearings. Because of the influx in participation with witness slips, we have been able to influence bills like HB40 which was passed in committee!</p>
        </dd>
        <dd>
          <h7>What It Isn't</h7>
          <p>Witness slips are not substitutes for in-person visits, calls, letters, or emails. Your state representative or senator will not know that you filled out a witness slip. witness slips are a different tool. It is vitally important that you call, write, and/or visit your ILGA representative and senator on issues that are important to you. Ask your friends to do the same! Slips are counted by a small group of ILGA members to move the bill out of committee, but your reps need to hear from you. It is by far the most effective way to influence them.</p>
          <p>If you are not sure who your representatives are, look them up here and find their contact information either in the House or Senate. Thank you for making amazing things happen in Illinois.</p>
        </dd>

        <dt>When is the witness slip submission deadline?</dt>
        <dd>
          <h7>Senate</h7>
          <p>The Senate allows you to submit a witness slip until the end of the day of the committee hearing's scheduled date.</p>
        </dd>
        <dd>
          <h7>House</h7>
          <p>The House allows you to submit a witness slip until the conclusion of the committee hearing.</p>
        </dd>

        <dt>Where do I fill out witness slips?</dt>
        <dd>
          <span>For any bill on legislated.org, the "Take Action" button will open a form that you can use to submit the witness slip. If you cannot find a bill here, you can try to find it on the</span>
          <Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>
        </dd>

        <dt>How do I complete a witness slip?</dt>
        <dd>For any bill on Legislated.org, the "Take Action" button will open a form that you can use to submit the witness slip. If you cannot find a bill here, you can try to find it on the Illinois General Assembly's Dashboard.</dd>
        <dd>
          <h7>Watch this video!</h7>
          <Link to='https://www.youtube.com/watch?v=6SaODB11-AA'>
            <img src={media} alt='Video' />
          </Link>
        </dd>
        <dd>
          <h7>Step-by-step:</h7>
          <ol>
            <li>
              <span>Click the "Take Action” button next to the bill, which will take you to the</span>
              <Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>.
            </li>
            <li>Log in or fill out your personal identification information as prompted. (Enter your job title or "Self" under "Title," and your organization or "Self" under "Firm/business or agency.")</li>
            <li>Under "Persons, groups, firms represented in this appearance," enter "Self."</li>
            <li>In the representation section, enter "Self."</li>
            <li>
              <span>Check "Proponent” or "Opponent” in the position section. If you are unsure of your stance on a particular witness slip please visit</span>
              <Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The witness slip Project (Illinois)</Link>
              <span>on Facebook or</span>
              <Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link>
              <span>on Twitter.</span>
            </li>
            <li>Check the box marked "Record of Appearance Only" in the testimony section.</li>
            <li>Enter CAPTCHA and agree to terms of service.</li>
            <li>Click "Create Slip."</li>
          </ol>
        </dd>

        <dt>Should I create an account?</dt>
        <dd>
          <strong>Creating an account is HIGHLY recommended!</strong>
          <span>If you have an account you will only have to fill out your personal information once. After that simply choose proponent/opponent for any Slip and submit. You will also be able to keep track of the Slips you've created.</span>
        </dd>
        <dd>The next time you select a witness slip, all of your information will be prepopulated, and you will only need to select Proponent or Opponent.</dd>

        <dt>How do I create an account?</dt>
        <dd>
          <ol>
            <li>
              <span>Go to the</span>
              <Link to='http://my.ilga.gov'>Illinois General Assembly's Dashboard</Link>
            </li>
            <li>In the left sidebar, select "Register"</li>
            <li>Enter email and password</li>
            <li>Check "Agree to Terms"</li>
            <li>Click "Register"</li>
            <li>You will receive a confirmation email. Follow the link to verify your account and enter your profile information.</li>
          </ol>
        </dd>
        <dd>
          <span>More detailed instructions are available in the</span>
          <Link to='http://my.ilga.gov/Documents/ILGA%20Dashboard%20User%20Guide.pdf'>ILGA witness slip User Guide</Link>.
        </dd>

        <dt>Are there witness slips at the federal level?</dt>
        <dd>No.</dd>

        <dt>Why am I filling out a slip for the same bill each week?</dt>
        <dd>If a bill isn't called at a committee meeting, you have to re-file one for the new hearing date.</dd>

        <dt>Where can I go for more help?</dt>
        <dd>
          <span>For more information please checkout</span>
          <Link to='https://www.facebook.com/groups/WitnessSlipProjectIllinois/'>The witness slip Project (Illinois)</Link>
          <span>on Facebook or</span>
          <Link to='https://twitter.com/WitnessSlipsIL'>@WitnessSlipsIL</Link>
          <span>on Twitter. Questions? Please ask!</span>
        </dd>

        <dt>How can I get involved?</dt>
        <dd>
          <span>To get involved,</span>
          <Link to='https://www.eventbrite.com/e/chi-hack-night-registration-20361601097'>register here</Link>
          <span>to attend a Chi Hack Night meeting or join our</span>
          <Link to='https://www.facebook.com/groups/248218992302984/'>Facebook Working Group</Link>.
          <span>We are proud of our volunteers, and would be happy to have you join us!</span>
        </dd>
      </dl>
    </Scene>
  )
}

const Scene = styled.section`
  ${mixins.flexColumn};
  ${mixins.pageWidth};
  ${mixins.pageMargin};

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

  h7 {
    font-size: 12px;
    text-transform: uppercase;
    color: ${colors.gray1};
  }

  dd + dd {
    margin-top: 15px;
  }


  * + p {
    margin-top: 10px;
  }
`
