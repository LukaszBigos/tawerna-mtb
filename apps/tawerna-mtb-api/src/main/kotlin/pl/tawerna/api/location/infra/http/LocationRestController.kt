package pl.tawerna.api.location.infra.http

import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import pl.tawerna.api.location.domain.Location
import pl.tawerna.api.location.domain.LocationApplicationService

@RestController
@RequestMapping("/api/v1/locations")
class LocationRestController(
    private val locationApplicationService: LocationApplicationService
) {

    @GetMapping
    fun getAllLocations(): List<Location> {
        return locationApplicationService.getAllLocations()
    }

    @PostMapping
    @org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.CREATED)
    fun createLocation(@Valid @RequestBody request: CreateLocationRequest): Location {
        return locationApplicationService.createLocation(request.toDomain())
    }

    @PostMapping("/{locationId}/trails")
    @org.springframework.web.bind.annotation.ResponseStatus(HttpStatus.CREATED)
    fun addTrail(
        @PathVariable locationId: Long,
        @Valid @RequestBody request: CreateTrailRequest
    ): Location {
        return locationApplicationService.addTrailToLocation(locationId, request.toDomain())
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND, "Location not found")
    }
}
