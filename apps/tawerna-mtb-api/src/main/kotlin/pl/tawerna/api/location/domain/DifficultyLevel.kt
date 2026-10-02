package pl.tawerna.api.location.domain

/**
 * Defines the universal bike difficulty levels, mapping both machine-built and natural trails.
 */
enum class DifficultyLevel {
    // Easy trails, fire roads, basic paths (STS: S0-S1)
    GREEN,

    // Intermediate flow trails or smooth natural singletracks (STS: S1)
    BLUE_FLOW,

    // Advanced tech trails or typical natural hiking paths with rocks/roots (STS: S2)
    RED_TECH,

    // Expert downhill tracks or highly technical alpine trails (STS: S3-S5)
    BLACK_DH
}
