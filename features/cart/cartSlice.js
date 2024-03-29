import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [{ id:1 , details:{} , quantity:1}],
  cartValue:0,
};

export const cartSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const tofinditem = state.cartItems.find(item => item.details.id === action.payload.id)
      if(tofinditem){
        tofinditem.quantity=tofinditem.quantity+1
      }
      else{
        const item = {
          id: nanoid(),
          details: action.payload,
          quantity:1,
        };
        state.cartItems.push(item);
      }
      if (action.payload.hasOwnProperty('finalprice')){
        state.cartValue= state.cartValue+action.payload.finalprice
      }
      else{
        state.cartValue= state.cartValue+action.payload.priceusd
      }
      
    },
    removeItem: (state, action) => {
      const removedItem = state.cartItems.find(item => item.id === action.payload);
      if (removedItem.quantity===1) {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
      else{
        removedItem.quantity-=1
      }
      if (removedItem.details.hasOwnProperty('finalprice')){
        state.cartValue= state.cartValue-removedItem.details.finalprice
      }
      else{
        state.cartValue= state.cartValue-removedItem.details.priceusd
      }
    },
    dropItem: (state,action)=>{
      const removedItem = state.cartItems.find(item => item.id === action.payload);
      state.cartValue -= removedItem.quantity*removedItem.details.priceusd
      state.cartItems= state.cartItems.filter(item => item.id !== action.payload)
    }
  },
});

export const { addItem, removeItem ,dropItem } = cartSlice.actions;
export default cartSlice.reducer;