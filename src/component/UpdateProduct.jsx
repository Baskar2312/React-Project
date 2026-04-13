import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  let [updateProduct, setUpdateProduct] = useState(null);
  let navigate = useNavigate();

  let {id} = useParams();   //   console.log(id);

  useEffect(()=>{
    axios.get(`http://localhost:5000/products/${id}`)
    .then(res=> setUpdateProduct(res.data))
  },[])

  let handleChange = (e) => {
    let { value, name } = e.target;
    // console.log(name,value);
    let fieldName = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setUpdateProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setUpdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

//   console.log(newProduct);

  let handleUpdate = (e) => {
    // in the form if we give submit then it will rerender the page so we want to use preventdefault to avoid this rendering
    e.preventDefault();
    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      // wants to specify that which content we are going to send using content-Type
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then(() => {
      alert("saved Successfully");
      navigate("/products")
    });
  };
//  the if-else statement is for while update product renders first after the useeffect or sideeffect will execute initiaally the updateProduct is null so it show some error
//  so we want to use conditional statement that after the data fetching through axios it will execute 

  if(updateProduct!==null){
      return (
        <Paper elevation={20} style={paperStyle}>
          <Typography variant="h5" textAlign="center">
            Update Product
          </Typography>
    
          <Grid component="form" onSubmit={handleUpdate}>
            {/* the full width is used to occupy the full width of the grid */}
            <Grid style={{ display: "grid", gap: "20px" }}>
              <TextField
                value={updateProduct.title}
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                value={updateProduct.category}
                name="category"
                label="Category"
                variant="outlined"
                fullWidth
                onChange={handleChange}
              />
              {/* here we are splitting the grid into 2 each will have the size of 6 */}
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    value={updateProduct.rating.rate}
                    name="rating.rate"
                    type="number"
                    label="Rate"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    value={updateProduct.rating.count}
                    name="rating.count"
                    type="number"
                    label="Count"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" color="success" fullWidth>
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      );
  }
  else{
    <div> Loading... </div>
  }
}

export default UpdateProduct
