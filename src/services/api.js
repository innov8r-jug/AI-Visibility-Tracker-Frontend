import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Send visibility analysis request to backend
 * @param {string} category - Category name (e.g., "CRM software")
 * @param {string[]} brands - Array of brand names
 * @param {string[]} aiModels - Array of AI model codes ("Gemini" or "Groq")
 */
export const analyzeVisibility = async (category, brands, aiModels = null) => {
  // Ensure aiModels are valid (Gemini or Groq)
  const validModels = aiModels ? aiModels.filter(model => 
    model === 'Gemini' || model === 'Groq'
  ) : null

  if (validModels && validModels.length === 0) {
    throw new Error('At least one valid AI model (Gemini or Groq) must be selected')
  }

  const requestBody = {
    category,
    brands,
    aiModels: validModels || aiModels,
  }

  console.log('API Request:', requestBody)

  const response = await api.post('/visibility/analyze', requestBody)
  return response.data
}

export const getDashboardData = async (category) => {
  const response = await api.get(`/visibility/dashboard/${encodeURIComponent(category)}`)
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

