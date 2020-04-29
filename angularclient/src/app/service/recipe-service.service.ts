import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Recipe } from '../model/recipe';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError,  map, tap  } from 'rxjs/operators';
// import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
//import { MessageService } from './message.service';

@Injectable()
export class RecipeService {


  private usersUrl: string;

  private searchUrl: string;
  private  favoritesUrl: string;

  private filterUrl: string;

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
    this.usersUrl = 'http://localhost:8080/demo/recipes';
    this.searchUrl = 'http://localhost:8080/demo/recipes/search';
    this.filterUrl = 'http://localhost:8080/demo/recipes/filter';
    this.favoritesUrl = 'http://localhost:8080/demo/recipes/favorites';


  }
public get(id: string) {
    //return this.http.get<Recipe>(this.usersUrl);
  }

  public favorize(id:number, title:string) : Observable<any>
  {
    const url = `${this.usersUrl}/favorize/${id}`;
    return this.http.put(url, title);

  }

  public findAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.usersUrl);
  }

  public findFavorites():  Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.favoritesUrl);
  }

  public findSearch(huhu: string): Observable<Recipe[]> {
    if (!huhu.trim()) {
     // if not search term, return empty hero array.
     return of([]);
   }

   return this.http.get<Recipe[]>(`${this.searchUrl}/${huhu}`).pipe(
   );
  }

  public filterTerm(term: string, kind: string): Observable<Recipe[]> {
    if (!term.trim()) {
     // if not search term, return empty hero array.
     return of([]);
   }
   return this.http.get<Recipe[]>(`${this.filterUrl}/${term}/${kind}`).pipe(
   );
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
