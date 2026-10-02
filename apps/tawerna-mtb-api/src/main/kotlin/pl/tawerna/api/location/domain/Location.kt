package pl.tawerna.api.location.domain

/**
 * Represents the main domain aggregate for any mountain biking place (Spot / Location).
 * It encapsulates the infrastructure, geography, media, and nested trails.
 */
class Location(
    val id: Long? = null,
    val name: String,
    val description: String,
    val latitude: Double,
    val longitude: Double,
    val type: PlaceType,
    val youtubeVideoUrl: String?,
    val imageUrl: String?,
    val websiteUrl: String?,
    val trails: List<Trail> = emptyList()
)
