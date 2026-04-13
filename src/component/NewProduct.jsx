import React, { useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";

const NewProduct = () => {
  const paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  let [newProduct, setNewProduct] = useState({
    title: "",
    price: 500,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  // in the rating object we have two variables rate,count and if we console it we have rating.rate or rating.count so use split method to separate them
  // in the name attributes also we have {newProduct.rating.rate} then split, if we split we have two component one is empty string and other is rate or count use index there

  let handleChange = (e) => {
    let { value, name } = e.target;
    // console.log(name,value);
    let fieldName = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setNewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  console.log(newProduct);

  let handleAdd = (e) => {
    // in the form if we give submit then it will rerender the page so we want to use preventdefault to avoid this rendering
    e.preventDefault();
    fetch("http://localhost:5000/products", {
      method: "POST",
      // wants to specify that which content we are going to send using content-Type
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      alert("Data Successfully added");
      setNewProduct({
        title: "",
        price: 500,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });
  };

  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5" textAlign="center">
        Create New Element
      </Typography>

      <Grid component="form" onSubmit={handleAdd}>
        {/* the full width is used to occupy the full width of the grid */}
        <Grid style={{ display: "grid", gap: "20px" }}>
          <TextField
            value={newProduct.title}
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={newProduct.category}
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
                value={newProduct.rating.rate}
                name="rating.rate"
                type="number"
                label="Rate"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.count}
                name="rating.count"
                type="number"
                label="Count"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewProduct;

{
  /* <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5" textAlign="center">
        Create New Element
      </Typography>

      <Grid container spacing={5} component="form">
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Title" variant="outlined" />
        </Grid>
      </Grid>
    </Paper> */
}
