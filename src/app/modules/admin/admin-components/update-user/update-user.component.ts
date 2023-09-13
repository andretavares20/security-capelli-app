import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  userId:number=this.activatedRoute.snapshot.params['userId']
  validateForm: FormGroup;
  isSpinning:boolean;

  GENDER: string[] = [
    "Male","Female","Not Specified"
  ];

  constructor(private service: AdminService,
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder,
    private snackBar:MatSnackBar){}

    ngOnInit(){

      this.validateForm = this.fb.group({
        email: ['',Validators.required],
        name: ['',Validators.required],
        dob: ['',Validators.required],
        address: ['',Validators.required],
        gender: ['',Validators.required],
      })

      this.getUserById();
    }

    getUserById(){
      this.service.getUserById(this.userId).subscribe((res) => {
        const user = res.userDto;
        this.validateForm.patchValue(user);
        console.log('update user componenet getuserbyid: ',res);
      })
    }

    updateUser(){
      this.service.updateUser(this.userId,this.validateForm.value).subscribe(
        (res) => {
          console.log('update user componenet updateUser: ',res);
          if(res.id!=null){
            this.snackBar.open("User updated successfully.","Close",{duration:5000})
          }else{
            this.snackBar.open("User not found","Close",{duration:5000})
          }
        }
      )
    }

}
