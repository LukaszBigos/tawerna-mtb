package pl.tawerna.api.bike.domain

import org.springframework.stereotype.Service

@Service
class BikeApplicationService(
    private val bikeRepository: BikeRepository
) {

    fun getAllBikes(): List<Bike> = bikeRepository.findAll()

    fun createBike(bike: Bike): Bike = bikeRepository.save(bike)

    fun deleteBike(id: Long): Boolean = bikeRepository.deleteById(id)
}