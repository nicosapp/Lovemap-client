import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss']
})
export class FriendsPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  //   const searchBox = document.getElementById('search-box');

  // const typeahead = fromEvent(searchBox, 'input').pipe(
  //   map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
  //   filter(text => text.length > 2),
  //   debounceTime(10),
  //   distinctUntilChanged(),
  //   switchMap(searchTerm => ajax(`/api/endpoint?search=${searchTerm}`))
  // );

  // typeahead.subscribe(data => {
  //   // Handle the data from the API
  // });

  // ngOnInit(): void {
  //   this.heroes$ = this.searchTerms.pipe(
  //     // wait 300ms after each keystroke before considering the term
  //     debounceTime(300),

  //     // ignore new term if same as previous term
  //     distinctUntilChanged(),

  //     // switch to new search observable each time the term changes
  //     switchMap((term: string) => this.heroService.searchHeroes(term)),
  //   );
  // }

  // searchHeroes(term: string): Observable<Hero[]> {
  //   if (!term.trim()) {
  //     // if not search term, return empty hero array.
  //     return of([]);
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
  //     tap(x => x.length ?
  //        this.log(`found heroes matching "${term}"`) :
  //        this.log(`no heroes matching "${term}"`)),
  //     catchError(this.handleError<Hero[]>('searchHeroes', []))
  //   );
}
