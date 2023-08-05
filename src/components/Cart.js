import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { remove } from "../store/CartSlice";

function Cart() {
  const cartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const deleteItem = (id) => {
    //Dispatch a remove action
    dispatch(remove(id))
  }
  function totalPrice(){
    let total=0
    cartProducts.forEach((item) => {
      total+=item.price
    })
    return total.toFixed(2)
  }
  const cards = cartProducts.map((product) => {
    return(
      <div className="col-md-4" style={{ marginBottom: "15px" }}>
        <Card key={product.id} className="h-100">
          <div
            className="img-container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: "100px", height: "130px" }}
            />
          </div>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>INR: {product.price}</Card.Text>
          </Card.Body>
          <Card.Footer style={{backgroundColor: 'white'}}>
            <Button variant="danger" onClick={() => deleteItem(product.id)}>Delete Item</Button>
          </Card.Footer>
        </Card>
      </div>
    )
  })
  const emptyCart = () => {
    return(
      <div style={{marginTop: '100px', fontFamily: 'monospace', fontSize: '40px'}}>
        Your cart is Empty
      </div>
    )
  }
  const cart = () => {
    return(
      <div>
        <h1 style={{marginTop: '30px', marginBottom: '30px'}}>Cart</h1>
        <div className="row">{cards}</div>
        <div className="footer" style={{display: 'flex',justifyContent: 'center',height: '150px',alignItems: 'center'}}>
          <h3 style={{fontFamily: 'monospace'}}>Total : INR {totalPrice()}</h3>
        </div>
      </div>
    )
  }
  return (
    <div>
      {cartProducts.length === 0 ? emptyCart() : cart()}
    </div>
  );
}

export default Cart;
