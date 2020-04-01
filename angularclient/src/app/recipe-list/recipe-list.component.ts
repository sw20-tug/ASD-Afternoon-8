import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe-service.service';
import { ConfirmDialogService } from '../service/recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  ConfirmDialogModule } from '../app.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];
  delete: Number;

  constructor(public recipeService: RecipeService,
              private router: Router,
              private confirmDialogService: ConfirmDialogService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.findAll().subscribe(data => {
      this.recipes = data;
    });
  }

  save(): void {
    const id = +this.route.snapshot.paramMap.get('id');
     this.recipeService.updateRecipe(id, this.recipes)
       .subscribe(() => this.gotoUserList());
   }

   gotoUserList() {
     this.router.navigate(['/recipelist']);
   }

  deleteRecipe(id): void {
    // alert(this.delete);
    this.confirmDialogService.confirmThis('Are you sure to delete?', function () {
        this.recipeService.deleteById(id).subscribe(response => {
      console.log('Delete record #' + id);
      window.location.reload();
    });
    }, function () {
        // this.delete = 1;
    });
    // alert(this.delete);

  }
}
