package cdg.artist.management.service;

import cdg.artist.management.entity.ArtistEntity;
import cdg.artist.management.exception.UserNotFoundException;
import cdg.artist.management.repository.ArtistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ArtistService {


    private final ArtistRepository artistRepository;

    @Autowired
    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    public ArtistEntity addArtist(ArtistEntity artist) {
        artist.setArtistCode(UUID.randomUUID().toString());
        return artistRepository.save(artist);
    }

    public List<ArtistEntity> findAllArtists() {
        return artistRepository.findAll();
    }

    public ArtistEntity updateArtist(ArtistEntity artist) {
        return artistRepository.save(artist);
    }

    public ArtistEntity findArtistById(Long id) {
        return (artistRepository.findArtistById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found")));
    }

    public void deleteArtist(Long id) {
        artistRepository.deleteArtistById(id);
    }
}
