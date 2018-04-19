import { AlertService } from './../../service/alert.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../service/Auth.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() OutputFormValue = new EventEmitter();
  user: User;
  registerReactiveForm: FormGroup;
  datepickerconfig: Partial<BsDatepickerConfig>;
  constructor(private auth: AuthService, private alertify: AlertService, private fb: FormBuilder , private router: Router) {}

  ngOnInit() {
// Form group method

    // this.registerReactiveForm = new FormGroup({
    //   gender: new FormControl('male', Validators.required),
    //   knownAs: new FormControl('', Validators.required),
    //   dateOfBirth: new FormControl(null, Validators.required),
    //   city: new FormControl('', Validators.required),
    //   country: new FormControl('', Validators.required),
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', Validators.required),
    // }, this.passwordMatchValidator);
    this.registerForm();
    this.datepickerconfig = {
      containerClass: 'theme-red'
    };
  }

  // form Builder method
  registerForm() {
    this.registerReactiveForm = this.fb.group(
      {
        gender: ['male', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        username: ['', Validators.required],
        password: [
            '', [Validators.required,
            Validators.minLength(4),
              Validators.maxLength(8)]
        ],
      confirmPassword: ['', Validators.required],
    }, {
      validator : this.passwordMatchValidator
    });
  }

  passwordMatchValidator(d: FormGroup) {
    return d.get('password').value === d.get('confirmPassword').value ? null : {'mismatch' : true};
  }
  Register() {
    if (this.registerReactiveForm.valid) {
      this.user = Object.assign({}, this.registerReactiveForm.value);
      this.auth.Register(this.user).subscribe(() => {
          this.alertify.success('registration successfull');
        }, error => {
          this.alertify.error(error);
        }, () => {
          this.auth.login(this.user).subscribe(() => {
            this.router.navigate(['/matches']);
          });
        });
    }
    // this.auth.Register(this.model).subscribe( () => {
    //   this.alertify.success('Logged in Successfully');
    // }, error => {
    //   this.alertify.error('registration failed :' + error);
    // });
  }
  cancelRegister() {
    this.OutputFormValue.emit(false);
  }
}
