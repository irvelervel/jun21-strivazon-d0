import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";

const Cart = ({ cart, removeItemFromCart }) => (
  <Row>
    <Col sm={12}>
      <ul style={{ listStyle: "none" }}>
        {cart.map((cartElement, i) => (
          <li key={i} className="my-4">
            <Button variant="danger" onClick={() => removeItemFromCart(cartElement.book.id)}>
              <FaTrash />
            </Button>
            <img
              className="book-cover-small"
              src={cartElement.book.imageUrl}
              alt="book selected"
            />
            {cartElement.book.title}
            - <strong>{cartElement.qty}</strong>
          </li>
        ))}
      </ul>
    </Col>
    <Row>
      <Col sm={12} className="font-weight-bold">
        TOTAL:{" "}
        {cart.reduce(
          (acc, currentValue) => acc + (currentValue.book.price * currentValue.qty),
          0
        )}
      </Col>
    </Row>
  </Row>
);

export default Cart;
