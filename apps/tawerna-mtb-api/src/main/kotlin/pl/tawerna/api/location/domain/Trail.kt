package pl.tawerna.api.location.domain

import pl.tawerna.api.location.domain.DifficultyLevel

/**
 * Represents a single mountain biking track or trail section.
 * This is a pure domain model, completely independent of the database.
 */
class Trail(
    val id: Long? = null,
    val name: String,
    val lengthInMeters: Int,
    val difficulty: DifficultyLevel,
    val trailforksUrl: String? = null,
    val youtubeVideoUrl: String? = null,
    val description: String? = null,
    val imageUrl: String? = null
)
