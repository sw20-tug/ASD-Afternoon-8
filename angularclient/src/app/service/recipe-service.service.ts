import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from '../model/recipe';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RecipeService {


  private usersUrl: string;

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/demo/recipes';
  }
  //public get(id: string) {
    //return this.http.get<Recipe>(this.usersUrl);
//  }

  public findAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.usersUrl);
  }
  getRecipe(id: number): Observable<Recipe> {
  const url = `${this.usersUrl}/edit/${id}`;
  return this.http.get<Recipe>(url);
}

  public save(recipe: Recipe) {
    return this.http.post<Recipe>(this.usersUrl, recipe);
  }

  update(recipe: any): Observable<any> {
  let result: Observable<Object>;
  if (recipe  ['href']) {
    result = this.http.put(recipe.href, recipe);
    return result;
  }
}

  public deleteById(id: any): Observable<{}> {
    return this.http.delete(this.usersUrl + "/delete/" + id.toString());
  }

  updateRecipe (id: number, recipe: any): Observable<any > {
      const url = `${this.usersUrl}/edit/${id}`;
    return this.http.put(url ,recipe);
  }

}
