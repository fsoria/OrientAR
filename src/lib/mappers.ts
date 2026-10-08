import type { Actividad, Colegio } from '../types'

export function actividadToRow(a: Actividad) {
  return {
    id: a.id,
    nombre: a.nombre,
    slug: a.slug,
    categoria: a.categoria,
    subcategoria: a.subcategoria,
    descripcion: a.descripcion,
    lat: a.lat,
    lng: a.lng,
    zona: a.zona,
    direccion: a.direccion,
    rango_edad: a.rangoEdad,
    precio_nivel: a.precioNivel,
    modalidad: a.modalidad,
    energia: a.energia,
    rating: a.rating,
    cant_resenas: a.cantResenas,
    contacto: a.contacto,
    imagenes: a.imagenes,
    tags: a.tags,
    destacado: a.destacado,
    estado: a.estado,
    creado_en: a.creadoEn,
  }
}

export function rowToActividad(row: Record<string, unknown>): Actividad {
  return {
    id: String(row.id),
    nombre: String(row.nombre),
    slug: String(row.slug),
    categoria: row.categoria as Actividad['categoria'],
    subcategoria: String(row.subcategoria ?? ''),
    descripcion: String(row.descripcion ?? ''),
    lat: Number(row.lat),
    lng: Number(row.lng),
    zona: row.zona as Actividad['zona'],
    direccion: String(row.direccion ?? ''),
    rangoEdad: row.rango_edad as Actividad['rangoEdad'],
    precioNivel: row.precio_nivel as Actividad['precioNivel'],
    modalidad: row.modalidad as Actividad['modalidad'],
    energia: row.energia as Actividad['energia'],
    rating: Number(row.rating ?? 0),
    cantResenas: Number(row.cant_resenas ?? 0),
    contacto: (row.contacto as Actividad['contacto']) ?? {},
    imagenes: (row.imagenes as string[]) ?? [],
    tags: (row.tags as string[]) ?? [],
    destacado: Boolean(row.destacado),
    estado: row.estado as Actividad['estado'],
    creadoEn: String(row.creado_en ?? new Date().toISOString()),
  }
}

export function colegioToRow(c: Colegio) {
  return {
    id: c.id,
    nombre: c.nombre,
    slug: c.slug,
    gestion: c.gestion,
    niveles: c.niveles,
    orientacion: c.orientacion,
    turnos: c.turnos,
    lat: c.lat,
    lng: c.lng,
    zona: c.zona,
    direccion: c.direccion,
    contacto: c.contacto,
    cuota_rango: c.cuotaRango,
    servicios: c.servicios,
    rating: c.rating,
    imagenes: c.imagenes,
    estado: c.estado,
    destacado: Boolean(c.destacado),
    creado_en: c.creadoEn,
  }
}

export function rowToColegio(row: Record<string, unknown>): Colegio {
  return {
    id: String(row.id),
    nombre: String(row.nombre),
    slug: String(row.slug),
    gestion: row.gestion as Colegio['gestion'],
    niveles: (row.niveles as Colegio['niveles']) ?? [],
    orientacion: (row.orientacion as string[]) ?? [],
    turnos: (row.turnos as string[]) ?? [],
    lat: Number(row.lat),
    lng: Number(row.lng),
    zona: row.zona as Colegio['zona'],
    direccion: String(row.direccion ?? ''),
    contacto: (row.contacto as Colegio['contacto']) ?? {},
    cuotaRango: (row.cuota_rango as Colegio['cuotaRango']) ?? null,
    servicios: (row.servicios as string[]) ?? [],
    rating: Number(row.rating ?? 0),
    imagenes: (row.imagenes as string[]) ?? [],
    estado: row.estado as Colegio['estado'],
    creadoEn: String(row.creado_en ?? new Date().toISOString()),
    destacado: Boolean(row.destacado),
  }
}
