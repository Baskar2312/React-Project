import React, { useState } from "react";
import { Typography, Paper, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let renderCount = 0;
let schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is Required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Enter your fullname"),
  email: Yup.string()
    .email()
    .required("Email is Required")
    .matches(/^[a-z0-9]+@[a-z]{3,5}.[a-z]{2,4}$/, "Enter your valid email"),
  age: Yup.number()
    .integer()
    .positive()
    .required("Enter your age")
    .min(18, "Enter age between 18 and 30")
    .max(30, "Enter age between 18 and 30"),
  password: Yup.string().required("Password is required"),
  cPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

const SignUp = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "20px",
  };
  renderCount++;
  let [input, setInput] = useState("");

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  let onSubmit = (data) => {
    console.log(data);
  };
  // here the onSubmit is returned from the function handleSubmit where it has all the keys like name,email and here the returned keys from the handleSubmit will sent to this form,
  // the returned function from handleSubmit will be useful for the registers.
  return (
    <Paper
      elevation={20}
      style={paperStyle}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6" textAlign={"center"}>
        Create Account - {renderCount}{" "}
      </Typography>
      <TextField
        label="Name"
        {...register("name")}
        // here the helperText is provided by the materialUI where in the name property we have message attribute so that will be destructured
        error={!!errors.name}
        helperText={errors.name?.message}
      ></TextField>
      <TextField
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      ></TextField>
      <TextField
        label="Age"
        {...register("age")}
        error={!!errors.age}
        helperText={errors.age?.message}
      ></TextField>
      <TextField
        label="Password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      ></TextField>
      <TextField
        label="Confirm Password"
        {...register("cPassword")}
        error={!!errors.cPassword}
        helperText={errors.cPassword?.message}
      ></TextField>
      <Button variant="contained" type="submit">
        {" "}
        SignUp{" "}
      </Button>
    </Paper>
  );
};

export default SignUp;
