import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  username = "";
  password = "";

  login() {
    console.log(this.username);
    console.log(this.password);
  }

}
