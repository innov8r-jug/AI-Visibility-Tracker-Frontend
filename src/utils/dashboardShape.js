/**
 * Canonical, flat shape the whole dashboard UI reads from. This mirrors the
 * backend's AnalysisData DTO (see service/dto/AnalysisData.java) exactly, so
 * there is exactly ONE place (normalizeDashboardData below) that adapts the
 * raw API response - components never guess at nesting/shape themselves.
 *
 * @typedef {Object} BrandMetric
 * @property {string} name
 * @property {number} mentionCount
 * @property {number} sharePercent
 * @property {number} citationCount
 * @property {string} sentiment
 *
 * @typedef {Object} CitedPage
 * @property {string} url
 * @property {string} [title]
 * @property {number} citationCount
 *
 * @typedef {Object} DashboardData
 * @property {string} prompt
 * @property {number} executionTimeMs
 * @property {number} totalModelsQueried
 * @property {number} successfulResponses
 * @property {BrandMetric[]} brands
 * @property {CitedPage[]} topCitedPages
 * @property {Object.<string, string[]>} modelComparison - AI model name -> brand names it mentioned
 */

/**
 * @param {any} raw - the raw response from POST /api/visibility/analyze
 * @returns {DashboardData|null}
 */
export function normalizeDashboardData(raw) {
    if (!raw) return null

    const analysis = raw.analysisData || {}

    const brands = Array.isArray(analysis.brands)
        ? analysis.brands.map((b) => ({
              name: b?.name ?? 'Unknown',
              mentionCount: b?.mentionCount ?? 0,
              sharePercent: b?.sharePercent ?? 0,
              citationCount: b?.citationCount ?? 0,
              sentiment: b?.sentiment ?? 'neutral',
          }))
        : []

    const topCitedPages = Array.isArray(analysis.citations)
        ? analysis.citations.map((c) => ({
              url: c?.url ?? '',
              title: c?.title ?? '',
              citationCount: c?.count ?? 0,
          }))
        : []

    const modelComparison =
        analysis.modelComparison && typeof analysis.modelComparison === 'object' ? analysis.modelComparison : {}

    return {
        prompt: raw.prompt ?? '',
        executionTimeMs: raw.executionTimeMs ?? 0,
        totalModelsQueried: raw.totalModelsQueried ?? 0,
        successfulResponses: raw.successfulResponses ?? 0,
        brands,
        topCitedPages,
        modelComparison,
    }
}
