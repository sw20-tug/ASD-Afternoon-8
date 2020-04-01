import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
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

  deleteRecipe(id): void{
    this.recipeService.deleteById(id).subscribe(response =>{
      console.log("Delete record #" + id);
      window.location.reload();
    });

  }
}
