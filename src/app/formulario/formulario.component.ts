import { Component, OnInit } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { DataServices } from 'src/data.services';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  respuesta$: Observable<string> | undefined;
  respuesta: string="";
  loginForm= new FormGroup({
    emailInput: new FormControl('challenge@alkemy.org', Validators.required),
    passwordInput: new FormControl('', Validators.required)
  });
  show = true;
  constructor(private dataServices: DataServices,private router:Router) { 

  }

  ngOnInit(): void {
  }

  loguearse(){
    
    this.respuesta$ = this.dataServices.obtenerToken(this.loginForm.value.emailInput, this.loginForm.value.passwordInput);
    this.respuesta$.subscribe(
      token=> {
        localStorage.setItem('token', token);
        this.router.navigate(['home']);
      },
        error => this.respuesta= "Ingrese los datos correctamente"
      );

  }
  

}
