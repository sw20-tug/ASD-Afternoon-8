import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../service/recipe-service.service';
import { Recipe }  from '../model/recipe';


@Component({
 selector: 'app-user-form',
 templateUrl: './recipe-form.component.html',
 styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {

 recipe: Recipe;

 constructor(
   private route: ActivatedRoute,
     private router: Router,
       private recipeService: RecipeService) {
   this.recipe = new Recipe();
 }

 onSubmit() {
   this.recipeService.save(this.recipe).subscribe(result => this.gotoUserList());
 }

 gotoUserList() {
   this.router.navigate(['/demo/all']);
 }
}
