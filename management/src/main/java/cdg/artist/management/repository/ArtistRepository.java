package cdg.artist.management.repository;

import cdg.artist.management.entity.ArtistEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArtistRepository extends JpaRepository<ArtistEntity, Long> {

    void deleteArtistById(Long id);

    Optional<ArtistEntity> findArtistById(Long id);
}
