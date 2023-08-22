import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import './index.css'
/* prettier-ignore */
class SignupForm extends Component {
  state = {
    FullName: '',
    username: '',
    password: '',
    accountType: '',
    phoneNumber: '',
    email: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  handleUserTypeChange = event => {
    this.setState({accountType: event.target.value})
  }

  onChangeFullName = event => {
    this.setState({FullName: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePhoneNumber =event => {
    this.setState({phoneNumber:event.target.value})
  }

  onClickLoginButton=() => {
    const {history} = this.props
    history.replace('/login')
  }

  onSubmitSuccess = () => {
    const {history} = this.props
    history.replace('/login')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }
  

  submitSignInForm = async event => {
    event.preventDefault()
    const {
      username,
      password,
      FullName,
      accountType,
      email,
      phoneNumber,
    } = this.state

    // console.log(username, password, FullName, accountType, email, phoneNumber)    
    const data = {
        username,
        password,
        FullName,
        accountType,
        email,
        phoneNumber,
    }
    console.log(data)
    const areAllPropertiesEmpty = obj => Object.values(obj).some(value => value === "");
   if (areAllPropertiesEmpty(data)) {
       const errorMsg = "Invalid Details"
       this.setState({showSubmitError: true, errorMsg})
       return 
   }    
    try {
      const response = await axios.post('http://localhost:9000/user/register', data);
      console.log(response.data);
      this.onSubmitSuccess()
      
    } catch (error) {
      const errorMsg = "An Error Occured in SingIn"
      this.onSubmitFailure(errorMsg)
      console.error(error);
    }
  }

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderFullNameField = () => {
    const {FullName} = this.state

    return (
      <>
        <label className="input-label" htmlFor="fullName">
          FULL NAME
        </label>
        <input
          type="text"
          id="fullName"
          className="password-input-field"
          value={FullName}
          onChange={this.onChangeFullName}
          placeholder="Full Name"
        />
      </>
    )
  }

  /* prettier-ignore */
  renderCPasswordField = () => {
    const {accountType} = this.state

    return (
      <>
        <label className="input-label" htmlFor="cPassword">
          CHOOSE ACCOUNT
        </label>
        <select
          value={accountType}
          className="password-input-field2"
          onChange={this.handleUserTypeChange}
        >
          <option value="" disabled>
            Choose User
          </option>
          <option value="prime">
            Prime User
          </option>
          <option value="nonPrime">
            Non-Prime User
          </option>
        </select>
      </>
    )
  }

  renderPhoneField = () => {
    const {phoneNumber} = this.state

    return (
      <>
        <label className="input-label" htmlFor="phoneNumber">
          PHONE NUMBER
        </label>
        <input
          type="text"
          id="phoneNumber"
          className="password-input-field"
          value={phoneNumber}
          onChange={this.onChangePhoneNumber}
          placeholder="Phone Number"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderEmailField = () => {
    const {email} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-img"
          alt="website logo"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-img"
          alt="website login"
        />
        <form className="form-container2" onSubmit={this.submitSignInForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="hello-container">
            <div className="input-container2">{this.renderUsernameField()}</div>
            <div className="input-container2">{this.renderFullNameField()}</div>
          </div>
          <div className="hello-container">
            <div className="input-container2">{this.renderPasswordField()}</div>
            <div className="input-container2">
              {this.renderCPasswordField()}
            </div>
          </div>
          <div className="hello-container">
            <div className="input-container2">{this.renderPhoneField()}</div>
            <div className="input-container2">{this.renderEmailField()}</div>
          </div>
          <div className="hello">
            <button type="submit" className="login-button2 p-button">
              SignUp
            </button>
            <button
              type="button"
              onClick={this.onClickLoginButton}
              className="login-button2 login-button3 button"
            >
              Login
            </button>
          </div>
          <div className="hello-container">
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          {!showSubmitError && <p className="error-message mirror">Have an Account?</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default SignupForm
