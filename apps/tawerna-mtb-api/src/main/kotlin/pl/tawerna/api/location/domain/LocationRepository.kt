package pl.tawerna.api.location.domain

/**
 * Domain boundary interface for managing MTB locations.
 * In DDD, this acts as an Output Port.
 */
interface LocationRepository {
    fun findAll(): List<Location>
    fun save(location: Location): Location
    fun count(): Long
}
