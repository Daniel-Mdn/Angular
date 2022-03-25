import { HeroesI } from "./heroes.interface";

export interface searchI{
    response:string;
    'result-for': string;
    results: HeroesI[];
}
