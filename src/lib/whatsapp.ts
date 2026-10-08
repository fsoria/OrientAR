export function buildWhatsAppUrl(phone: string, text: string) {
  const digits = phone.replace(/\D/g, '')
  const msg = encodeURIComponent(text)
  return `https://wa.me/${digits}?text=${msg}`
}

export function leadMessage(nombreItem: string, nombreHijo?: string) {
  const hijo = nombreHijo ? ` para ${nombreHijo}` : ''
  return `Hola! Vi "${nombreItem}" en OrientAR y me interesa consultar disponibilidad${hijo}. ¿Me cuentan más?`
}
