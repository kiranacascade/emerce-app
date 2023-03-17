import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    data: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoggedIn : (state, action) => {
            if (state.status !== 'success') {
                state.status = action.payload.status;
                state.data = {...action.payload.data};
              };
        }
    }

})

export const { setLoggedIn } = userSlice.actions

export default userSlice.reducer