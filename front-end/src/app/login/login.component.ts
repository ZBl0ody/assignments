import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private userServ: UserService, private router: Router) {}
  errmsg: string = '';

  ngOnInit(): void {}

  onlogin(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.userServ
      .login(formData.value.userEmail, formData.value.userPassword)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          console.log(err);

          this.errmsg = err.error.msg;
        },
      });
  }
}
