import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Steps } from '../model/steps';
import { Observable } from 'rxjs';
import { catchError,  map, tap  } from 'rxjs/operators';
// import { Observable } from 'rxjs';

@Injectable()
export class StepsService {

  private stepsUrl: string;
  private reOrderUrl: string;

  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http: HttpClient) {
    this.stepsUrl = 'http://localhost:8080/demo/steps';
    this.reOrderUrl = 'http://localhost:8080/demo/steps/reorder/'

  }

  public findAll(recipeId: String): Observable<Steps[]> {
    return this.http.get<Steps[]>(`${this.stepsUrl}/${recipeId}`);
  }

  public save(step: Steps) {
    console.log("HERE at save", step);
    return this.http.post<Steps>(this.stepsUrl, step);
  }

  public reOrder(id: number, newPosition: string) {
    console.log("HERE at reorder", id);
    return this.http.put(this.reOrderUrl + id, newPosition);
  }

  public deleteById(stepId: number) {
    console.log("HERE at save", stepId);
    const url = `${this.stepsUrl}/delete/${stepId}`;
    return this.http.delete(url);
    //return this.http.post<Steps>(this.stepsUrl, step);
  }

}
