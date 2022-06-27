import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Artist } from './artist';
import { ArtistService } from './artist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public artists: Artist[];
  public editArtists: Artist;
  public deleteArtists: Artist;

  constructor(private artistService: ArtistService) {}
  ngOnInit(...args: []) {
    this.getArtists();
  }

  public getArtists(): void {
    this.artistService.getArtists().subscribe(
      (response: Artist[]): void => {
        this.artists = response;
        console.log(this.artists);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
