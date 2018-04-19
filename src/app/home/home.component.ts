import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ToggleRegister = false;
  constructor() {  }

  ngOnInit() {
  }

  refistrToggle() {
    this.ToggleRegister = true;
  }
    cancelRegister(registerStatus: boolean) {
      this.ToggleRegister = registerStatus;
    }

}
