/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */

import {Component, OnInit} from 'angular2/core';
import {Hero} from "../../models/hero";
import {HeroService} from "../../services/hero.service";
import { Router } from 'angular2/router';

@Component({
    selector: 'my-dashboard',
    templateUrl: './app/components/dashboard/dashboard.component.html',
    styleUrls:['./app/components/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {

    heroes: Hero[] = []; // variable heroes es un arreglo de la clase Hero (haremos binding con la vista enviando esta variable )

    constructor(private router: Router,private heroService: HeroService) {

    }
     
    /*  Al iniciar la Clase llama a este metodo el que llama al servicio que consume la API
     *  retornando todos los heroes guardandolo en el atributo heroes (this.heroes) de la clase
     */  
    ngOnInit() {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes);
    }

    /*  Recibe un objeto de la clase Hero para luego ir a la ruta de nombre HeroDetail @RouteConfig con el id 
     *  correspondiente
     */
    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero._id }];
        this.router.navigate(link);
    }
}