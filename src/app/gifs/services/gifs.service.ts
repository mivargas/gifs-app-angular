import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gif.interfaces';


@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifsList: Gif[] = [];

  private _tagsHistory: string[] = [];

  private apiKey: string = 'NVLM6KbOKNaF0Ev2DfCZddc22y5HO09o';

  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';


  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if ( this._tagsHistory.length === 0 ) return;

    this.searchTag(this._tagsHistory[0]);

  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();

  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  /* searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    fetch('http://api.giphy.com/v1/gifs/search?api_key=NVLM6KbOKNaF0Ev2DfCZddc22y5HO09o&q=dog&limit=10')
    .then(resp => resp.json())
    .then(data => console.log(data))

  } */

  /* async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const resp = await fetch('http://api.giphy.com/v1/gifs/search?api_key=NVLM6KbOKNaF0Ev2DfCZddc22y5HO09o&q=dog&limit=10')
    const data = await resp.json();
    console.log(data);

  } */


  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        /*console.log(resp.data)*/
        this.gifsList = resp.data
        console.log({ gif: this.gifsList });
      });


    /* this.http.get('http://api.giphy.com/v1/gifs/search?api_key=NVLM6KbOKNaF0Ev2DfCZddc22y5HO09o&q=dog&limit=10')
      .subscribe( resp => console.log(resp)) */

  }



}
