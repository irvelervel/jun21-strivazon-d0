import { Component } from "react";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { Col, Row } from "react-bootstrap";

class BookStore extends Component {
  state = {
    books: [], // it's a state variable for holding the list of the available books
    bookSelected: null, // it's a state variable for remembering which was the last book we clicked on!
  };

  componentDidMount = async () => {
    try {
      let resp = await fetch(
        "https://striveschool-api.herokuapp.com/food-books"
      );
      if (resp.ok) {
        let fetchedBooks = await resp.json();
        this.setState({ books: fetchedBooks });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  changeBook = (book) => this.setState({ bookSelected: book });

  render() {
    return (
      <Row>
        <Col md={4}>
          <BookList
            bookSelected={this.state.bookSelected}
            changeBook={this.changeBook}
            books={this.state.books}
          />
        </Col>
        <Col md={8}>
          <BookDetail
            bookSelected={this.state.bookSelected}
            addItemToCart={this.props.addItemToCart}
          />
        </Col>
      </Row>
    );
  }
}

export default BookStore;
