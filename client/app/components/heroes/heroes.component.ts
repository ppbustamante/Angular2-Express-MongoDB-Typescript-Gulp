/**
 * Created by Moiz.Kachwala on 02-06-2016.
 */
import {Component, OnInit} from 'angular2/core';
import {HeroService} from "../../services/hero.service";
import {Hero} from "../../models/hero";
import {HeroDetailComponent} from "../heroDetail/hero-detail.component";
import { Router } from 'angular2/router';

@Component({
    selector: 'my-heroes',
    templateUrl: './app/components/heroes/heroes.component.html',
    styleUrls: ['./app/components/heroes/heroes.component.css'],
    providers:[HeroService],
    directives:[HeroDetailComponent]
})

export class HeroesComponent implements OnInit {

    heroes: Hero[];
    selectedHero: Hero;
    error: any;

    constructor(private router: Router, private heroService: HeroService) { 
        
    }

    getHeroes() {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit() {
        this.getHeroes();
    }
    // guarda el heroe seleccionado en el atributo selectedHero
    onSelect(hero: Hero) { 
        this.selectedHero = hero; 
    }

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero._id }]);
    }

    addHero() {
        this.selectedHero = null;
        this.router.navigate(['HeroDetail', { id: 'new' }]);
    }

    deleteHero(hero: Hero, event: any) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            })
            .catch(error => this.error = error);
    }
}
