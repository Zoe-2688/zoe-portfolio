import { useState } from 'react'
import { trackEvent } from '../utils/analytics'

const STORAGE_KEY = 'feedback_respondido'
export const FEEDBACK_MAX_LENGTH = 200

// Se comparte entre Feedback.jsx (profesional) y CreativeFeedback.jsx (creativo):
// misma lógica de estado/analítica/sessionStorage, cada modo decide su propio JSX.
export function useFeedback(mode) {
  const modo = mode === 'creative' ? 'creativo' : 'profesional'

  const [alreadyAnswered] = useState(() => {
    try { return sessionStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })
  const [step, setStep] = useState('question') // 'question' | 'comment' | 'thanks'
  const [comment, setComment] = useState('')

  const markAnswered = () => {
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch { /* noop */ }
  }

  const answer = (respuesta) => {
    trackEvent('feedback', { respuesta, modo })
    markAnswered()
    setStep(respuesta === 'si' ? 'thanks' : 'comment')
  }

  const submitComment = () => {
    const comentario = comment.trim().slice(0, FEEDBACK_MAX_LENGTH)
    trackEvent('feedback_comentario', { comentario, modo })
    setStep('thanks')
  }

  return { alreadyAnswered, step, comment, setComment, answer, submitComment, maxLength: FEEDBACK_MAX_LENGTH }
}
