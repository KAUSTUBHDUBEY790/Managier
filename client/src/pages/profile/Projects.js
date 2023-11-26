import { Button, Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import Projectform from './Projectform';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../redux/loadersReducer';
import { DeleteProject, GetAllProjects } from '../../aapicalls/projects';
import { getDateFormat } from '../../utils/helper';

function Projects() {
    const [selectedproject,setSelectedProject] = useState(null);
    const [show,setShow] = useState(false);
    const [project,setProject] = useState([]);
    const user = useSelector((state)=>state.users);
    const dispach = useDispatch();

    const getdata = async()=>{
      try {
        dispach(SetLoading(true));
        const response = await GetAllProjects();
        dispach(SetLoading(false));
        if (response.success) {
          setProject(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        dispach(SetLoading(false));
        message.error(error.message);
      }
    };
    const onDelete = async (id) => {
        try {
          dispach(SetLoading(true));
          const response = await DeleteProject(id);
          if (response.success) {
            message.success(response.message);
            getdata();
          } else {
            throw new Error(response.error);
          }
          dispach(SetLoading(false));
        } catch (error) {
          message.error(error.message);
          dispach(SetLoading(false));
        }
      }
    useEffect(()=>{
      getdata()
    },[])

    const column = [{
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Description",
        dataIndex: "description",
    },
    {
        title: "Status",
        dataIndex: "status",
    },
    {
        title: "Created At",
        dataIndex: "createdAt",
        render: (text)=>getDateFormat(text),
    },
    {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
          return (
            <div className="flex gap-4">
              
              <i
                className="ri-pencil-line cursor-pointer"
                onClick={() => {
                  setSelectedProject(record);
                  setShow(true);
                }}
              ></i>
              <i class="ri-delete-bin-line cursor-pointer"
                onClick={() => {
                    onDelete(record._id)
                }}

              ></i>
            </div>
          );
        },
      },
]
    return (
        <div>
          <div className="flex justify-end">
            <Button
              type="default"
              onClick={()=>{
                setSelectedProject(null)
                setShow(true)}}
            >
              Add Project
            </Button>
          </div>
          <Table className="mt-4" columns={column} dataSource={project}/>
          {show && <Projectform show={show} setShow={setShow} reloadData={getdata} project={selectedproject}></Projectform>}
          
        </div>
      );
    }
    
    export default Projects;