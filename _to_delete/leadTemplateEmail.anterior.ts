import type { LeadData } from "../services/leadService";

// El lead viene de un formulario público sin auth — hay que escapar antes de
// meterlo en HTML, si no cualquiera puede inyectar markup en el mail que le
// llega a Mergge.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function leadNotificationHtml(lead: LeadData): string {
  const nombre = escapeHtml(lead.nombre);
  const empresa = escapeHtml(lead.empresa);
  const email = escapeHtml(lead.email);
  const whatsapp = escapeHtml(lead.whatsapp ?? "");
  const rubro = escapeHtml(lead.rubro ?? "");
  const comentario = lead.comentario ? escapeHtml(lead.comentario) : "";

  const fecha = new Date().toLocaleString("es-AR", {
    timeZone: "America/Argentina/Buenos_Aires",
    dateStyle: "short",
    timeStyle: "short",
  });

  return `
    <div style=" font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; color: #1f2937; "> <p style=" margin: 0 0 24px; font-size: 13px; color: #6b7280; "> <em>${fecha}</em> </p> <h1 style=" margin: 0 0 20px; font-size: 24px; line-height: 1.3; color: #111827; "> Nuevo lead: <span style="color: #2563eb;">${empresa}</span> </h1> <div style=" margin-bottom: 20px; padding: 16px; background-color: #f9fafb; border-radius: 8px; "> <p style=" margin: 0 0 8px; font-size: 16px; color: #111827; "> <strong>${nombre}</strong> </p> <p style=" margin: 0; font-size: 14px; line-height: 1.7; color: #4b5563; "> 📧 ${email}<br> 📱 ${whatsapp} </p> </div> <p style=" display: inline-block; margin: 0 0 20px; padding: 6px 12px; background-color: #eff6ff; border-radius: 999px; font-size: 13px; font-weight: 600; color: #2563eb; "> ${rubro} </p> ${comentario ? ` <div style=" margin-top: 4px; padding: 16px; border-left: 3px solid #2563eb; background-color: #f9fafb; border-radius: 0 8px 8px 0; "> <p style=" margin: 0; font-size: 14px; line-height: 1.6; color: #374151; "> ${comentario} </p> </div> ` : ""} </div>
  `;
}
