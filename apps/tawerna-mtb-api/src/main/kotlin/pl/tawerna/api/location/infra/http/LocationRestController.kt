package pl.tawerna.api.location.infra.http

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
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
}
