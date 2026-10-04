package pl.tawerna.api.location.domain

import org.springframework.stereotype.Service

@Service
class LocationApplicationService(
    private val locationRepository: LocationRepository
) {

    fun getAllLocations(): List<Location> {
        return locationRepository.findAll()
    }
}
