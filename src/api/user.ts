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

export const logout = async () => {
  try {
    const response = await Api.post(userRoutes.logout);
    return response;
  } catch (error: any) {
    console.error("Error", error.message);
    throw error;
  }
};

export const adminLogout = async () => {
  try {
    const response = await Api.post(userRoutes.adminLogout);
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
export const getLoan = async (data: {
  userId: string;
  fullName: string;
  loanAmount: string;
  loanTenure: string;
  employmentStatus: string;
  reasonForLoan: string;
  employmentAddress: string;
}) => {
  try {
    console.log(data);

    const response = await Api.post(userRoutes.applyLoan, data);
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

export const fetchLoan = async (userId: string) => {
  try {
    let url = `${userRoutes.fetchLoan}/${userId}`;
    const response = await Api.get(url);
    console.log(response);

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
