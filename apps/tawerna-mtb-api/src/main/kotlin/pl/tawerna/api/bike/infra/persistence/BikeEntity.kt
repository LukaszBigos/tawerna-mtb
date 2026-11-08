package pl.tawerna.api.bike.infra.persistence

import jakarta.persistence.*

/**
 * Technical database entity representing the 'garage_bikes' table in PostgreSQL.
 */
@Entity
@Table(name = "garage_bikes")
class BikeEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val brand: String,

    @Column(nullable = false)
    val model: String,

    @Column(nullable = false)
    val year: Int,

    @Column(name = "wheel_size")
    val wheelSize: Double? = null,

    @Column(name = "rear_wheel_size")
    val rearWheelSize: Double? = null,

    @Column(name = "frame_size")
    val frameSize: String? = null,

    @Column(nullable = false)
    val category: String,

    @Column(columnDefinition = "TEXT", nullable = false)
    val description: String,

    @Column(columnDefinition = "TEXT[]")
    val specs: MutableList<String> = mutableListOf(),

    @Column(name = "image_url")
    val imageUrl: String? = null
)