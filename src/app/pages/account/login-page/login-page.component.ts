import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {Router} from '@angular/router';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { Security } from 'src/app/utils/security.util';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  public form: FormGroup;
  public busy = false;

  constructor(
    private service: DataService,
    private fb: FormBuilder,
    private router: Router,
    ) { 
      this.form = this.fb.group({
        username: ['', Validators.compose([
          Validators.minLength(14),
          Validators.maxLength(14),
          Validators.required,
          CustomValidator.isCpf()
        ])],
        password: ['', Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(20),
          Validators.required
        ])]
      });
    }

  ngOnInit() {
    const token = Security.getToken();
    if(token){
      this.busy = true;
      this.service.
      refreshToken().
      subscribe(
        (data: any) =>{        
        this.setUser(data.customer, data.token);
        this.busy = false;
      },
      (err) =>{
        localStorage.clear();
        this.busy = false;
      }
      );
    }
  }

  submit(){
    this.busy = true;
    this.service.authenticate(this.form.value).subscribe(
      (data: any) =>{
      console.log(data);
      this.setUser(data.customer, data.token);
      this.busy = false;
    },
    (err) =>{
      console.log(err);
      this.busy = false;
    }
    );
  }

  setUser(user, token){
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}
