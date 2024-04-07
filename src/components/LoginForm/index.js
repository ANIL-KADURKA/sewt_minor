import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

import './index.css'

/* prettier-ignore */
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    success: false,
    accountTypOr: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickSignUp = () => {
    const {history} = this.props
    history.replace('/SignIn')
  }

  onSubmitSuccess = data => {
    const {jwtToken, message, accountType,id} = data
    Cookies.set('Token', jwtToken, {
      expires: 30,
    })
    this.setState({success: true,accountTypOr:accountType})
    const {accountTypOr} = this.state
    console.log(message)
     Cookies.set('user_id', id, {
      expires: 30,
    })
    const helloOp = accountTypOr
    console.log(helloOp)
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitSuccessOp = (jwtToken) => {
      const {history} = this.props
      Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
     Cookies.set('username', username, {
      expires: 30,
    })
    console.log(username,password)
    const userName = username
    const passWord = password
    const dataSent = {userName, passWord}
    console.log(dataSent)
    const areAllPropertiesEmpty = obj => Object.values(obj).some(value => value === "");
   if (areAllPropertiesEmpty(dataSent)) {
       console.log("Hello")
       const errorMsg = "Invalid Details"
       this.setState({showSubmitError: true, errorMsg})
       return 
   } 
    try {
      const response = await axios.post(
        'http://localhost:9000/user/login',
        dataSent,
      )
      console.log(response.data)
      console.log('Hello World')
      this.onSubmitSuccess(response.data)
    } catch (error) {
      const errorMsg = 'An Error Occurred in SingIn'
      console.log(errorMsg)
      console.error(error)
    }
    const {success,accountTypOr} = this.state
    if (success) {
      let userDetails
      if(accountTypOr==="prime"){
        userDetails = {username: 'rahul', password: 'rahul@2021'}
      }
      else{
        userDetails = {username: 'raja', password: 'raja@2021'}
      }
      const url = 'https://apis.ccbp.in/login'

      console.log("Hyderabad")
      console.log(userDetails)
      const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        this.onSubmitSuccessOp(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
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
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-img"
            alt="website logo"
          />
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="login-button">
            Login
          </button>
          <button type="button" onClick={this.onClickSignUp}  className="login-button clear">
            SignUp
          </button>
          {!showSubmitError &&  <p className ="error-message error">Do not have an Account?</p>}
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
