import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        totalPrice: null,
        currency: null,
        items: [],
        loading: false,
        error: null,
    },

    reducers: {

        setCart: (state, action) => {
            state.items = action.payload.items;
            state.totalPrice = action.payload.totalPrice;
            state.currency = action.payload.currency;
        },

        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        incrementCartItemQuantityByOne: (state, action) => {
            const { productId, variantId } = action.payload;
            state.items = state.items.map(item => {
                if(item.product._id === productId && item.variant === variantId){
                    return {...item, quantity: item.quantity + 1}
                }else{
                    return item
                }
            })
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },

    },
});

export const { setCart, addItem, incrementCartItemQuantityByOne, setLoading, setError } = cartSlice.actions;

export default cartSlice.reducer;