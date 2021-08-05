import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersManagementService {
  
  baseUrl = environment.URL_USER_MANAGEMENT_BACKEND.URL;
  action_user_list = environment.URL_USER_MANAGEMENT_BACKEND.ACTIONS.GET_USER_LIST;
  action_get_user = environment.URL_USER_MANAGEMENT_BACKEND.ACTIONS.GET_USER_ID; 
  action_get_user_by_name = environment.URL_USER_MANAGEMENT_BACKEND.ACTIONS.GET_USER_BY_NAME;
  action_create_user = environment.URL_USER_MANAGEMENT_BACKEND.ACTIONS.CREATE_USER;
  action_update_user = environment.URL_USER_MANAGEMENT_BACKEND.ACTIONS.UPDATE_USER;
  get_rol_list = environment.URL_USER_MANAGEMENT_BACKEND.ACTIONS.ROL_LIST;
  delete_User = environment.URL_USER_MANAGEMENT_BACKEND.ACTIONS.DELETE_USER;


  

  
  
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get(this.baseUrl + this.action_user_list);
  }

  getUserById(id:number) {
    return this.http.get(this.baseUrl + this.action_get_user+id);
  }

  getUserByName(name:string) {
    return this.http.get(this.baseUrl + this.action_get_user_by_name+name);
  }

  createUser(user:any) {
    return this.http.post(this.baseUrl + this.action_create_user,user);
  }

  updateUser(user:any) {
    return this.http.post(this.baseUrl + this.action_update_user,user);
  }

  
  getRolList() {
    return this.http.get(this.baseUrl + this.get_rol_list);
  }

  deleteUser(user:any) {
    return this.http.post(this.baseUrl + this.delete_User,user);
  }


}
