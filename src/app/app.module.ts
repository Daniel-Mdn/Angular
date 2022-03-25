import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataServices } from 'src/data.services';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { HomeComponent } from './home/home.component';
import { LoginService } from './formulario/login.services';
import { AlertaComponent } from './alerta/alerta.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesServices } from './heroes/heroes.services';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    CabeceraComponent,
    HomeComponent,
    AlertaComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [DataServices, LoginService, HeroesServices  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
