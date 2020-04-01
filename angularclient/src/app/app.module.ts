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
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from './service/recipe-service.service';


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeFormComponent,
    RecipeEditComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatGridListModule
  ],
  exports: [
    ConfirmDialogComponent
  ],
  providers: [RecipeService, ConfirmDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class ConfirmDialogModule { }
