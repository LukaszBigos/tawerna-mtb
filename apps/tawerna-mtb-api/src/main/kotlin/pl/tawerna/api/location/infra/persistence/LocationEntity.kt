package pl.tawerna.api.location.infra.persistence

import jakarta.persistence.*
import pl.tawerna.api.location.domain.PlaceType

/**
 * Technical database entity representing the 'bike_parks' table in PostgreSQL.
 * This is the main table for our MTB locations aggregate.
 */
@Entity
@Table(name = "bike_parks")
class LocationEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false)
    val name: String,

    @Column(columnDefinition = "TEXT", nullable = false)
    val description: String,

    @Column(nullable = false)
    val latitude: Double,

    @Column(nullable = false)
    val longitude: Double,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val type: PlaceType,

    @Column(name = "youtube_video_url")
    val youtubeVideoUrl: String?,

    @Column(name = "image_url")
    val imageUrl: String?,

    @Column(name = "website_url")
    val websiteUrl: String?,

    @OneToMany(mappedBy = "location", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    val trails: MutableList<TrailEntity> = mutableListOf()
) {
    /**
     * Helper function to cleanly link a trail to this location.
     * Ensures both sides of the bidirectional relationship are set correctly.
     */
    fun addTrail(trail: TrailEntity) {
        trails.add(trail)
        trail.location = this
    }
}
