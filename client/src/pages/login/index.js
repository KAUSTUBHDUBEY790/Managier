import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import Divider from '../../component/divider';
import Clock from './assets/clock.png'
import { Loginuser } from '../../aapicalls/users';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../redux/loadersReducer';

function Login() {
  const navigate = useNavigate();
  const dispach = useDispatch();
  const {loading} = useSelector((state)=>state.loaders);
  useEffect(()=>{
    if(localStorage.getItem("token")){
        navigate("/");
    }
  },[])
const onFinish= async (value)=>{
  try {
    dispach(SetLoading(true));
    const User = await Loginuser(value);
    dispach(SetLoading(false));
    if(User.success){
      localStorage.setItem("token",User.data);
        message.success(User.message);
        window.location.href = '/';
    }
    else{
      throw new Error(User.message);
    }
  } catch (error) {
    dispach(SetLoading(false));
    message.error(error.message);
    
  }
  console.log(value);
}

  return (
    <div className='grid grid-cols-2'>
      <div className='bg-primary h-screen flex justify-center items-center'>
        <div className='w-[400px] flex justify-center flex-col item-center'>
        <img src={Clock} className='w-[200px] mb-5' alt='Hello'></img>
        <h1>Managier</h1>
        <Divider/>
        <span>All your problems solved here.</span>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <div className='w-[400px]'>
        <h1 className='text-2xl'>Login to account</h1>
        <Divider/>
        <Form layout='vertical mt-5' onFinish={onFinish}>
        <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Button type='primary' htmlType='submit' block loading={loading}>{loading?"Loading":"Log in"}</Button>
    <div className='justify-center mt-5'>
      <span>
        Don't have an account? <Link to="/register">Register</Link>
      </span>


    </div>
        </Form>
        </div>
      </div>

    </div>
  )
}

export default Login