package pl.tawerna.api.location.domain

/**
 * Defines the logical type of the mountain biking location based on its infrastructure.
 */
enum class PlaceType {
    // Commercial locations with chairlifts or gondolas (e.g., Szczyrk Mountain Resort)
    BIKE_PARK,

    // Natural, alpine or hiking paths ridden on bikes (e.g., żółty szlak z Przehyby)
    MOUNTAIN_TRAIL,

    // Dedicated trail centers with uphill tracks but NO lifts (e.g., Rabka Trails)
    TRAIL_CENTER
}
