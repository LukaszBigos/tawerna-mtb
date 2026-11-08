package pl.tawerna.api.bike.domain

/**
 * Domain model for a single mountain bike in the founder's garage.
 * Pure domain model, completely independent of the database.
 */
class Bike(
    val id: Long? = null,
    val brand: String,
    val model: String,
    val year: Int,
    val wheelSize: Double? = null,
    val rearWheelSize: Double? = null,
    val frameSize: String? = null,
    val category: String,
    val description: String,
    val specs: List<String> = emptyList(),
    val imageUrl: String? = null
)