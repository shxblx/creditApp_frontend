import userRoutes from "../endpoints/userEndPoints";
import Api from "./axiosConfig";

export const signup = async (data: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const response = await Api.post(userRoutes.signup, data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
      return error.response;
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await Api.post(userRoutes.login, data);
    return response;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response);
      return error.response;
    } else {
      console.error("Error", error.message);
    }
    throw error;
  }
};
