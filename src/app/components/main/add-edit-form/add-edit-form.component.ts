import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import Validation from '../check/validation';
import { ToastrService } from 'ngx-toastr';
import state from '../../../../assets/JSON/state.json';
import city from '../../../../assets/JSON/city.json';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-form',
  templateUrl: './add-edit-form.component.html',
  styleUrls: ['./add-edit-form.component.scss'],
})
export class AddEditFormComponent implements OnInit {
  Pagetype: any;
  FormData: any = [];
  allCities: any;
  states: any = [];
  cities: any = [];
  ListData: any = [];
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    DOB: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    country: new FormControl(),
    state: new FormControl(),
    city: new FormControl(),
    status: new FormControl(),
  });
  submitted = false;
  options: any = [
    { id: 1, value: 'pending', title: 'Pending' },
    { id: 1, value: 'approved', title: 'Approved' },
    { id: 1, value: 'rejected', title: 'Rejected' },
  ];
  StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  constructor(
    public route: Router,
    public activeRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public service: ToastrService
  ) {}
  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.Pagetype = params['type'];
      if (this.Pagetype == 'edit') {
let record=params['data']
this.ListData=JSON.parse(record)

        this.setValue(this.ListData)
      }
    });
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        DOB: ['', Validators.required],
        status: ['', Validators.required],
        country: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
            Validators.pattern(this.StrongPasswordRegx),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')],
      }
    );
    this.states = state;
    this.allCities = city;
  }

  get formValid(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      let body: any = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone,
        DOB: this.form.value.DOB,
        password: this.form.value.password,
        confirmPassword: this.form.value.confirmPassword,
        status: this.form.value.status,
        address: [
          {
            country: this.form.value.country,
            state: this.form.value.state,
            city: this.form.value.city,
          },
        ],
      };

      console.log(body, 'body');
      body ? this.FormData?.push(body) : '';
      console.log(
        this.FormData,
        'this.form.value',
        JSON.stringify(this.FormData)
      );
      localStorage.setItem('listData', JSON.stringify(this.FormData));
      this.route.navigate(['/']);
      this.Pagetype == 'add'
        ? this.service.success('successfully Added ')
        : this.service.success('successfully Updated ');
    } else {
      console.log(this.form.value);
    }
  }

  SelectedState(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.cities = this.allCities[value];
  }
setValue(data:any){
let dataToEdit:any={
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    phone: data?.phone,
    DOB:data?.DOB,
    status:data?.status,
    country: data?.address?.[0].country,
    state:data?.address?.[0].state,
    city: data?.address?.[0]?.city,
     password: data?.password,
    confirmPassword: data?.confirmPassword,
  }
  this.form.patchValue(dataToEdit)

}
}
