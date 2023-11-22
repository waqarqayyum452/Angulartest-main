import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    const password = this.signUpForm.get('password')?.value;
    const confirmPassword = this.signUpForm.get('confirmPassword')?.value;
    const email = this.signUpForm.get('email');

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (this.signUpForm.valid && email && email.invalid) {
      alert('Please provide a valid email address.');
      return;
    }

    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;

      this.authService.signUp(formData).subscribe(
        () => {
          alert('Signup Successful!');
          this.signUpForm.reset();
          this.router.navigate(['/signin']);
        },
        (error) => {
          console.error('Signup Error:', error);
        }
      );
    } else {
      alert('Please fill in all the fields.');
    }
  }
}
