import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { observable, Observable } from 'rxjs';

@Injectable()
export class DataServices{
    constructor(private httpsClient: HttpClient){}
    params= new HttpParams();
    
    registrarUsuario(datos: string[]){
        this.httpsClient.post("http://challenge-react.alkemy.org/", datos)
        .subscribe(
            response=> console.log(response),
            error => console.log("error " + error)
        );
    }
    obtenerToken(email: string, password: string): Observable<string>{
        this.params=this.params.append('email', email);
        this.params=this.params.append('password', password)
        
        return this.httpsClient.post("http://challenge-react.alkemy.org/", this.params, {responseType: "text"})
        // .subscribe(
        //     token=> token,
        //     error => console.log("Alerta")
        // );
    }

}