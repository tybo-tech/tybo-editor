import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private websiteService: WebsiteService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Name: '',
      Email: '',
      Password: '',
      UserType:'Admin',
      CreateDate: ''+new Date(),
      UserId: HelperClass.getId('user')

    })
  }
  submit(){
    console.log(this.form.getRawValue());
    this.websiteService.create('account/register', this.form.getRawValue()).subscribe(data=>{
      if(data){
        console.log(data);
        
      }
    })
  }
}
