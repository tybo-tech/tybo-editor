import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperClass } from 'src/app/_classes/_statics/HelperClass';
import { WebsiteService } from 'src/app/_services/website.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: string;
  constructor(private formBuilder: FormBuilder, private websiteService: WebsiteService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Email: '',
      Password: ''
    })
  }
  submit(){
    this.websiteService.login('account/login.php', this.form.getRawValue()).subscribe(data=>{
      if(data){
        console.log(data);
        this.websiteService.updateUserState(data);
        this.router.navigate(['account/workspace'])
      }
    }, error=>{
      if(error.statusText === 'Unauthorized'){
        this.error = 'Incorrect logn details'
      }
      
    })
  }

}
