import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    > <!--  primera forma(sin el ViewChild): (keyup.enter)="searchTag(txtTagInput.value)" -->
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput') //existe el ViewChildren que es para arreglos como varios inputs ejemplo
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gitsService: GifsService) { }

 /*  searchTag(newTag: string): void { //primera forma(sin el ViewChild)
    console.log({ newTag })
  } */

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value;
    // console.log({ newTag })
    this.gitsService.searchTag(newTag);
    this.tagInput.nativeElement.value ='';
  }

}
