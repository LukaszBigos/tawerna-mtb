package pl.tawerna.api.bike.infra.persistence

import org.springframework.stereotype.Repository
import pl.tawerna.api.bike.domain.Bike
import pl.tawerna.api.bike.domain.BikeRepository

@Repository
class BikeRepositoryImpl(
    private val jpaBikeRepository: JpaBikeRepository
) : BikeRepository {

    override fun findAll(): List<Bike> {
        return jpaBikeRepository.findAllByOrderByIdAsc().map { it.toDomain() }
    }

    override fun findById(id: Long): Bike? {
        return jpaBikeRepository.findById(id).orElse(null)?.toDomain()
    }

    override fun save(bike: Bike): Bike {
        val entity = bike.toEntity()
        val savedEntity = jpaBikeRepository.save(entity)
        return savedEntity.toDomain()
    }

    override fun deleteById(id: Long): Boolean {
        if (!jpaBikeRepository.existsById(id)) return false
        jpaBikeRepository.deleteById(id)
        return true
    }

    override fun count(): Long {
        return jpaBikeRepository.count()
    }
}

fun BikeEntity.toDomain(): Bike {
    return Bike(
        id = this.id,
        brand = this.brand,
        model = this.model,
        year = this.year,
        wheelSize = this.wheelSize,
        rearWheelSize = this.rearWheelSize,
        frameSize = this.frameSize,
        category = this.category,
        description = this.description,
        specs = this.specs.toList(),
        imageUrl = this.imageUrl
    )
}

fun Bike.toEntity(): BikeEntity {
    return BikeEntity(
        id = this.id,
        brand = this.brand,
        model = this.model,
        year = this.year,
        wheelSize = this.wheelSize,
        rearWheelSize = this.rearWheelSize,
        frameSize = this.frameSize,
        category = this.category,
        description = this.description,
        specs = this.specs.toMutableList(),
        imageUrl = this.imageUrl
    )
}