import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import {add} from '../store/CartSlice';
import { useDispatch } from "react-redux";

function Product() {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const fetchData = async () => {
    const result = await axios.get("https://fakestoreapi.com/products");
    setProducts(result.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const addToCart = (product) => {
    //Dispatch a add action
    dispatch(add(product))

  }
  const cards = products.map((product) => {
    return (
      <div className="col-md-3" style={{ marginBottom: "15px" }}>
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
            <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
          </Card.Footer>
        </Card>
      </div>
    );
  });
  return (
    <div>
      <h1 style={{marginTop: '20px', marginBottom: '15px', fontFamily: 'monospace'}}>Product Dashboard</h1>
      <div className="row">{cards}</div>
    </div>
  );
}

export default Product;
