import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent {

  GENDER: string[] = [
    "Male","Female","Not Specified"
  ];

  isSpinning:boolean;
  validateForm: FormGroup;

  constructor(
    private service:AdminService,
    private fb:FormBuilder,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(): void{
    this.validateForm = this.fb.group({
      email: ['',Validators.required],
      name: ['',Validators.required],
      password: ['',Validators.required],
      checkPassword: ['',Validators.required, this.confirmationValidator],
      dob: ['',Validators.required],
      address: ['',Validators.required],
      gender: ['',Validators.required],
    })
  }

  confirmationValidator = (control:FormControl):{ [ s:string]:boolean} => {
    if(!control.value){
      return { required:true}
    }else if(control.value!== this.validateForm.controls["password"].value){
      return { confirm:true,error:true};
    }
    return {};
  }

  postUser(){
    console.log('post user componenet postuser: ',this.validateForm.value);
    this.isSpinning=true;
    this.service.addUser(this.validateForm.value).subscribe((res) => {
      this.isSpinning=false;
      if(res.id!=null){
        this.snackBar.open("User posted successfully","Close",{duration:5000})
      }else{
        this.snackBar.open("User already exist","Close",{duration:5000})
      }
      console.log('post user compoennet res: ',res);

    })
  }


}
