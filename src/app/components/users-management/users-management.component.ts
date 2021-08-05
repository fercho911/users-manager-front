import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersManagementService } from 'src/app/services/users-management.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent implements OnInit {
  userList: any[] = [];
  name = new FormControl('');
  title = 'Gestion de usuarios';
  
  btnSave:boolean = true;   
  btnEdit:boolean = true;  
  btnDelete:boolean = true;  



    userForm = new FormGroup({
    id_usuario: new FormControl(''),
    nombre: new FormControl('', Validators.required),
    id_rol: new FormControl('', Validators.required),
    activo: new FormControl('', Validators.required),
  });

  constructor(private userService: UsersManagementService) {}

  rolList: any[] = [];

  ngOnInit(): void {
    this.getUserList();
    this.getRolList();
  }

  getUserList() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.userList = response.userList;
    });
  }

  getUsersByname(name: string) {
    this.userService.getUserByName(name).subscribe((response: any) => {
      this.userList = response.userList;
    });
  }

  viewUserInfo(id: number) {
    this.userService.getUserById(id).subscribe((response: any) => {
      console.log(response.user.id_usuario);
      this.userForm.setValue({
        id_usuario: response.user.id_usuario,
        nombre: response.user.nombre,
        id_rol: response.user.rol.id_rol,
        activo: response.user.activo,
        
      });
      this.btnSave = true;
      this.btnEdit = false;
      this.btnDelete = false;
    });
  }

  findUsers() {
    console.log(this.name.value);

    if (this.name.value == null || this.name.value == '') {
      this.getUserList();
    } else {
      this.getUsersByname(this.name.value);
    }
  }
  clear() {
    this.name.setValue(null);
    this.clear2();
  }

  clear2() {
    this.name.setValue(null);

    this.userForm.setValue;
    this.userForm.setValue({
      id_usuario: null,
      nombre: null,
      id_rol: null,
      activo: null,
    });
  }

  createUser() {

    if (this.userForm.valid) {
    var user = {
      rol: {
        id_rol: this.userForm.controls['id_rol'].value,
      },

      nombre: this.userForm.controls['nombre'].value,
      activo: this.userForm.controls['activo'].value,
    };

    this.userService.createUser(user).subscribe((response: any) => {
      if (response.errorCode == '0') {
        this.clear2();
        this.getUserList();
        console.log(response);
        alert(response.messageError);
      }else{
        alert(response.messageError);
      }
    });

  }else{
    alert("todos los campos son obligatorios")
  }
  }

  updateUser() {
    if (this.userForm.valid) {
      var user = {
        id_usuario: this.userForm.controls['id_usuario'].value,
        rol: {
          id_rol: this.userForm.controls['id_rol'].value,
        },
        nombre: this.userForm.controls['nombre'].value,
        activo: this.userForm.controls['activo'].value,
      };

      this.userService.updateUser(user).subscribe((response: any) => {
        if (response.errorCode == '0') {
          this.clear2();
          this.getUserList();
          console.log(response.user);
          alert(response.messageError);
        }
      });
    }else{
      alert("todos los campos son obligatorios")
    }
  }

  getRolList() {
    this.userService.getRolList().subscribe((response: any) => {
      this.rolList = response.rolList;
    });
  }

  deleteUser() {
    console.log(this.userForm.controls['id_usuario'].value);

    if (this.userForm.controls['id_usuario'].value != null && this.userForm.controls['id_usuario'].value != "" ) {
      var user = {
        id_usuario: this.userForm.controls['id_usuario'].value,
        rol: {
          id_rol: this.userForm.controls['id_rol'].value,
        },
        nombre: this.userForm.controls['nombre'].value,
        activo: this.userForm.controls['activo'].value,
      };

      this.userService.deleteUser(user).subscribe((response: any) => {
        if (response.errorCode == '0') {
          this.clear2();
          this.getUserList();
          alert(response.messageError);
        }
      });
    }else{
      alert("no ha seleccionado registro para eliminar")
    }
  }

  enableBtnSave(){
    this.btnSave = false;
    this.btnEdit = true;
    this.btnDelete = true;  
    this.clear2();
  }

}
