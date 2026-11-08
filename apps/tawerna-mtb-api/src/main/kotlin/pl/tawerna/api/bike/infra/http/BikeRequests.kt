package pl.tawerna.api.bike.infra.http

import pl.tawerna.api.bike.domain.Bike

class CreateBikeRequest(
    val brand: String,
    val model: String,
    val year: Int,
    val wheelSize: Double? = null,
    val rearWheelSize: Double? = null,
    val frameSize: String? = null,
    val category: String,
    val description: String,
    val specs: List<String> = emptyList(),
    val imageUrl: String? = null
) {
    fun toDomain(): Bike {
        return Bike(
            brand = brand,
            model = model,
            year = year,
            wheelSize = wheelSize,
            rearWheelSize = rearWheelSize,
            frameSize = frameSize,
            category = category,
            description = description,
            specs = specs,
            imageUrl = imageUrl
        )
    }
}