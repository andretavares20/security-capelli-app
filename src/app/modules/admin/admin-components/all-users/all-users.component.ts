import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {

  users:any;

  constructor(private service: AdminService,
    private snackBar:MatSnackBar){}

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
    this.service.getAllUsers().subscribe((res) => {
      console.log('all users component getAllUsers: ',res);
      this.users=res;
    })
  }

  deleteUser(userId:number){
    this.service.deleteUser(userId).subscribe((res) => {
      console.log('all users component deleteUser: ',res);
      this.getAllUsers()
      this.snackBar.open("User deleted successfully","Close",{duration:5000})
    })

  }

}
