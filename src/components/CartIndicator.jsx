import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CartIndicator = ({ history, cartLength }) => (
  <div className="ml-auto mt-2">
    <Button color="primary" onClick={() => history.push("/cart")}>
      <FaShoppingCart />
      <span className="ml-2">{cartLength}</span>
    </Button>
  </div>
);

export default withRouter(CartIndicator);
// withRouter is a function coming from react-router-dom which enriches CartIndicator
// with the routerProps, so history location and match
// I'm using history to redirect programmatically the user on /cart when he/she clicks on it
// this enriched CartIndicator is technically called a HOC
// higher order component