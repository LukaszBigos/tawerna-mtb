package pl.tawerna.api.location.infra.persistence

import org.springframework.stereotype.Repository
import pl.tawerna.api.location.domain.Location
import pl.tawerna.api.location.domain.LocationRepository
import pl.tawerna.api.location.domain.Trail

@Repository
class LocationRepositoryImpl(
    private val jpaLocationRepository: JpaLocationRepository
) : LocationRepository {

    override fun findAll(): List<Location> {
        return jpaLocationRepository.findAll().map { it.toDomain() }
    }

    override fun save(location: Location): Location {
        val entity = location.toEntity()
        val savedEntity = jpaLocationRepository.save(entity)
        return savedEntity.toDomain()
    }

    override fun count(): Long {
        return jpaLocationRepository.count()
    }
}

fun LocationEntity.toDomain(): Location {
    return Location(
        id = this.id,
        name = this.name,
        description = this.description,
        latitude = this.latitude,
        longitude = this.longitude,
        type = this.type,
        youtubeVideoUrl = this.youtubeVideoUrl,
        imageUrl = this.imageUrl,
        websiteUrl = this.websiteUrl,
        trails = this.trails.map { it.toDomain() }
    )
}

fun TrailEntity.toDomain(): Trail {
    return Trail(
        id = this.id,
        name = this.name,
        lengthInMeters = this.lengthInMeters,
        difficulty = this.difficulty
    )
}

fun Location.toEntity(): LocationEntity {
    val locationEntity = LocationEntity(
        id = this.id,
        name = this.name,
        description = this.description,
        latitude = this.latitude,
        longitude = this.longitude,
        type = this.type,
        youtubeVideoUrl = this.youtubeVideoUrl,
        imageUrl = this.imageUrl,
        websiteUrl = this.websiteUrl
    )
    
    val mappedTrails = this.trails.map { trail ->
        trail.toEntity(locationEntity)
    }
    
    locationEntity.trails.clear()
    locationEntity.trails.addAll(mappedTrails)
    
    return locationEntity
}

fun Trail.toEntity(parentLocation: LocationEntity): TrailEntity {
    return TrailEntity(
        id = this.id,
        name = this.name,
        lengthInMeters = this.lengthInMeters,
        difficulty = this.difficulty,
        location = parentLocation
    )
}
