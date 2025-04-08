import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from '../helpers/AxiosInstance';

const initialState = {
    user: null,
    token: null,
    reToken: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
};

//Thunk để thực hiện đăng nhập
export const Login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await AxiosInstance().post('/users/login', { email, password });

            if (res.accessToken) {
                return res; // res chứa accessToken, refreshToken, user
            } else {
                return rejectWithValue({ message: res.message || "Đăng nhập thất bại" });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue({ message: error.response.data.message });
            }
            return rejectWithValue({ message: "Có lỗi xảy ra khi đăng nhập." });
        }
    }
);

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    //nội bộ
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.reToken = null;
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.errorMessage = "";
        },
    },
    //bên ngoài app
    extraReducers: (builder) => {
        builder
        .addCase(Login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(Login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.reToken = action.payload.refreshToken;
            state.errorMessage = "";
        })
        .addCase(Login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.payload.message;
            state.user = null;
        })
    },
});
export const {logout} = AuthSlice.actions;
export default AuthSlice.reducer;