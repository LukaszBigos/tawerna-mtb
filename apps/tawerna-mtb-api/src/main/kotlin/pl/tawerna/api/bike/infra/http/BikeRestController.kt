package pl.tawerna.api.bike.infra.http

import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import pl.tawerna.api.bike.domain.Bike
import pl.tawerna.api.bike.domain.BikeApplicationService

@RestController
@RequestMapping("/api/v1/bikes")
class BikeRestController(
    private val bikeApplicationService: BikeApplicationService
) {

    @GetMapping
    fun getAllBikes(): List<Bike> {
        return bikeApplicationService.getAllBikes()
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun createBike(@Valid @RequestBody request: CreateBikeRequest): Bike {
        return bikeApplicationService.createBike(request.toDomain())
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    fun deleteBike(@PathVariable id: Long) {
        if (!bikeApplicationService.deleteBike(id)) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Bike not found")
        }
    }
}