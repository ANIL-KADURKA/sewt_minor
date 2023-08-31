import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  const NameOfUser = Cookies.get('username')
  const capitalizedString =
    NameOfUser.charAt(0).toUpperCase() + NameOfUser.slice(1)
  console.log(NameOfUser)
  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-content">
          <h3 className="home-heading2"> Welcome {capitalizedString}</h3>
          <h3 className="home-heading">Clothes That Get YOU Noticed </h3>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="home-mobile-img"
          />
          <p className="home-description">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
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
}
export default Home
