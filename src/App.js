import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import PhoneAuthentication from './components/PhoneAuthentication'
import './App.css'
/* prettier-ignore */

class App extends Component {
  state = {
    cartList: [],
  }


  removeAllCartItemsOP = () => {
    this.setState({
      cartList: [],
    })
  }
   
  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(each => each.id !== id)
    this.setState({
      cartList: [...updatedCartList],
    })
  }

  incrementCartItemQuantity = (id, quantity = 1) => {
    const {cartList} = this.state

    const updatedCartList = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + quantity}
      }
      return each
    })

    this.setState({
      cartList: updatedCartList,
    })
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList
      .map(each => {
        if (each.id === id) {
          if (each.quantity !== 1) {
            return {...each, quantity: each.quantity - 1}
          }
          return null
        }
        return each
      })
      .filter(item => item !== null)
    this.setState({
      cartList: updatedCartList,
    })
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productItem = cartList.find(each => each.id === product.id)

    if (productItem === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.incrementCartItemQuantity(product.id, product.quantity)
    }
  }

  render() {
    const {cartList,Name} = this.state
    console.log(Name)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItemsOP,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
        <Route exact path="/signIn" component={SignupForm} />
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/auth" component={PhoneAuthentication} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
