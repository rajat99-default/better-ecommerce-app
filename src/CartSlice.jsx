import { nanoid } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { useDispatch } from 'react-redux';

// import { useSelector } from 'react-redux';

const initialState = {
    cart: [],
    cart2: [],

    userID: null,
    userNAME:null,
    userPASSWORD:null,
    userROLE:null,
    userITEMS:[],
}
const CartSlice = createSlice({
    name: "mycart",
    initialState: initialState,
    reducers: {

        
        setUser: (state, action) => {
            const { userID, username, password, role ,items} = action.payload;
            
            state.userID = userID;
            state.userNAME = username;
            state.userPASSWORD = password;
            state.userROLE = role;
            state.userITEMS = items;
            
            
            
        },

        
        
        
        addBicycleToCart: (state, action) => {
            const { id, name, price, image, type } = action.payload;
            
            // Check if the user is logged in
            if (!state.userID) {
                alert("Please log in to add items to your cart.");
                return; // Exit the function if the user is not logged in
            }
        
            const existingProduct = state.cart.find((item) => item.id === id);
            if (existingProduct) {
                alert("Product already added!");
            } else {
                
                state.cart.push({ id, name, price, image, type, qnty: 1 });
                // Get the user data from the state
                const { userID, userNAME, userPASSWORD, userROLE } = state;
                
                // Construct the API endpoint for the specific user
                const endpoint = `http://localhost:4000/users/${userID}`;
                
                // Create the payload to send to the backend
                const userData = {id: userID,username: userNAME,password: userPASSWORD,role: userROLE,items: state.cart
                };
                
                // Send the updated user data to the backend API
                axios.put(endpoint, userData)
                .then(response => {
                    // Handle response if needed
                })
                .catch(error => {
                    // Handle error if needed
                });
            }
        },

        addAccessoryToCart: (state, action) => {
            const { id1, name1, price1, image1, type1 } = action.payload;
        
            // Check if the user is logged in
            if (!state.userID) {
                alert("Please log in to add items to your cart.");
                return; // Exit the function if the user is not logged in
            }
        
            const existingProduct = state.cart2.find((item) => item.id1 === id1);
            if (existingProduct) {
                alert("Product already added!");
            } else {
                state.cart2.push({ id1, name1, price1, image1, type1, qnty1: 1 });
                // Get the user data from the state
                const { userID, userNAME, userPASSWORD, userROLE } = state;
        
                // Construct the API endpoint for the specific user
                const endpoint = `http://localhost:4000/users/${userID}`;

                console.log(state.cart2)
        
                // Create the payload to send to the backend
                const userData = {
                    id: userID,
                    username: userNAME,
                    password: userPASSWORD,
                    role: userROLE,
                    items: state.cart2
                };
        
                // Send the updated user data to the backend API
                axios.put(endpoint, userData)
                    .then(response => {
                        // Handle response if needed
                    })
                    .catch(error => {
                        // Handle error if needed
                    });
            }
        },



        addQTY: (state, action) => {
            let id = action.payload.id;

            for (var i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id == id) {
                    state.cart[i].qnty++;
                }
            }

        },
        removeQTY: (state, action) => {
            let id = action.payload.id;

            for (var i = 0; i < state.cart.length; i++) {
                if (state.cart[i].id == id) {
                    if (state.cart[i].qnty <= 1) {
                        alert("atlest one product necessary!!");
                    }
                    else {
                        state.cart[i].qnty--;
                    }
                }
            }

        },

        removeItem: (state, action) => {
            state.cart = state.cart.filter((item) => item.id != action.payload);
        },

        cartEmpty: (state) => {
            state.cart = [];
        }
    }
});

export const { getItemsFromUser,addItemsInUser, addAccessoryToCart, addBicycleToCart, addQTY, removeQTY, removeItem, cartEmpty, setUser } = CartSlice.actions;
export default CartSlice.reducer;