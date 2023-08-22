import {useState} from 'react'

import {Redirect} from 'react-router-dom'

import {RecaptchaVerifier, getAuth, signInWithPhoneNumber} from 'firebase/auth'

import {FaArrowRight, FaPhone} from 'react-icons/fa'

import {BiLeftArrowAlt} from 'react-icons/bi'

import {HiShieldCheck} from 'react-icons/hi2'

import result from './firebase'

import './index.css'

const auth = getAuth(result)

const PhoneAuthentication = () => {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState(true)
  const [verify, setVerify] = useState(null)
  const [success, setSuccess] = useState(false)
  const {retry, setRetry} = useState(false)

  const onClickRetry = () => {
    setUser(true)
    setSuccess(false)
    setRetry(false)
  }

  //   const exploreButton = () => {
  //     const {history} = props
  //     history.replace('/products')
  //   }

  const sendOtp = async () => {
    const phoneOp = `+91${phone}`
    try {
      window.recaptchaVerifier = await new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        {},
      )
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneOp,
        window.recaptchaVerifier,
      )
      console.log(confirmation)
      setPhone('')
      setUser(false)
      setVerify(confirmation)
    } catch (err) {
      console.log(err)
    }
  }

  const verifyOtp = async () => {
    const hello = await verify.confirm(otp)
    console.log(hello)
    if (hello !== undefined) {
      setSuccess(true)
      setRetry(false)
    } else if (hello.status === 400) {
      setRetry(true)
      setSuccess(false)
    } else {
      setRetry(true)
      setSuccess(false)
    }
  }

  return (
    <div className="otp-section-container">
      {user ? (
        <>
          <div className="otp-card-container">
            <img
              src="https://res.cloudinary.com/df6tfgugw/image/upload/v1689509040/5191079_egqqrl.jpg"
              className="otp-image"
              alt="otp banner"
            />
          </div>
          <div className="otp-login-container">
            <h1 className="input-label2">Verify Your Phone Number</h1>
            <div className="phone-container">
              <FaPhone className="phone-icon" />
              <input
                type="num"
                id="number"
                value={phone}
                className="phone-input-field"
                placeholder="Enter Your PhoneNumber"
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                className="otp-send-button"
                onClick={sendOtp}
              >
                Send OTP <FaArrowRight />
              </button>

              <div id="recaptcha-container" className="recaptcha-container" />
              <p className="captcha">*Catch the Re-Captcha</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="otp-card-container">
            <img
              src="https://res.cloudinary.com/df6tfgugw/image/upload/v1689512214/6325251_bwuid3.jpg"
              className="otp-image"
              alt="otp banner"
            />
          </div>
          <div className="otp-login-container">
            <h1 className="input-label">Verify Your OTP </h1>
            <div className="phone-container">
              <HiShieldCheck className="phone-icon" />
              <input
                type="num"
                id="number-otp"
                value={otp}
                className="phone-input-field"
                placeholder="Enter Your OTP"
                onChange={e => setOtp(e.target.value)}
              />
            </div>
            <div>
              <button
                type="button"
                className="otp-send-button"
                onClick={verifyOtp}
              >
                Verify OTP <FaArrowRight />
              </button>
              {success && (
                <div>
                  <p className="success-msg">You have Logged in Successfully</p>
                  {/* <button
                    type="button"
                    onClick={exploreButton}
                    className="explore-button otp-send-button "
                  >
                    Explore */}
                  {/* </button> */}
                  <Redirect to="/products" />
                </div>
              )}
              {retry && (
                <div>
                  <p className="warning-error">You are Timed Out</p>
                  <button
                    type="button"
                    className="otp-send-button retry-button"
                    onClick={onClickRetry}
                  >
                    Retry <BiLeftArrowAlt />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PhoneAuthentication
