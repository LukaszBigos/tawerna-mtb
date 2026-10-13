package pl.tawerna.api.location.infra.http

import jakarta.validation.constraints.DecimalMax
import jakarta.validation.constraints.DecimalMin
import jakarta.validation.constraints.Min
import jakarta.validation.constraints.NotBlank
import pl.tawerna.api.location.domain.DifficultyLevel
import pl.tawerna.api.location.domain.Location
import pl.tawerna.api.location.domain.PlaceType
import pl.tawerna.api.location.domain.Trail

data class CreateLocationRequest(
    @field:NotBlank val name: String,
    @field:NotBlank val description: String,
    @field:DecimalMin("-90.0") @field:DecimalMax("90.0") val latitude: Double,
    @field:DecimalMin("-180.0") @field:DecimalMax("180.0") val longitude: Double,
    val type: PlaceType,
    val youtubeVideoUrl: String? = null,
    val imageUrl: String? = null,
    val websiteUrl: String? = null
) {
    fun toDomain() = Location(
        name = name.trim(),
        description = description.trim(),
        latitude = latitude,
        longitude = longitude,
        type = type,
        youtubeVideoUrl = youtubeVideoUrl.normalizedUrl(),
        imageUrl = imageUrl.normalizedUrl(),
        websiteUrl = websiteUrl.normalizedUrl()
    )
}

data class CreateTrailRequest(
    @field:NotBlank val name: String,
    @field:Min(1) val lengthInMeters: Int,
    val difficulty: DifficultyLevel,
    val trailforksUrl: String? = null,
    val youtubeVideoUrl: String? = null,
    val description: String? = null,
    val imageUrl: String? = null
) {
    fun toDomain() = Trail(
        name = name.trim(),
        lengthInMeters = lengthInMeters,
        difficulty = difficulty,
        trailforksUrl = trailforksUrl.normalizedUrl(),
        youtubeVideoUrl = youtubeVideoUrl.normalizedUrl(),
        description = description?.trim()?.takeIf(String::isNotEmpty),
        imageUrl = imageUrl.normalizedUrl()
    )
}

private fun String?.normalizedUrl(): String? = this?.trim()?.takeIf(String::isNotEmpty)