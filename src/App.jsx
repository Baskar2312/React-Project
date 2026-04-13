import TodoApp from "./component/TodoApp";
import Home from "./component/Home";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Products from "./component/Products";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductDetails from "./component/ProductDetails";
import ProductList from "./component/ProductList";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import NavBar from "./component/NavBar"
import NotFound from "./component/NotFound";
import NewProduct from "./component/NewProduct";
import UpdateProduct from "./component/UpdateProduct";
import WishList from "./component/WishList";

// The storage will accept only the json format so JSON.stringify whatever given as value here it will be reflected with local storage.it has key value pair 
if(!localStorage.getItem("cart")){
  localStorage.setItem("cart",JSON.stringify([]))  
}
// this method is used to get data from the storage but the issue is like the local storage returns json format so we want convert it into js. key value is alone enough
// let datafromweb = JSON.parse(localStorage.getItem("cart"))
// to remove the item , the key is must
// localStorage.removeItem("cart")

function App() {
  let user = "Kesavan";
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login/:newUser" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />}>
            <Route index element={<ProductList/>}></Route>
            <Route path="list" element={<ProductList />}></Route>
            <Route path="details" element={<ProductDetails />}></Route>
          </Route>
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/newproduct" element={<NewProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/wishlist" element={<WishList/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
