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

  // let's introduce the quantity concept in my cart!
  // I want my cart objects to look like this now:
  //   cart = [{
  //     book: {},
  //     qty: 1
  //   }, {
  //   book: {...},
  //   qty: 2
  // }]

  // const addItemToCart = (book) => {
  //   let newCart = [...cart]
  //   newCart.push(book)
  //   setCart(newCart)

  //   //shorthand
  //   // setCart([...cart, book])
  // }

  // with quantity
  const addItemToCart = (book) => {
    // let's look in the cart array for an object already containing the book I'm trying to add!
    let bookObjectIndex = cart.findIndex((el) => el.book.id === book.id)
    // this can be a valid index if 0 or more, -1 instead if it's not found
    let newCart = [...cart]
    if (bookObjectIndex >= 0) {
      // it means I found already an object in the cart with the book I'm trying to add
      // I'm creating a copy of the cart
      newCart[bookObjectIndex].qty++
      // I'm increasing the qty of the found element
      // and finally I'm saving the new cart state variable
    } else {
      // I'm falling here if I'm trying to add a book that I've not added before!
      let newObjectForCart = {
        book: book,
        qty: 1,
      }
      newCart.push(newObjectForCart)
    }
    setCart(newCart)
  }

  // with quantity
  const removeItemFromCart = (id) => {
    let bookObjectIndex = cart.findIndex((el) => el.book.id === id)
    // the process is decreasing the quantity of an element if qty > 1
    // if the qty is === 1, remove the whole object from the cart
    let newCart = [...cart]
    if (cart[bookObjectIndex].qty > 1) {
      newCart[bookObjectIndex].qty--
    } else {
      newCart.splice(bookObjectIndex, 1)
    }
    setCart(newCart)
  }

  // const removeItemFromCart = (index) => {
  //   let newCart = cart.filter((book, i) => i !== index)
  //   setCart(newCart)
  // }

  return (
    <Router>
      <Container>
        <Row>
          <Col sm={12} className="text-center background-div">
            <Link to="/">
              <h1>Strivazon Book Store</h1>
            </Link>
          </Col>
          <CartIndicator cartLength={cart.reduce((acc, currentValue) => acc + currentValue.qty, 0)} />
        </Row>
        <hr />
        <Route path="/" exact render={(routerProps) => <BookStore {...routerProps} addItemToCart={addItemToCart} />} />
        <Route
          path="/cart"
          exact
          render={(routerProps) => <Cart {...routerProps} cart={cart} removeItemFromCart={removeItemFromCart} />}
        />
      </Container>
    </Router>
  )
}

export default App

// I need from App to pass a way to interact with the cart array to BookStore
// and then from BookStore I need to pass it to BookDetail
