/** Carga y normaliza contenido.json. Mantiene soporte para el arreglo legado. */
const CONTENT_URL = 'contenido.json';
let cachedContent;

const DEFAULT_CONTENT = {
  eventos: [], galeria: [], voluntarios: [], comunidad: [], donadores: [], contacto: {}
};

export async function loadContent() {
  if (cachedContent) return cachedContent;
  const response = await fetch(CONTENT_URL, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Error al cargar contenido (${response.status})`);
  cachedContent = normalizeContent(await response.json());
  return cachedContent;
}

export function normalizeContent(data) {
  if (Array.isArray(data)) return normalizeLegacyContent(data);
  return { ...DEFAULT_CONTENT, ...data };
}

function normalizeLegacyContent(items) {
  return {
    ...DEFAULT_CONTENT,
    voluntarios: items.filter(item => item.seccion === 'voluntario'),
    comunidad: items.filter(item => item.seccion === 'comunidad'),
    donadores: items.filter(item => item.seccion === 'donador')
  };
}
