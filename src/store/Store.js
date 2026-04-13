import {configureStore} from "@reduxjs/toolkit"
import cartSliceReducer from "./cartSlice"

// configureStore is to create store and it recieve the object as an argument and inside we have reducer property it should also has been object with key and value 

export const store = configureStore({
    reducer : {
        cart : cartSliceReducer  
    }
})