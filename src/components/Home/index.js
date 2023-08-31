import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import UserContext from '../../context/UserContext'

import './index.css'

const Home = () => (
  <UserContext.Consumer>
    {value => {
      const {Name} = value
      const NameOfUser = Cookies.get('username')
      console.log(Name)
      return (
        <>
          <Header />
          <div className="home-container">
            <div className="home-content">
              <h1 className="home-heading2">{{NameOfUser}}</h1>
              <h3 className="home-heading">Clothes That Get YOU Noticed </h3>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
                alt="clothes that get you noticed"
                className="home-mobile-img"
              />
              <p className="home-description">
                Fashion is part of the daily air and it does not quite help that
                it changes all the time. Clothes have always been a marker of
                the era and we are in a revolution. Your fashion makes you been
                seen and heard that way you are. So, celebrate the seasons new
                and exciting fashion in your own way.
              </p>
              <Link to="/auth">
                <button type="button" className="shop-now-button">
                  Shop Now
                </button>
              </Link>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
              alt="clothes that get you noticed"
              className="home-desktop-img"
            />
          </div>
        </>
      )
    }}
  </UserContext.Consumer>
)
export default Home
