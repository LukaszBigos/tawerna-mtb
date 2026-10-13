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

    @Column(name = "trailforks_url")
    val trailforksUrl: String? = null,

    @Column(name = "youtube_video_url")
    val youtubeVideoUrl: String? = null,

    @Column(columnDefinition = "TEXT")
    val description: String? = null,

    @Column(name = "image_url")
    val imageUrl: String? = null,

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "location_id", nullable = false)
    var location: LocationEntity
)
