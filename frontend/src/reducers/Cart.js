import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "Cart",
    initialState: {
        data: [],
        total: 0
    },
    reducers: {
        addToCart(currentState, { payload }) {
            const found = currentState.data.find(d => d.item_id === payload.item_id);
            if (found) {
                found.qty++;
            } else {
                currentState.data.push({ item_id: payload.item_id, qty: 1 })
            }
            currentState.total += Number(Math.round(payload.price));
            localStorage.setItem("cart", JSON.stringify(currentState))
        },

        lsToCart(currentState) {
            const lsCart = localStorage.getItem('cart');
            const cart = JSON.parse(lsCart);
            if (lsCart != undefined) {
                currentState.data = cart.data;
                currentState.total = cart.total
            }
        },

        changeQty(currentState, { payload }) {
            const found = currentState.data.find(d => d.item_id == payload.item_id)
            if (found?.qty > payload.new_qty) {
                currentState.total -= Number(Math.round(payload.price))
            } else {
                currentState.total += Number(Math.round(payload.price))
            }
            found.qty = payload.new_qty;
            localStorage.setItem("cart", JSON.stringify(currentState))
        },

        removeFormCart(currentState, { payload }) {
            const lsCart = localStorage.getItem('cart');
            const cart = JSON.parse(lsCart);
            const lsTotal = cart.total
            if (cart && cart.data && lsTotal) {
                const found = currentState.data.find(d => d.item_id == payload.item_id)
                const updateData = cart.data.filter(d => d.item_id !== payload.item_id);
                const updateTotal = Number(lsTotal) - Number(payload.price * found.qty);
                currentState.data = updateData;
                currentState.total = updateTotal;
            } else {
                currentState.data = [];
                currentState.total = 0;
            }
            localStorage.setItem('cart', JSON.stringify(currentState))
        },

        emptyCart(currentState) {
            currentState.data = [];
            currentState.total = 0;
            localStorage.removeItem('cart')
        },

        dbToCart(currentState, { payload }) {
            currentState.data = payload.data
            currentState.total = Number(payload.total);
            localStorage.setItem('cart', JSON.stringify(currentState))
        },

    }
});

export const { addToCart, emptyCart, lsToCart, changeQty, removeFormCart, dbToCart } = cartSlice.actions;
export default cartSlice.reducer;
