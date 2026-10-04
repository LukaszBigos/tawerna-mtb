package pl.tawerna.api.location.infra.persistence

import jakarta.persistence.*
import pl.tawerna.api.location.domain.DifficultyLevel

/**
 * Technical database entity representing the 'trails' table in PostgreSQL.
 */
@Entity
@Table(name = "trails")
class TrailEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val name: String,

    @Column(name = "length_in_meters", nullable = false)
    val lengthInMeters: Int,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val difficulty: DifficultyLevel,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    var location: LocationEntity? = null
)
