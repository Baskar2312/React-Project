import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LifeLine } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartSlice";

const ProductList = () => {
  // let [products, setProducts] = useState([]);  //to recieve the state
  // let [error, setError] = useState("");      //to handle the errors
  // let [isLoading, setIsLoading] = useState(true);   //to handle pending state

  // useEffect(() => {
  //   fetch("http://localhost:4000/products", { method: "GET" })
  //     .then((response) => {
  //       if(response.ok){
  //           return response.json();
  //       }
  //       else{
  //           throw new Error("Search Proper Data")
  //       }
  //     }) //after fetching the data we can use .then to resolve, the method fetch returns json but we wants to specify for browser as js object wants to stringify using .json
  //     .then((data) => {
  //       setProducts(data);
  //     }) //the above then is used to convert into json and this is used to console.it
  //     .catch((error) => {
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     });
  // }, []);
  let { products, error, isLoading, setProducts } = useFetch(
    "http://localhost:4000/products"
  );

  let handleDelete = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`).then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
        let newProductList = products.filter((product) => product.id !== id);
        setProducts(newProductList);
      });
    });
  };
  let navigate = useNavigate();
  // from here we want to send the product to the state where it would be like dispatch or action in usereducer
  let dispatch = useDispatch();

  let cartState = useSelector((state)=> {return state.cart})
  let addItemToCart = (product) => {
    let checkProduct = cartState.some(
      (cartProduct) => cartProduct.id === product.id
    );
    if(!checkProduct){
      dispatch(addItem(product))
      Swal.fire({
        title: "succes!",
        text: "product added successfully",
        icon: "success",
      });
    }
    else{
      Swal.fire({
        title: "OOPS",
        text: "Product Already Present",
        icon: "error",
        footer:"<p>Add Some Other Product </p>"
      });
    }
  };
  if (isLoading) {
    return (
      <div>
        <center>
          <LifeLine color="#32cd32" size="medium" text="Loading" textColor="" />
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <article>
          <span>To create an element</span>
          <Button onClick={() => navigate("/newproduct")}>Click Me!</Button>
        </article>
        <h1>ProductList</h1>
        {products.length !== 0 && (
          <section className="products">
            {products.map((product) => (
              <Card
                key={product.id}
                style={{ width: "18rem" }}
                className="product"
              >
                <center>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: "9rem", height: "12rem" }}
                  />
                </center>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="primary"
                    onClick={() => addItemToCart(product)}
                  >
                    <MdOutlineAddShoppingCart />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigate(`/update/${product.id}`);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    <MdDelete />
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </section>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
};

export default ProductList;



// if (!checkProduct) {
//       dispatch(addItem(product));
//       Swal.fire({
//         title: "succes!",
//         text: "product added successfully",
//         icon: "success",
//       });
    
//     } else {
//       alert("Product already added");
//       Swal.fire({
//         title: "OOPS",
//         text: "Product Already Present",
//         icon: "Error",
//         footer:"<p>Add Some Other Product </p>"
//       });
//     }