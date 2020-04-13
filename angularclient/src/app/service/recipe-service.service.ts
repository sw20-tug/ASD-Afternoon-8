import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from '../model/recipe';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {


  private usersUrl: string;

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/demo/recipes';
  }
public get(id: string) {
    //return this.http.get<Recipe>(this.usersUrl);
  }

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

  public deleteById(id: number): Observable<any>  {
      const url = `${this.usersUrl}/delete/${id}`;
    return this.http.delete(url);
  }

  updateRecipe (id: number, recipe: any): Observable<any > {
      const url = `${this.usersUrl}/edit/${id}`;
    return this.http.put(url , recipe);
  }
  updateTitle (id: number, title: string): Observable<any > {
    const url = `${this.usersUrl}/updateTitle/${id}`;

    return this.http.put(url, title);
  }
}

  export class ConfirmDialogService {

   private subject = new Subject<any>();
   constructor() { }

   confirmThis(message: string, siFn: () => void, noFn: () => void) {
       this.setConfirmation(message, siFn, noFn);
   }

   setConfirmation(message: string, siFn: () => void, noFn: () => void) {
       // tslint:disable-next-line: prefer-const
       let that = this;
       this.subject.next({
           type: 'confirm',
           text: message,
           siFn:
               function () {
                   that.subject.next(); // this will close the modal
                   siFn();
               },
           noFn: function () {
               that.subject.next();
               noFn();
           }
       });

   }

   getMessage(): Observable<any> {
       return this.subject.asObservable();
   }

}
