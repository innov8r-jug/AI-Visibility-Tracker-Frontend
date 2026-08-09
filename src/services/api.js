import axios from 'axios'

// Falls back to the local dev backend port; override via VITE_API_URL in .env (see .env.example)
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
 * @param {string[]} aiModels - Array of AI model codes ("Gemini", "Groq", or "Cerebras")
 */
export const analyzeVisibility = async (userPrompt, targetBrands, aiModels = null) => {
  // Ensure aiModels are valid (must match a backend-supported AIModel code)
  const SUPPORTED_MODELS = ['Gemini', 'Groq', 'Cerebras', 'Cohere']
  const validModels = aiModels ? aiModels.filter(model => SUPPORTED_MODELS.includes(model)) : null

  if (validModels && validModels.length === 0) {
    throw new Error(`At least one valid AI model (${SUPPORTED_MODELS.join(', ')}) must be selected`)
  }

  // Matches the exact fields in CustomPromptRequest.java
  const requestBody = {
    userPrompt,
    targetBrands,
    aiModels: validModels || aiModels,
  }

  // Calls the CustomPromptController endpoint
  const response = await api.post('/visibility/analyze', requestBody)
  return response.data
}

export default api