import type { LeadData } from "../services/leadService";

// Mail de aviso de lead de Mergge Studio. Tablas y estilos inline, sin CSS externo
// ni SVG, para que se vea igual en Gmail, Outlook y Apple Mail. El lead viene de un
// formulario público sin auth: todo pasa por escapeHtml antes de entrar al HTML.
// Diseño y maqueta: /mnt/project-files/mergge/email/ (proyecto Mergge).

const TITULO = "Anton, Impact, 'Arial Narrow Bold', 'Helvetica Neue', Arial, sans-serif";
const TEXTO = "Poppins, 'Segoe UI', Helvetica, Arial, sans-serif";
const AZUL = '#3130E3', NARANJA = '#FF4500', CREMA = '#F1EEE4', MARRON = '#310D00';
const LINEA = '#D8D0BE', TENUE = '#8C7565', SUAVE = '#5E4436', TARJETA = '#FAF8F2';

// El asunto sale de un formulario público: sin saltos de línea para que nadie
// pueda colar encabezados de mail.
function limpiarLinea(v: string): string {
  return v.replace(/[\r\n]+/g, ' ').trim()
}

function escapeHtml(v: unknown): string {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function vacio(): string { return '<span style="color:' + TENUE + ';font-style:italic;">Sin responder</span>'; }
function texto(v?: string): string { return v && String(v).trim() ? escapeHtml(v) : vacio(); }
function chips(arr: string[] | undefined, bg: string, fg: string): string {
  if (!arr || !arr.length) return vacio();
  return arr.map((t) => {
    return '<span style="display:inline-block;margin:0 6px 6px 0;padding:5px 12px;border-radius:999px;background-color:' + bg + ';color:' + fg + ';font-size:13px;line-height:18px;font-weight:600;">' + escapeHtml(t) + '</span>';
  }).join('');
}
function fila(label: string, html: string, primera?: boolean): string {
  return '<tr>' +
    '<td width="130" valign="top" style="width:130px;padding:12px 12px 12px 0;' + (primera ? '' : 'border-top:1px solid ' + LINEA + ';') + 'font-family:' + TEXTO + ';font-size:11px;line-height:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:' + TENUE + ';">' + label + '</td>' +
    '<td valign="top" style="word-break:break-word;overflow-wrap:break-word;padding:12px 0;' + (primera ? '' : 'border-top:1px solid ' + LINEA + ';') + 'font-family:' + TEXTO + ';font-size:15px;line-height:22px;color:' + MARRON + ';">' + html + '</td></tr>';
}
function seccion(titulo: string, filas: string): string {
  return '<tr><td style="padding:0 0 16px 0;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:' + TARJETA + ';border:1px solid ' + LINEA + ';border-radius:20px;">' +
    '<tr><td style="padding:22px 26px 8px 26px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td width="26" valign="middle" style="font-family:Arial,sans-serif;font-size:20px;line-height:24px;color:' + NARANJA + ';">&#10038;</td>' +
    '<td valign="middle" style="font-family:' + TITULO + ';font-size:24px;line-height:26px;text-transform:uppercase;letter-spacing:.2px;color:' + MARRON + ';">' + titulo + '</td></tr></table>' +
    '</td></tr>' +
    '<tr><td style="padding:0 26px 10px 26px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + filas + '</table></td></tr>' +
    '</table></td></tr>';
}
function boton(href: string, label: string, principal: boolean): string {
  const bg = principal ? NARANJA : AZUL;
  const col = principal ? MARRON : CREMA;
  const borde = principal ? NARANJA : 'rgba(241,238,228,.65)';
  return '<a href="' + href + '" style="display:inline-block;margin:0 10px 10px 0;padding:13px 24px;border:1.5px solid ' + borde + ';border-radius:999px;background-color:' + bg + ';font-family:' + TEXTO + ';font-size:15px;line-height:20px;font-weight:700;color:' + col + ';text-decoration:none;">' + label + '</a>';
}
function dato(label: string, valor: string | undefined, destacado: boolean, ancho?: 'i' | 'd'): string {
  const bg = destacado ? '#FBE4DB' : TARJETA, bd = destacado ? NARANJA : LINEA, lc = destacado ? '#8A4426' : TENUE;
  return '<td ' + (ancho ? 'width="50%" ' : '') + 'valign="top" style="padding:' + (ancho === 'i' ? '0 5px 0 0' : ancho === 'd' ? '0 0 0 5px' : '0') + ';">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:' + bg + ';border:' + (destacado ? '2px' : '1px') + ' solid ' + bd + ';border-radius:18px;"><tr><td style="padding:14px 18px;">' +
    '<div style="font-family:' + TEXTO + ';font-size:11px;line-height:16px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:' + lc + ';">' + label + '</div>' +
    '<div style="padding-top:4px;font-family:' + TEXTO + ';font-size:' + (destacado ? '20' : '16') + 'px;line-height:24px;font-weight:700;color:' + MARRON + ';">' + (valor && String(valor).trim() ? escapeHtml(valor) : '<span style="color:' + TENUE + ';font-weight:500;font-style:italic;font-size:15px;">Sin responder</span>') + '</div>' +
    '</td></tr></table></td>';
}
function whatsappHref(num?: string): string {
  const d = String(num || '').replace(/\D/g, '').replace(/^0+/, '');
  if (!d) return '';
  return 'https://wa.me/' + (d.indexOf('54') === 0 ? d : '549' + d);
}

// Asunto con lo que hace falta para decidir sin abrir el mail.
function subject(lead: LeadData): string {
  return limpiarLinea('Nuevo lead: ' + lead.empresa + (lead.presupuesto ? ' · ' + lead.presupuesto : ''));
}
// Texto que Gmail y Apple Mail muestran al lado del asunto en la bandeja.
function preheader(lead: LeadData): string {
  return lead.nombre + ' · ' + (lead.tipoProyecto || 'Proyecto sin definir') + ' · ' + (lead.plazo || 'Sin plazo');
}

function body(lead: LeadData, fecha: string): string {
  const wa = whatsappHref(lead.whatsapp);
  const botones = boton('mailto:' + escapeHtml(lead.email), 'Responder por email', true) + (wa ? boton(wa, 'Escribir por WhatsApp', false) : '');

  const cabecera = '<tr><td bgcolor="' + AZUL + '" style="background-color:' + AZUL + ';border-radius:28px 28px 0 0;padding:34px 36px 26px 36px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td valign="middle"><span style="display:inline-block;padding:6px 14px;border-radius:999px;background-color:' + NARANJA + ';font-family:' + TEXTO + ';font-size:12px;line-height:16px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:' + MARRON + ';">&#10038;&nbsp; Nuevo lead</span></td>' +
    '<td valign="middle" align="right" style="font-family:' + TEXTO + ';font-size:13px;line-height:18px;color:#CFCDF6;">' + escapeHtml(fecha) + '</td></tr></table>' +
    '<div style="padding-top:26px;font-family:' + TITULO + ';font-size:46px;line-height:48px;text-transform:uppercase;letter-spacing:-.2px;color:' + CREMA + ';">' + escapeHtml(lead.empresa) + '</div>' +
    '<div style="padding-top:10px;font-family:' + TEXTO + ';font-size:17px;line-height:26px;color:' + CREMA + ';"><strong>' + escapeHtml(lead.nombre) + '</strong>' + (lead.rubro ? ' &middot; ' + escapeHtml(lead.rubro) : '') + '</div>' +
    '<div style="padding-top:22px;">' + botones + '</div>' +
    '</td></tr>';

  const datos = '<tr><td style="padding:22px 0 16px 0;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' + dato('Presupuesto', lead.presupuesto, true) + '</tr></table>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;"><tr>' + dato('Plazo', lead.plazo, false, 'i') + dato('Proyecto', lead.tipoProyecto, false, 'd') + '</tr></table></td></tr>';

  const quien = seccion('Quién es',
    fila('Nombre', texto(lead.nombre), true) + fila('Empresa', texto(lead.empresa)) + fila('Rubro', texto(lead.rubro)) +
    fila('Email', '<a href="mailto:' + escapeHtml(lead.email) + '" style="color:' + AZUL + ';font-weight:600;text-decoration:underline;">' + escapeHtml(lead.email) + '</a>') +
    fila('WhatsApp', lead.whatsapp ? (wa ? '<a href="' + wa + '" style="color:' + AZUL + ';font-weight:600;text-decoration:underline;">' + escapeHtml(lead.whatsapp) + '</a>' : escapeHtml(lead.whatsapp)) : vacio()));
  const hoy = seccion('Dónde está hoy',
    fila('Web actual', texto(lead.webActual), true) +
    fila('Links', lead.links && lead.links.trim() ? '<span style="white-space:pre-line;word-break:break-word;">' + escapeHtml(lead.links) + '</span>' : vacio()) +
    fila('Qué no funciona', chips(lead.problemas, '#FBE4DB', '#8A4426')));
  const busca = seccion('Qué busca',
    fila('Objetivos', chips(lead.objetivos, '#E4E4FA', AZUL), true) + fila('Tipo de proyecto', texto(lead.tipoProyecto)) +
    fila('Edición propia', texto(lead.autogestion)) + fila('Material', texto(lead.material)));
  const org = seccion('Cómo se organiza',
    fila('Plazo', texto(lead.plazo), true) + fila('Presupuesto', texto(lead.presupuesto)) + fila('Decide', texto(lead.decisor)));
  const conocer = seccion('Para conocerlo',
    fila('Cómo llegó', texto(lead.comoLlego), true) + fila('Qué valora', chips(lead.valora, CREMA, MARRON)) +
    '<tr><td colspan="2" style="padding:14px 0 12px 0;border-top:1px solid ' + LINEA + ';">' +
    '<div style="font-family:' + TEXTO + ';font-size:11px;line-height:20px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:' + TENUE + ';padding-bottom:8px;">Comentario</div>' +
    (lead.comentario && lead.comentario.trim()
      ? '<div style="padding:14px 18px;border-left:4px solid ' + NARANJA + ';background-color:' + CREMA + ';border-radius:0 14px 14px 0;font-family:' + TEXTO + ';font-size:15px;line-height:24px;color:' + MARRON + ';white-space:pre-line;">' + escapeHtml(lead.comentario) + '</div>'
      : vacio()) + '</td></tr>');

  const pie = '<tr><td bgcolor="' + MARRON + '" style="background-color:' + MARRON + ';border-radius:0 0 28px 28px;padding:26px 36px 28px 36px;">' +
    '<div style="font-family:' + TEXTO + ';font-size:15px;line-height:24px;font-weight:600;color:' + CREMA + ';"><span style="color:' + NARANJA + ';">&#10038;</span>&nbsp; En el formulario prometimos responder en menos de 24 horas.</div>' +
    '<div style="padding-top:8px;font-family:' + TEXTO + ';font-size:12px;line-height:18px;color:#B9A99E;">Mensaje automático del formulario de mergge.com.ar. Podés responder este mail: le llega a ' + escapeHtml(lead.nombre) + '.</div>' +
    '</td></tr>';

  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:0 auto;">' +
    cabecera +
    '<tr><td bgcolor="' + CREMA + '" style="background-color:' + CREMA + ';padding:0 24px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">' + datos + quien + hoy + busca + org + conocer + '</table></td></tr>' +
    pie + '</table>';
}

function documento(lead: LeadData, fecha: string): string {
  const pre = escapeHtml(preheader(lead));
  return '<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"><title>' + escapeHtml(subject(lead)) + '</title></head>' +
    '<body style="margin:0;padding:0;background-color:' + CREMA + ';">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:' + CREMA + ';">' + pre + '</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="' + CREMA + '" style="background-color:' + CREMA + ';"><tr><td align="center" style="padding:24px 12px;">' +
    body(lead, fecha) + '</td></tr></table></body></html>';
}

function fechaAhora(): string {
  return new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "short",
  });
}

export const leadNotificationSubject = subject;

export function leadNotificationHtml(lead: LeadData): string {
  return documento(lead, fechaAhora());
}

// Versión en texto plano: mejora la entrega y es lo que ven los lectores sin HTML.
export function leadNotificationText(lead: LeadData): string {
  const linea = (label: string, valor?: string | string[]) => {
    const v = Array.isArray(valor) ? valor.join(", ") : valor;
    return `${label}: ${v && v.trim() ? v : "Sin responder"}`;
  };
  return [
    `Nuevo lead: ${lead.empresa}`,
    linea("Nombre", lead.nombre),
    linea("Rubro", lead.rubro),
    linea("Email", lead.email),
    linea("WhatsApp", lead.whatsapp),
    linea("Web actual", lead.webActual),
    linea("Links", lead.links),
    linea("Qué no funciona", lead.problemas),
    linea("Objetivos", lead.objetivos),
    linea("Tipo de proyecto", lead.tipoProyecto),
    linea("Edición propia", lead.autogestion),
    linea("Material", lead.material),
    linea("Plazo", lead.plazo),
    linea("Presupuesto", lead.presupuesto),
    linea("Decide", lead.decisor),
    linea("Cómo llegó", lead.comoLlego),
    linea("Qué valora", lead.valora),
    linea("Comentario", lead.comentario),
  ].join("\n");
}
