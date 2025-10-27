import axios from "axios";
import { IUser } from "../types/type-interfaces";
import { BASE_URL } from "../constants/Values";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignUpService = async (user: IUser) => {
    let response = { status: "success", data: { message: '' } }
    await axios.post(`${BASE_URL}/auth/signup`, {
        name: user.name,
        email: user.email,
        password: user.password,
        picture: user.picture
    }).then(async res => {
        if (res.status) {
            await AsyncStorage.setItem('user_info', JSON.stringify(res.data.user));
            response = { status: "success", data: res.data }
        }
    }).catch(error => {
        console.log(error)
        // console.log(error.response.data)
        response = { status: "error", data: error.response.data }
    })

    return response

}


export const WakeUpServer = async () => {
    let response = { status: "insleep", data: { message: "", html: '' } };

    try {
        const res = await axios.get(`${BASE_URL}`, {
            transformResponse: [(data) => data],
            timeout: 60000,
        });

        if (typeof res.data === "string" && res.data.includes("<html")) {
            response = { status: "waking", data: { message: "Server waking up...", html: res.data } };
        }
        else if (res.status === 200) {
            response = { status: "awake", data: res.data };
        }
    } catch (error: any) {
        // handle connection or other errors gracefully
        if (error.response && typeof error.response.data === "string" && error.response.data.includes("<html")) {
            response = { status: "waking", data: { message: "Server initializing...", html: error.response.data } };
        } else {
            response = {
                status: "error",
                data: { message: error.message, ...(error.response?.data && { details: error.response.data }) },
            };
        }
    }

    return response;
};


export const SignInService = async (user: any) => {
    let response = { status: "success", data: { message: '' } }
    await axios.post(`${BASE_URL}/auth/signin`, {
        email: user.email,
        password: user.password,
    }).then(async res => {
        if (res.status) {
            await AsyncStorage.setItem('user_info', JSON.stringify(res.data.user));
            response = { status: "success", data: res.data }
        }
    }).catch(error => {
        console.log(error)
        // console.log(error.response.data)
        response = { status: "error", data: error.response.data }
    })

    return response

}