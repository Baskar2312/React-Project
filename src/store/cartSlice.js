import {createSlice} from "@reduxjs/toolkit"

let dataFromWeb = JSON.parse(localStorage.getItem("cart"))

const cartSlice= createSlice({
    name : "cart",
    initialState : dataFromWeb,
    reducers : {
        // here this reducer will also have state and action like useReducer
        // the state will hold the initial value of the state and the action is used to give action with the help of dispatch here we are giving through newProductList
        addItem(state,action){
            // console.log(action) while we clicking addCart in the productList then this function is triggerred
            // In this action we have two parameters one is payload which contains about the product or item then type it should refer the name and the reducer 
            // console.log(action.payload);
            state.push(action.payload)
            localStorage.setItem("cart",JSON.stringify([...state ]))
        },
        removeItem(state,action){
            let itemId=action.payload;
            // here itemId is from the payload and we are checking with the state above if it not matches then it would be omitted 
            let newProducts = state.filter(cartProduct => cartProduct.id!=itemId);
            localStorage.setItem("cart",JSON.stringify([...newProducts ]))
            return newProducts
            // here newProducts is set into initialState because we have created new array and by above condition
        }
    }
})

// here we want to export reducer and action because the store will call it or import it.
export default cartSlice.reducer;
export let {addItem,removeItem} = cartSlice.actions 