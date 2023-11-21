import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  rocketUrl = 'assets/images/rocket.svg';
  moonUrl = 'assets/images/moon.svg';
  currentYear = new Date().getFullYear();
  languages = ['English', 'French', 'Spanish'];
  passwordRegex = '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,}$';
  emailRegex = '^([a-zA-Z0-9._]+)@([a-zA-Z0-9._-]+)[.]{1}([a-zA-Z]{2,})$';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)])
  });

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  navigateToDashboard(): void {
    this.router.navigate(['dashboard']);
  }

  navigateToPrivacyPage(): void {
  }

  navigateToTermsAndConditionsPage(): void {
  }

  markAsTouched2(control: string): void {
    this.loginForm.get(control)?.markAsTouched();
  }
}
