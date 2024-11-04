import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"
//register api
export const registerAPI = async (reqBody)=>{
    return await  commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}
//login
export const loginAPI = async (reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}
//add project
export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add_project`,reqBody,reqHeader)
}
//get all projects
export const getAllProjectsAPI = async (searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get_all_projects?search=${searchKey}`,"",reqHeader)
}
//get user projects
export const getUserProjectsAPI = async (reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get_user_projects`,"",reqHeader)
}
//get home projects
export const getHomeProjectsAPI = async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/get_home_projects`,"")
}
//edit project
export const editProjectAPI = async (projectId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit_project/${projectId}`,reqBody,reqHeader)
}
//remove project
export const removeProjectAPI = async (projectId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove_project/${projectId}`,{},reqHeader)
}
//edit user
export const updateUserAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit_user`,reqBody,reqHeader)
}