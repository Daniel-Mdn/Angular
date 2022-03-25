import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { observable, Observable, tap } from 'rxjs';
import { HeroesI } from '../modelos/heroes.interface';
import { searchI } from '../modelos/search.interface';
import { HeroesServices } from './heroes.services';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  widthGrid:number=4;
  listHeroes$: Observable<searchI>= new Observable;
  listHeroes =new Array<HeroesI>();
  search:string = "";
  rows=new Array<number>();
  cols=new Array<HeroesI[]>();
  isImageLoading:boolean=true;
  imageToShow: any;

  // @Input() name:string='';


  constructor(public heroesServices: HeroesServices) { }

  @Output() heroes=new EventEmitter<HeroesI[]>();
  ngOnInit(): void {
  }

  // mostrarHeroes(){
  //   this.listaHeroes$=this.heroesServices.getHeroes();
  //   this.listaHeroes$.subscribe(      
  //     heroes=>{
  //     console.log(heroes);
  //     this.listaHeroes= this.listaHeroes?.concat(heroes);
  //     console.log(this.listaHeroes);
  //   },
  //   error=>{
  //     console.log("error");
  //     console.log(error);
  //   })

  // }

  searchHero(event: Event){
    this.listHeroes=[];
    this.rows=[];
    this.cols=[];
    this.search= (<HTMLInputElement>event.target).value;
    this.listHeroes$=this.heroesServices.buscarHeroe(this.search);
    this.listHeroes$.subscribe(      
      heroes=>{
      // console.log(heroes);
      this.listHeroes= this.listHeroes?.concat(this.getResults(heroes));
      // console.log("this.listHeroes");
      // console.log(this.listHeroes);
      this.rows=this.rows.concat(this.getRows(this.listHeroes));
      if (this.rows.length!=0){
        this.rows.forEach(element => {
          this.cols.push(this.getCols(this.listHeroes, element-this.widthGrid,element));
        });
        if (!this.newRow(this.listHeroes.length)){
          this.cols.push(this.getCols(this.listHeroes, this.listHeroes.length-this.listHeroes.length%4, this.listHeroes.length));
        }
      }else{
        this.cols.push(this.getCols(this.listHeroes, 0, this.listHeroes.length));
      }
      console.log("cols");
      console.log(this.cols);
    },
    error=>{
      console.log("error");
      console.log(error);
    })



  }
  getResults(search:searchI): HeroesI[]{
    return search.results
  }
  // getRowHero(list: HeroesI[]):HeroesI[]{
  //   let rowHero:HeroesI[]=[];
  //   let index=1;
  //   while (index<=list.length || !this.newRow(index)) {
  //     rowHero.push(list[index])

  //     index++;
  //   }
  //   return rowHero
  // }

  getRows(list: HeroesI[]):number[]{
    let arrayRow:number[]=[];
    for (let index= 1; index <= list.length; index++){
      if (this.newRow(index)){
        arrayRow.push(index);
      }
    }

    return arrayRow
  }

  newRow(i:number):boolean{
    return (i%this.widthGrid)==0
  }


  getCols(list: HeroesI[], inicio:number, fin:number):HeroesI[]{
    let col= new Array<HeroesI>();
    for (let j = inicio; j < fin; j++) {
    
      col.push(list[j]);
    }
    return col
  }

  createImageFromBlob(image: Blob){
    let reader= new FileReader();
    reader.addEventListener("load", () => {this.imageToShow=reader.result;
    }, false);
    
    if (image){
      reader.readAsDataURL(image)
    }
  }
  getImageFromApi(urlImage: string){
    this.isImageLoading = true;
    this.heroesServices.getImage(urlImage).subscribe(data=> {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error=> {
      this.isImageLoading = false;
      console.log(error);
    });
  }
}

