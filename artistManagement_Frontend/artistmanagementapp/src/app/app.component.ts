import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Artist } from './artist';
import { ArtistService } from './artist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public artists: Artist[];
  public editArtist: Artist;
  public deleteArtist: Artist;

  constructor(private artistService: ArtistService) {}

  ngOnInit() {
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

  public onAddArtist(addForm: NgForm): void {
    document.getElementById('add-artist-form').click();
    this.artistService.addArtist(addForm.value).subscribe(
      (res: Artist) => {
        console.log(res);
        this.getArtists();
        //clears form after submit
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        //clears form even if error pops up
        addForm.reset();
      }
    );
  }

  public onUpdateArtist(artist: Artist): void {
    this.artistService.updateArtist(artist).subscribe(
      (res: Artist) => {
        console.log(res);
        this.getArtists();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteArtist(artistId: number): void {
    this.artistService.deleteArtist(artistId).subscribe(
      (res: void) => {
        console.log(res);
        this.getArtists();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchArtists(key: string): void {
    const results: Artist[] = [];
    for (const artist of this.artists) {
      if (
        artist.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        artist.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        artist.phoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        artist.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        results.push(artist);
      }
    }
    this.artists = results;
    if (results.length === 0 || !key) {
      this.getArtists();
    }
  }

  public onOpenModal(artist: Artist, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    // checking the button mode
    if (mode === 'add') {
      button.setAttribute('data-target', '#addArtistModal');
    }
    if (mode === 'edit') {
      this.editArtist = artist;
      button.setAttribute('data-target', '#updateArtistModal');
    }
    if (mode === 'delete') {
      this.deleteArtist = artist;
      button.setAttribute('data-target', '#deleteArtistModal');
    }
    container.appendChild(button);
    button.click();
  }
}
