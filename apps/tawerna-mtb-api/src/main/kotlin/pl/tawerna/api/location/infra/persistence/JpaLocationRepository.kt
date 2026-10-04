package pl.tawerna.api.location.infra.persistence

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data JPA repository for 'LocationEntity'.
 * This interface provides out-of-the-box CRUD operations for PostgreSQL.
 */
@Repository
interface JpaLocationRepository : JpaRepository<LocationEntity, Long>
