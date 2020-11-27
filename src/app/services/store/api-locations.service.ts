import { MessageService } from '@app/services/helpers/message.service';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from '@app/../environments/environment';
import { handleError } from '../http/http-logging-interceptor.service';

import { Location } from '@app/interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class ApiLocationsService {
  private locationsUrl: string = `${env.baseApiUrl}/locations`;

  public locations$: Observable<Location[]> = of([]);

  constructor(
    public http: HttpClient,
    private messageService: MessageService
  ) {}
  getLocations() {
    this.locations$ = this.get();
  }
  get(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationsUrl).pipe(
      tap((_) => this.log('fetched locations')),
      map((res: any) => res.data),
      catchError(handleError<Location[]>(this.log, 'getLocations', []))
    );
  }

  show(location: Location | number): Observable<Location> {
    const id = typeof location === 'number' ? location : location.id;
    return this.http.get<Location>(`${this.locationsUrl}/${id}`).pipe(
      tap((_) => this.log(`fetched location id=${id}`)),
      map((res: any) => res.data),
      catchError(handleError<Location>(this.log, `getLocation id=${id}`))
    );
  }

  store(location: Location): Observable<Location> {
    return this.http.post(`${this.locationsUrl}`, location).pipe(
      tap((location: Location) =>
        this.log(`added location w/ id=${location.id}`)
      ),
      catchError(handleError<Location>(this.log, 'addLocation'))
    );
  }

  update(location: Location): Observable<Location> {
    return this.http
      .patch(`${this.locationsUrl}/${location.id}`, location)
      .pipe(
        tap((_) => this.log(`updated location id=${location.id}`)),
        catchError(handleError<any>(this.log, 'updateLocation'))
      );
  }

  delete(location: Location | number): Observable<any> {
    const id = typeof location === 'number' ? location : location.id;
    return this.http.delete(`${this.locationsUrl}/${id}`).pipe(
      tap((_) => this.log(`deleted location id=${id}`)),
      catchError(handleError<Location>(this.log, 'deleteLocation'))
    );
  }

  searchLocation(term: string): Observable<Location[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Location[]>(`${this.locationsUrl}/?title=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(handleError<Location[]>(this.log, 'searchLocations', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`Location Service: ${message}`);
  }
}
