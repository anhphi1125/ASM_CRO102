import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const {id, name, price, quantity, image } = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id.toString() === id.toString()
            );
            if(existingProduct) {
                existingProduct.quantity += quantity;
            }else {
                state.cart.push({id, name, price, quantity, image });
            }
        },
        removeFromCart(state, action) {
            const { id } = action.payload;
            state.cart = state.cart.filter(
                (product) => product.id.toString() !== id.toString()
            );
        },
        updateCart(state, action) {
            const { id, quantity } = action.payload;
            const existingProduct = state.cart.find(
                (product) => product.id.toString() === id.toString()
            );
            if(existingProduct){
                if(quantity <= 0){
                    state.cart = state.cart.filter(product => product.id.toString() !== id.toString());
                }else{
                    existingProduct.quantity = quantity;
                }
            }
        },
    },
    extraReducers: (bulder) => {},
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;