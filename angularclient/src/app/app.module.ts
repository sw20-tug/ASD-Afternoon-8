import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeService } from './service/recipe-service.service';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from './service/recipe-service.service';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeFavoritesComponent } from './recipe-favorites/recipe-favorites.component';
import { RecipeFilteringComponent } from './recipe-filtering/recipe-filtering.component';



@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeFormComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    ConfirmDialogComponent,
    RecipeSearchComponent,
    RecipeFilteringComponent,
    RecipeSearchComponent,
    RecipeFavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
