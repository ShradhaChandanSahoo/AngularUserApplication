import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit,PipeTransform, Pipe, Directive } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';
import * as $ from 'jquery';
 import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : any;
  user : any;
  message : any;
  buttontext:string="Save";
  searchValue:String;
  
  reverse: boolean = false;
  order: string = '';
  prekeyname: string = '';

  constructor(private userService : UserService,private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    //initialize JSON object with defaults
    this.user = new User()
    this.getAllUsers();
  }

  setOrder(value: string) {
    debugger;
        if (this.order === value) {
          this.reverse = !this.reverse;
        }
  
        this.order = value;
      }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (data:any) => {
        debugger;
        this.users = data.content;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

   // on click submit button
   createUser() {
    
    this.userService.createUser(this.user).subscribe(
      (data) => {
        this.buttontext="Save";
        this.message = data;
        this.user = new User();
        this.getAllUsers();
      },
      (error) => {
        console.log(error);
      }
    );

    
  }

  deleteUser(id: number) {
    if (confirm('Do you want to delete :' + id)) {
      this.userService.deleteUser(id).subscribe(
        (data) => {
          this.message = data;
          //re load new data
          this.getAllUsers();
        },
        (error) => {
          console.log(error);
        }
      );
      //console.log('Deleted' + id);
    } else {
      this.message = 'Delete Operation is Cancelled';
      //console.log('Deleted cancelled :' + id);
    }
}

editUser(id:number){
  debugger;
  this.buttontext="Update";
  this.userService.editUserDetail(id).subscribe((data:any)=>{
    this.user=data;
  },(err)=>{
    console.log(err)
  })
}

getSearchUsers(keyword:String){
  this.userService.getSearchUsers(keyword).subscribe(
    (data:any) => {
      debugger;
      this.users = data.content;
      console.log(data);
    },
    (error) => {
      console.log(error);
    }
  );
}

}
