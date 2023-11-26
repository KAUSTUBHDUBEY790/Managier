import { Apicalls } from "./apicalls";


export const CreateProject = async (project) => Apicalls("post", "/api/projects/create-project", project);
export const GetAllProjects = async (userId) => Apicalls("post", "/api/projects/get-all-project", { userId });
export const EditProject = async (project) => Apicalls("post", "/api/projects/edit-project", project);
export const DeleteProject = async (id) => Apicalls("post", "/api/projects/delete-project", { _id: id });
export const GetProjectById = async (id) => Apicalls("post", "/api/projects/get-project-by-id", { _id: id });