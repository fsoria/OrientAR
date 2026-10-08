import { buildWhatsAppUrl, leadMessage } from '../../lib/whatsapp'

export function WhatsAppButton({
  phone,
  itemName,
  childName,
  className = '',
}: {
  phone?: string
  itemName: string
  childName?: string
  className?: string
}) {
  if (!phone) return null

  return (
    <a
      className={`btn btn-primary ${className}`}
      href={buildWhatsAppUrl(phone, leadMessage(itemName, childName))}
      target="_blank"
      rel="noreferrer"
    >
      Contactar por WhatsApp
    </a>
  )
}
