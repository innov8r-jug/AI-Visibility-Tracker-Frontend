import axios from 'axios'

// Updated to port 8081 to match your updated Spring Boot configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Send real-time visibility analysis request to the scatter-gather backend
 * @param {string} userPrompt - The free-form user query (e.g., "Best CRM tools")
 * @param {string[]} targetBrands - Array of specific brand names to track
 * @param {string[]} aiModels - Array of AI model codes ("Gemini" or "Groq")
 */
export const analyzeVisibility = async (userPrompt, targetBrands, aiModels = null) => {
  // Ensure aiModels are valid (Gemini or Groq)
  const validModels = aiModels ? aiModels.filter(model =>
      model === 'Gemini' || model === 'Groq'
  ) : null

  if (validModels && validModels.length === 0) {
    throw new Error('At least one valid AI model (Gemini or Groq) must be selected')
  }

  // Matches the exact fields in CustomPromptRequest.java
  const requestBody = {
    userPrompt,
    targetBrands,
    aiModels: validModels || aiModels,
  }

  // Calls the new CustomPromptController endpoint
  const response = await api.post('/visibility/analyze', requestBody)
  return response.data
}

export const getAllBrands = async () => {
  const response = await api.get('/brands')
  return response.data
}

export const getBrandsByCategory = async (categoryName) => {
  const response = await api.get(`/brands/category/${encodeURIComponent(categoryName)}`)
  return response.data
}

export const getAllCategories = async () => {
  const response = await api.get('/categories')
  return response.data
}

export default api