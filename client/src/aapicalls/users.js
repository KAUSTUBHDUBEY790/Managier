import { Apicalls } from "./apicalls";

export const Registeruser = async(payload)=>Apicalls("post","/api/users/register",payload);
export const Loginuser = async(payload)=>Apicalls("post","/api/users/login",payload);
export const GetloggedinUser = async()=>Apicalls("get","/api/users/loggedin-user");

