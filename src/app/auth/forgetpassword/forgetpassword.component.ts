import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  forgetPasswordForm!: UntypedFormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.valid) {
      const formData = this.forgetPasswordForm.value;

      if(formData.password === formData.confirmPassword){
        this.authService.getUserByEmail(formData.email).subscribe((response)=>{
          if(response.exists){
            this.authService.resetPassword({
              username: formData.email,
              newPassword: formData.password,
              resetToken: '2uQXTRJ6YzupWu7GNzTAg2C7fLW3EH7s'
            }).subscribe((res)=>{
              console.log(res);
            })
          }else{
            console.log('user Not Found');
          }
        });
      }else{
        console.log('Pssword and COnfrim are not same');
      }

      // Call your authService method for password reset here
      // this.authService.resetPassword(formData.email, formData.password).subscribe(
      //   (response: any) => {
      //     // Handle success
      //   },
      //   (error: any) => {
      //     // Handle error
      //   }
      // );
    } else {
      // Handle invalid form data
    }
  }
}
