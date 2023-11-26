import { Avatar, Badge, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { GetloggedinUser } from '../aapicalls/users';

import {useDispatch, useSelector} from "react-redux";
import { SetUser } from '../redux/userReducer';
import { SetLoading } from '../redux/loadersReducer';

function Protectedpages({children}) {
    const navigate = useNavigate();
    const dispach = useDispatch();
    const user = useSelector((state)=>state.users);
    console.log(user)
    
    const getuser = async()=>{
        try {
            dispach(SetLoading(true))
            const response = await GetloggedinUser();
            dispach(SetLoading(false))
            if(response.success)
            {
                dispach(SetUser(response.data));
            }    
            else{
                throw new Error(response.message)
            }       
            
        } catch (error) {
            SetLoading(true);
            message.error(error.message);
            localStorage.removeItem("token");
            navigate("/login")
            
        }
    
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
            getuser();
        }
        else{
            navigate("/login");
        }
    },[])
  return (
   user && (<div>
           <div className="flex justify-between items-center bg-primary text-white px-5 py-4">
          <h1 className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
            MANAGIER
          </h1>

          <div className="flex items-center bg-white px-5 py-2 rounded">
            <span
              className=" text-primary cursor-pointer mr-2"
              onClick={() => navigate("/profile")}
            >
              {user.user?.firstName}
            </span>
            <Badge
              className="cursor-pointer"
            >
              <Avatar
                shape="square"
                size="large"
                icon={
                  <i className="ri-notification-line text-white rounded-full" onClick={
                    ()=>{navigate("/profile");}
                  }></i>
                }
              />
            </Badge>

            <i
              className="ri-logout-box-r-line ml-10 text-primary cursor-pointer"
              onClick={()=>{
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        <div className='px-5 py-3'>{children}</div>
    </div>)
  )
}

export default Protectedpages