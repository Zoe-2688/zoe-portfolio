import { usePortfolio } from './PortfolioContext'
import es from '../locales/es'
import en from '../locales/en'

export function useTranslation() {
  const { language } = usePortfolio()
  const translations = language === 'en' ? en : es
  return translations
}