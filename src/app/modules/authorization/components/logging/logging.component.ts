import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { loginValidator } from 'src/app/core/validators/logging.validator';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {
  public formGroup: FormGroup = new FormGroup({
    "username": new FormControl(null, [
      Validators.required,
      loginValidator(),
    ]),
    "password": new FormControl(null, [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      
    }
  }

  get _username(): AbstractControl {
    return this.formGroup.get('username') as AbstractControl;
  }

  get _password(): AbstractControl {
    return this.formGroup.get('password') as AbstractControl;
  }

}
