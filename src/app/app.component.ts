import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form: FormGroup;
  form2: FormGroup;
  formsubmitted: boolean;
  public resgender: string;
  public resday: string;
  public resmonth: string;
  public resyear: string;
  public reszipcode: string;
  public hash: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.resgender = "1"
    this.resmonth = "01";
    this.resyear = "01";
    this.reszipcode = "75";
    this.hash = "??";
    this.form = this.fb.group({
      gender: this.fb.control('', [Validators.required]),
      day: this.fb.control('01', [Validators.required, Validators.min(1), Validators.max(31)]),
      month: this.fb.control('01', [Validators.required, Validators.min(1), Validators.max(12)]),
      year: this.fb.control('75', [Validators.required, Validators.min(0), Validators.max(99)]),
      zipcode: this.fb.control('', [Validators.required]),
      corsica: this.fb.control(''),
    });

    this.form2 = this.fb.group({
      partOne: this.fb.control('', [Validators.required, Validators.min(1), Validators.max(999)]),
      partTwo: this.fb.control('', [Validators.required, Validators.min(1), Validators.max(999)]),
    });
  }


  clearSubmit() {
    this.form2.get('partOne').setValue('');
    this.form2.get('partTwo').setValue('');
    this.resgender = this.form.get('gender').value;
    this.resyear = ('0' + this.form.get('year').value).slice(-2);
    this.resmonth = ('0' + this.form.get('month').value).slice(-2);
    this.reszipcode = this.form.get('zipcode').value.substr(0, 2);
    if (this.reszipcode === '20') {
      if (this.form.get('corsica').value === 'A') {
        this.reszipcode = '19';
      }
      if (this.form.get('corsica').value === 'B') {
        this.reszipcode = '18';
      }
    }
    this.hash ='??';
  }

  calculateHash() {
    if(!this.lastPartsNotFilled()){
    let nir = 97 - Number(this.resgender + this.resyear + this.resmonth + this.reszipcode +
      ('00' + this.form2.get('partOne').value).slice(-3) + ('00' + this.form2.get('partTwo').value).slice(-3)) % 97;
    this.hash = ('0' + nir).slice(-2);
    }
  }

  lastPartsNotFilled(){
    if( ('00' + this.form2.get('partOne').value).slice(-3)==='' || ('00' + this.form2.get('partTwo').value).slice(-3)===''){
        return true;
    }
  }

}

