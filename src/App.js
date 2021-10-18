import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import CartIndicator from './components/CartIndicator'
import BookStore from './components/BookStore'
import Cart from './components/Cart'
import { Route, Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'

// because App is the nearest common ancestor of Cart, CartIndicator and BookDetail,
// we're going to store the cart array of books here!
// so we can then pass this piece of info down to every components that needs to be
// aware of it!

// to save into App a state variable we can choose from:
// 1) convert App into a class component
// 2) use a useState hook to save the cart

// let's go with n.2!

const App = () => {
  // we can use here a hook!
  const [cart, setCart] = useState([])
  // useState returns an array of always TWO elements: the state variable itseld
  // and a function capable of updating its value

  const addItemToCart = (book) => {
    let newCart = [...cart]
    newCart.push(book)
    setCart(newCart)
    // shorthand: [...cart, book]
  }

  return (
    <Router>
      <Container>
        <Row>
          <Col sm={12} className="text-center background-div">
            <Link to="/">
              <h1>Strivazon Book Store</h1>
            </Link>
          </Col>
          <CartIndicator cartLength={cart.length} />
        </Row>
        <hr />
        <Route path="/" exact render={(routerProps) => <BookStore {...routerProps} addItemToCart={addItemToCart} />} />
        <Route path="/cart" exact component={Cart} />
      </Container>
    </Router>
  )
}

export default App

// I need from App to pass a way to interact with the cart array to BookStore
// and then from BookStore I need to pass it to BookDetail
