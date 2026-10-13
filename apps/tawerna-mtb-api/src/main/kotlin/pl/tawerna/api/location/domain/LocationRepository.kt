package pl.tawerna.api.location.domain

/**
 * Domain boundary interface for managing MTB locations.
 * In DDD, this acts as an Output Port.
 */
interface LocationRepository {
    fun findAll(): List<Location>
    fun findById(id: Long): Location?
    fun save(location: Location): Location
    fun addTrail(locationId: Long, trail: Trail): Location?
    fun count(): Long
}
