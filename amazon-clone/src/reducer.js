export const initialState = {
  cart: [],
  user: null,
};

// selector, to return total price in cart
export const getCartTotal = (cart) =>
  cart?.reduce((total, item) => item.price + total, 0);

//
const reducer = (state, action) => {
  // console.log(action); // for debugging
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART":
      // remove only 1 instance of the item in the cart
      // find the first index of the item with the id
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.cart];
      // delete that item
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          "Cannot remove product (id: ${action.id}) as it is not in cart"
        );
      }
      return {
        ...state,
        cart: newCart,
      };

    default:
      return state;
  }
};

export default reducer;
