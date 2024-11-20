import userRoutes from "../endpoints/userEndPoints";
import Api from "./axiosConfig";

export const signup = async (data: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    console.log(data);

    const response = await Api.post(userRoutes.signup, data);
    console.log(response);
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
