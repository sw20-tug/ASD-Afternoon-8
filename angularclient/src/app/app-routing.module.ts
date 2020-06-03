import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeFavoritesComponent } from './recipe-favorites/recipe-favorites.component';
import { RecipeStepsComponent } from './recipe-steps/recipe-steps.component';
import { OnsiteCookingComponent } from './onsite-cooking/onsite-cooking.component';



const routes: Routes = [
    { path: '', component: RecipeListComponent},
    {path: 'recipelist', component: RecipeListComponent },
    { path: 'addrecipe', component: RecipeFormComponent },
    { path: 'editrecipe/:id', component: RecipeEditComponent },
    { path: 'detailrecipe/:id', component: RecipeDetailComponent },
    { path: 'recipesteps/:id', component: RecipeStepsComponent },
    { path: 'favoritelist', component: RecipeFavoritesComponent },
    { path: 'onsitecooking/:id', component: OnsiteCookingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }