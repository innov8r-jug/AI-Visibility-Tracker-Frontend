/**
 * Category mapping utility
 * Maps display names to camelCase keys for database storage
 */

// Category options with display name -> camelCase mapping
// Must match backend CategoryUtils.java exactly
export const CATEGORIES = [
  { display: 'CRM Software', key: 'crmSoftware' },
  { display: 'Project Management Tools', key: 'projectManagementTools' },
  { display: 'Email Marketing Platforms', key: 'emailMarketingPlatforms' },
  { display: 'E-commerce Platforms', key: 'ecommercePlatforms' },
  { display: 'Analytics Tools', key: 'analyticsTools' },
  { display: 'Customer Support Software', key: 'customerSupportSoftware' },
  { display: 'Marketing Automation Tools', key: 'marketingAutomationTools' },
  { display: 'Content Management Systems', key: 'contentManagementSystems' },
  { display: 'Social Media Management', key: 'socialMediaManagement' },
  { display: 'SEO Tools', key: 'seoTools' },
  { display: 'Design Tools', key: 'designTools' },
  { display: 'Video Conferencing Tools', key: 'videoConferencingTools' },
]

// Create a map for quick lookup: camelCase -> display name
export const categoryMap = new Map(
  CATEGORIES.map(cat => [cat.key, cat.display])
)

// Create reverse map: display name -> camelCase
export const categoryKeyMap = new Map(
  CATEGORIES.map(cat => [cat.display, cat.key])
)

/**
 * Convert display name to camelCase key for database storage
 * @param {string} displayName - The display name (e.g., "CRM Software")
 * @returns {string} - The camelCase key (e.g., "crmSoftware")
 */
export const getCategoryKey = (displayName) => {
  return categoryKeyMap.get(displayName) || displayName
}

/**
 * Convert camelCase key to display name for UI
 * @param {string} key - The camelCase key (e.g., "crmSoftware")
 * @returns {string} - The display name (e.g., "CRM Software")
 */
export const getCategoryDisplay = (key) => {
  return categoryMap.get(key) || key
}

/**
 * Get all category display names
 * @returns {string[]} - Array of display names
 */
export const getCategoryDisplayNames = () => {
  return CATEGORIES.map(cat => cat.display)
}

