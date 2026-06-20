import { FaWhatsapp } from 'react-icons/fa'

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/56989774690"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:shadow-[0_0_24px_rgba(37,211,102,0.7)]"
      style={{ width: '56px', height: '56px', backgroundColor: '#25D366' }}
    >
      <FaWhatsapp size={28} color="#ffffff" />
    </a>
  )
}

export default WhatsAppButton
