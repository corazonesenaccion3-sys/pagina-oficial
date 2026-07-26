/** Inserta los datos de contacto desde contenido.json, sin duplicar información en HTML. */
export function renderContactDetails(contact = {}) {
  const items = document.querySelectorAll('#contactDetails .contact__item p');
  const address = [contact.direccion, contact.colonia && `Col. ${contact.colonia}`, contact.ciudad, contact.estado, contact.pais].filter(Boolean).join(', ');
  const values = [address, ...(contact.telefono || []), contact.correo, ...(contact.horario || [])];
  items.forEach((element, index) => { if (values[index]) element.textContent = values[index]; });
}
