package cdg.artist.management;

import cdg.artist.management.entity.ArtistEntity;
import cdg.artist.management.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/artist")
public class ArtistResource {

    private final ArtistService artistService;

    public ArtistResource(ArtistService artistService) {
        this.artistService = artistService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArtistEntity>> getAllArtists() {
        List<ArtistEntity> artists = artistService.findAllArtists();
        return new ResponseEntity<>(artists, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ArtistEntity> getArtistById(@PathVariable("id") Long id) {
        ArtistEntity artist = artistService.findArtistById(id);
        return new ResponseEntity<>(artist, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ArtistEntity> addArtist(@RequestBody ArtistEntity artist) {
        ArtistEntity newArtist = artistService.addArtist(artist);
        return new ResponseEntity<>(newArtist, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ArtistEntity> updateArtist(@RequestBody ArtistEntity artist) {
        ArtistEntity updatedArtist = artistService.updateArtist(artist);
        return new ResponseEntity<>(updatedArtist, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable("id") Long id) {
        artistService.deleteArtist(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}

