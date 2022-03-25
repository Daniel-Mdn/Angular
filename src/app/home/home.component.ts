import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServices } from 'src/data.services';
import { HeroesI } from '../modelos/heroes.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token= localStorage.getItem('token');
  listaHeroes:HeroesI[] |undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!this.token){
      this.router.navigate(['']);
    }
  }
  
  heroes(heroes:HeroesI[]){
    this.listaHeroes=heroes;
  }
}
