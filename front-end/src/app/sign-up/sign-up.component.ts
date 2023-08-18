import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private userServ: UserService) {}

  ngOnInit(): void {}
  onSignUp(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.userServ
      .signUp(
        formData.value.userEmail,
        formData.value.userPassword,
        formData.value.userName
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
  }
}
