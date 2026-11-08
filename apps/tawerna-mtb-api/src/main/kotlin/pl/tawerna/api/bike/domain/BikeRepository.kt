package pl.tawerna.api.bike.domain

/**
 * Domain boundary interface for managing garage bikes.
 * In DDD, this acts as an Output Port.
 */
interface BikeRepository {
    fun findAll(): List<Bike>
    fun findById(id: Long): Bike?
    fun save(bike: Bike): Bike
    fun deleteById(id: Long): Boolean
    fun count(): Long
}