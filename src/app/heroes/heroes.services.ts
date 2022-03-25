import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { catchError, observable, Observable } from 'rxjs';
import { HeroesI} from 'src/app/modelos/heroes.interface'
import { searchI } from '../modelos/search.interface';

@Injectable()
export class HeroesServices{
    constructor(private httpsClient: HttpClient){}
    params= new HttpParams();
    headers= new HttpHeaders();
    accessToken:string='10227816847035198';


    getHeroes():Observable<HeroesI[]>{
        this.params=this.params.append('access-token', '10227816847035198');
        this.params=this.params.append('name', 'n');
        const options= {
            params:this.params
        }
        // return this.httpsClient.get<HeroesI[]>('https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/access-token/search/name', options)
        return this.httpsClient.get<HeroesI[]>('https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/10227816847035198/1')
    }

    getImage(imageUrl: string):Observable<Blob>{
        // return this.httpsClient.get("https://cors-anywhere.herokuapp.com/"+imageUrl, {responseType:"blob"})
        return this.httpsClient.get("https://cors-anywhere.herokuapp.com/https://www.superherodb.com/pictures2/portraits/10/100/639.jpg" , {responseType:"blob"})
      }
    buscarHeroe(name:string):Observable<searchI>{
        return this.httpsClient.get<searchI>("https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/10227816847035198/search/"+name)
    }



}