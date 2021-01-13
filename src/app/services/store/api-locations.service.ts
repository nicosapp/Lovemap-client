import { ApiService } from '@app/services/http/api.service';
import { MessageService } from '@app/services/helpers/message.service';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment as env } from '@app/../environments/environment';
import { handleError } from '../http/http-logging-interceptor.service';

import { Location } from '@app/interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class ApiLocationsService {
  private locationsUrl: string = `locations`;

  private locations: Location[] = [];
  locationsSubject = new Subject<any[]>();

  constructor(
    private api: ApiService,
    public http: HttpClient,
    private messageService: MessageService
  ) {
    this.get().subscribe();
  }

  emitLocations() {
    this.locationsSubject.next(this.locations.slice());
  }

  get(): Observable<Location[]> {
    return this.api.get<Location[]>(this.locationsUrl).pipe(
      map((res: any) => {
        this.locations = res.data;
        this.emitLocations();
        return res.data;
      }),
      tap((_) => this.log('fetched locations')),
      catchError(handleError<Location[]>(this.log, 'getLocations', []))
    );
  }

  show(location: Location | number): Observable<Location> {
    const id = typeof location === 'number' ? location : location.id;
    return this.api.get<Location>(`${this.locationsUrl}/${id}`).pipe(
      map((res: any) => res.data),
      tap((_) => this.log(`fetched location id=${id}`)),
      catchError(handleError<Location>(this.log, `getLocation id=${id}`))
    );
  }

  store(location: any): Observable<Location> {
    return this.api.post(`${this.locationsUrl}`, location).pipe(
      map((res: any) => {
        this.locations.push(res.data);
        this.emitLocations();
        return res.data;
      }),
      tap((location: Location) =>
        this.log(`added location w/ id=${location.id}`)
      ),
      catchError(handleError<Location>(this.log, 'addLocation'))
    );
  }

  update(location: Location): Observable<Location> {
    return this.api.patch(`${this.locationsUrl}/${location.id}`, location).pipe(
      map((res: any) => {
        this.locations = this.locations.map((loc) => {
          if (loc.id === res.data.id) return res.data;
          return res.data;
        });
        this.emitLocations();
        return res.data;
      }),
      tap((_) => this.log(`updated location id=${location.id}`)),
      catchError(handleError<any>(this.log, 'updateLocation'))
    );
  }

  delete(location: Location | number): Observable<any> {
    const id = typeof location === 'number' ? location : location.id;
    return this.api.delete(`${this.locationsUrl}/${id}`).pipe(
      map((res: any) => {
        this.locations = this.locations.filter((loc) => {
          loc.id !== res.data.id;
        });
        this.emitLocations();
        return res.data;
      }),
      tap((_) => this.log(`deleted location id=${id}`)),
      catchError(handleError<Location>(this.log, 'deleteLocation'))
    );
  }

  searchLocation(term: string): Observable<Location[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.api.get<Location[]>(`${this.locationsUrl}/?title=${term}`).pipe(
      tap((x: any) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      tap((_) => this.log('fetched locations')),
      catchError(handleError<Location[]>(this.log, 'getLocations', []))
    );
  }

  private log(message: string) {
    console.log(`Location Service: ${message}`);
    this.messageService.add(`Location Service: ${message}`);
  }
}
