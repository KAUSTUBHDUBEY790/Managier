import { Form, Input, Modal, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../redux/loadersReducer';
import { CreateProject, EditProject } from '../../aapicalls/projects';

function Projectform({show,setShow,reloadData,project}) {
  const dispach = useDispatch();
  const user = useSelector((state)=>state.users)
    const formref = useRef(null);
    const onFinish = async(value)=>{
            try {
              dispach(SetLoading(true));
              let response =null;
              if(project)
              {
                value._id = project._id;
                response = await EditProject(value);
              }
              else{
                  value.owner = user.user._id;
                  value.members = [
                    {
                    user: user.user._id,
                    role: "owner"
                  },];      
                  response = await CreateProject(value); 
                }

                if(response)
                {
                  message.success(response.message);
                  reloadData();
                  setShow(false);
                }
                else{
                  throw new Error(response.error)
                }
                dispach(SetLoading(false))   
              
            } catch (error) {
              dispach(SetLoading(false));
              message.error(error.message);
              
            }
    }
  return (
    <Modal title={project?"Edit Project":"Add Project"} open={show} onCancel={()=>setShow(false)} centered width={700} onOk={()=>formref.current.submit()} okText="save">
         <Form
        layout="vertical"
        ref={formref}
        onFinish={onFinish}
        initialValues={project}
      >
        <Form.Item label="Project Name" name="name">
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item label="Project Description" name="description">
          <TextArea placeholder="Project Description"/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Projectform