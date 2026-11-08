package pl.tawerna.api.bike.infra.persistence

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

/**
 * Spring Data JPA repository for 'BikeEntity'.
 * This interface provides out-of-the-box CRUD operations for PostgreSQL.
 */
@Repository
interface JpaBikeRepository : JpaRepository<BikeEntity, Long> {
    fun findAllByOrderByIdAsc(): List<BikeEntity>
}