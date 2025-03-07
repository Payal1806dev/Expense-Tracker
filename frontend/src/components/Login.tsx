import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { LoginAction } from "../stateManagement/actions/authAction";
import { IUserAuthData } from "../interfaces/authInterface";
import "./Login.css";

type FormValues = {
  id: number;
  email: string;
  token: string;
  password: string;
  first_name: string;
};

const Login: React.FC = () => {
  const clientId =
    "763033723945-4jf16tnnn3ta5p82k0auh75o1n5o09du.apps.googleusercontent.com";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/admin-login",
        {
          email: data.email,
          password: data.password,
        }
      );
      if (response.data) {
        const user: IUserAuthData = {
          id: response.data.data.id,
          email: response.data.data.email,
          token: response.data.data.token,
          first_name: response.data.data.first_name,
        };
        console.log("Server Response:", user);
        dispatch(LoginAction(user));
        console.log("Login successful:", response.data);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Backend error:", error.response.data);
      }
    }
  };

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          token: credentialResponse.credential,
        }
      );
      dispatch(LoginAction(res.data.token));
      console.log("Google login successful:", res.data);
    } catch (error: any) {
      console.error("Google login failed:", error);
      if (error.response) {
        console.error("Backend error:", error.response.data);
      }
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Login</button>
        <div className="google-login-container">
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => console.log("Google sign-in failed")}
            />
          </GoogleOAuthProvider>
        </div>
      </form>
    </div>
  );
};

export default Login;
