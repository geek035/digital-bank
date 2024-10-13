import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.scss']
})
export class DialogRegistrationComponent implements OnInit {

  constructor(
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    this._router.navigate(['/logging']);
  }

}
