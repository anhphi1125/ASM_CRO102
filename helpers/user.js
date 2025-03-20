import { useState } from "react";
import AxiosInstance from "./AxiosInstance";

const userLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); //state lưu lỗi

    const login = async (email, password, onSuccess) => {
        try {
            setLoading(true);
            const res = await AxiosInstance().post('/users/login', {email, password});

            if(res.accessToken){
                console.log("Đăng nhập thành công!", res);
                onSuccess(res.accessToken);
            }else{
                setError(res.message || "Đăng nhập thất bại")
            }
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Có lỗi xảy ra khi đăng nhập.");
            }
        } finally {
            setLoading(false);
        }
    };

    const register = async (name, email, password, phone, onSuccess) => {
        try {
            setLoading(true);
            const res = await AxiosInstance().post('/users/register', {name, email, password, phone});

            if(res.message) {
                console.log("Đăng ký thành công");
                onSuccess(res.message);
            }else{
                setError(res.message || "Đăng ký thất bại")
            }
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError("Có lỗi xảy ra khi đăng ký.");
            }
        } finally {
            setLoading(false);
        }
    };

    return {login, loading, error, setError, register};
};

export default userLogin;