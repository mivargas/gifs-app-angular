import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'sheared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) {
  }

  get tags(): string[] {
    return this.gifsService.tagsHistory;

  }


  buttonHistory(tag: string): void {
    this.gifsService.searchTag(tag)

  }
}
