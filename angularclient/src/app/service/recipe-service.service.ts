import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recipe } from '../model/recipe';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RecipeService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/demo/';
  }

  public findAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.usersUrl);
  }

  public save(recipe: Recipe) {
    return this.http.post<Recipe>(this.usersUrl, recipe);
  }
}
