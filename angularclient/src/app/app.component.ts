import { Component, OnInit } from '@angular/core';
import { Recipe } from './model/recipe';
import { RecipeService } from './service/recipe-service.service';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  recipes: Recipe[];

  title: string;

  constructor(private recipeService: RecipeService) {
    this.title = 'Cook Application';
  }

  ngOnInit() {
    this.recipeService.findAll().subscribe(data => {
      this.recipes = data;
    });
  }
}
