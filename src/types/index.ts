export type Categoria =
  | 'Deporte'
  | 'Arte'
  | 'Idiomas'
  | 'Ciencia'
  | 'Música'
  | 'Tecnología'
  | 'Danza'

export type Modalidad = 'solo' | 'equipo' | 'ambas'
export type Energia = 'tranquila' | 'activa'
export type PrecioNivel = '$' | '$$' | '$$$'
export type ZonaSalta =
  | 'Centro'
  | 'Zona Norte'
  | 'Tres Cerritos'
  | 'Ciudad del Milagro'
  | 'Grand Bourg'
  | 'Limache'
  | 'San Lorenzo'

export type Gestion = 'estatal' | 'privada'
export type NivelEducativo = 'inicial' | 'primario' | 'secundario'

export interface Contacto {
  tel?: string
  whatsapp?: string
  web?: string
  instagram?: string
  email?: string
}

export interface Actividad {
  id: string
  nombre: string
  slug: string
  categoria: Categoria
  subcategoria: string
  descripcion: string
  lat: number
  lng: number
  zona: ZonaSalta
  direccion: string
  rangoEdad: { min: number; max: number }
  precioNivel: PrecioNivel
  modalidad: Modalidad
  energia: Energia
  rating: number
  cantResenas: number
  contacto: Contacto
  imagenes: string[]
  tags: string[]
  destacado: boolean
  estado: 'activo' | 'inactivo'
  creadoEn: string
}

export interface Colegio {
  id: string
  nombre: string
  slug: string
  gestion: Gestion
  niveles: NivelEducativo[]
  orientacion: string[]
  turnos: string[]
  lat: number
  lng: number
  zona: ZonaSalta
  direccion: string
  contacto: Contacto
  cuotaRango: { min: number; max: number } | null
  servicios: string[]
  rating: number
  imagenes: string[]
  estado: 'activo' | 'inactivo'
  creadoEn: string
  destacado?: boolean
}

export interface PerfilHijo {
  nombre: string
  edad: number
  intereses: string[]
  modalidad: Modalidad
  energia: Energia
}

export interface MotivoAfinidad {
  label: string
  peso: number
}

export interface ResultadoAfinidad {
  score: number
  motivos: MotivoAfinidad[]
  excluido?: boolean
  razonExclusion?: string
}

export interface FavoritoItem {
  id: string
  tipo: 'actividad' | 'colegio'
  agregadoEn: string
}
