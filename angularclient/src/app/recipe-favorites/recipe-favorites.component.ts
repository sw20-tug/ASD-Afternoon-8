import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe-service.service';
//import { ConfirmDialogService } from '../service/recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
//import {  ConfirmDialog} from '../confirm-dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-recipe-favorites',
  templateUrl: './recipe-favorites.component.html',
  styleUrls: ['./recipe-favorites.component.css']
})
export class RecipeFavoritesComponent implements OnInit {

  recipes: Recipe[];

  constructor(public recipeService: RecipeService,
    // private confirmDialogService: ConfirmDialogService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.findFavorites().subscribe(data => {
      this.recipes = data;
    });
  }

}
