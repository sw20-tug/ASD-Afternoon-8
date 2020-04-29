import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

 import { Recipe } from '../model/recipe';
 import { RecipeService } from '../service/recipe-service.service';
 import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-filtering',
  templateUrl: './recipe-filtering.component.html',
  styleUrls: ['../recipe-list/recipe-list.component.css']
})
export class RecipeFilteringComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  private searchTerms = new Subject<string>();
  private kind: string;
  recipes: Recipe[];
  recipes_preptime: Number[] = new Array;
  recipes_preptime_2: Number[] = new Array;
  recipes_cooktime: Number[] = new Array;
  recipes_cooktime_2: Number[] = new Array;
  recipes_type: string[] = new Array;
  recipes_type_2: string[] = new Array;
  constructor(private recipeService: RecipeService, private router: Router) {}

  clickMethod(id: number): void {
    // sconst id = +this.route.snapshot.paramMap.get('id');
    alert(id);
  if (confirm('Are you sure to delete')) {
         this.recipeService.deleteById(id)
         .subscribe(() => this.refresh());
    }
  }
  save(id: number, title: string): void {
    this.recipeService.updateTitle(id, title)
         .subscribe(() => this.refresh());
  }

  // Push a search term into the observable stream.
  filter(term: string, kind: string): void {
    if (term === '') {
      this.refresh();
    }

    this.searchTerms.next(term);
    this.kind = kind;
  }

  displayPrepTime() {
    for (let i = 0; i < this.recipes.length; i++) {
      this.recipes_preptime.push(this.recipes[i].preparationtime);
    }
    this.recipes_preptime = this.recipes_preptime.sort((n1, n2) => {
      if (n1 < n2) {
        return -1;
      }
      if (n1 > n2) {
        return 1;
      }
      return 0;
    });
    this.recipes_preptime_2.push(this.recipes_preptime[0]);
      for (let i = 1; i < this.recipes_preptime.length; i++) {
        if (this.recipes_preptime[i] > this.recipes_preptime[i - 1]) {
          this.recipes_preptime_2.push(this.recipes_preptime[i]);
        }
      }
      delete this.recipes_preptime;
  }
  displayTyp() {
    for (let i = 0; i < this.recipes.length; i++) {
      this.recipes_type.push(this.recipes[i].type);
    }
    this.recipes_type = this.recipes_type.sort((n1, n2) => {
      if (n1 < n2) {
        return -1;
      }
      if (n1 > n2) {
        return 1;
      }
      return 0;
    });
    this.recipes_type_2.push(this.recipes_type[0]);
    for (let i = 1; i < this.recipes_type.length; i++) {
      if (this.recipes_type[i] !== this.recipes_type[i - 1]) {
        this.recipes_type_2.push(this.recipes_type[i]);
      }
    }
    delete this.recipes_type;
  }

  displayCookTime() {
    for (let i = 0; i < this.recipes.length; i++) {
      this.recipes_cooktime.push(this.recipes[i].cookingtime);
    }
    this.recipes_cooktime = this.recipes_cooktime.sort((n1, n2) => {
      if (n1 < n2) {
        return -1;
      }
      if (n1 > n2) {
        return 1;
      }
      return 0;
    });
    this.recipes_cooktime_2.push(this.recipes_cooktime[0]);
      for (let i = 1; i < this.recipes_cooktime.length; i++) {
        if (this.recipes_cooktime[i] > this.recipes_cooktime[i - 1]) {
          this.recipes_cooktime_2.push(this.recipes_cooktime[i]);
        }
      }
    delete this.recipes_preptime;
  }

  ngOnInit(): void {
    this.recipeService.findAll().subscribe(data => {
      this.recipes = data;
      this.displayPrepTime();
      this.displayTyp();
      this.displayCookTime();
    });

    this.recipes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.recipeService.filterTerm(term, this.kind)),
    );
  }
  refresh() {
    window.location.reload();
   }
}
