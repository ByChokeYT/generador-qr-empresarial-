/**
 * Logotipos oficiales predefinidos para incrustar en el centro de los códigos QR.
 * Diseñados con vectores SVG escalables oficiales de empresas y servicios.
 */

export interface PresetLogo {
  id: string;
  name: string;
  category: "enterprise" | "social" | "services";
  bgColor: string;
  svg: string;
}

export const LOGO_CATEGORIES = [
  { id: "all", label: "Todos los logos", icon: "Sparkles" },
  { id: "enterprise", label: "Empresas & Pagos", icon: "Building2" },
  { id: "social", label: "Redes & Chat", icon: "MessageCircle" },
  { id: "services", label: "Servicios", icon: "Wrench" },
] as const;

export const PRESET_LOGOS: PresetLogo[] = [
  // 🏢 EMPRESAS & PAGOS
  {
    id: "google",
    name: "Google",
    category: "enterprise",
    bgColor: "#FFFFFF",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="100" height="100">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.55 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.55 10.79l7.98-6.2z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>`,
  },
  {
    id: "apple",
    name: "Apple",
    category: "enterprise",
    bgColor: "#000000",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="96" x="2" y="2" rx="24" fill="#000000"/>
      <path fill="#FFFFFF" d="M68.5 70.3c-2.1 3.1-4.3 6.1-7.7 6.2-3.3.1-4.4-2-8.2-2s-5 1.9-8.2 2c-3.3.1-5.8-3.3-7.9-6.3-4.3-6.2-7.6-17.5-3.1-25.2 2.2-3.8 6.1-6.2 10.3-6.3 3.2 0 6.2 2.2 8.2 2.2s5.6-2.7 9.5-2.3c1.6.1 6.2.6 9.1 4.9-.2.2-5.4 3.2-5.4 9.5.1 7.5 6.6 10.1 6.7 10.1-.1.2-1 3.6-3.3 7.2zM61.6 37.4c1.6-1.9 2.6-4.6 2.3-7.2-2.3.1-5 1.5-6.7 3.4-1.5 1.7-2.7 4.4-2.4 7 2.5.2 5.1-1.3 6.8-3.2z"/>
    </svg>`,
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    category: "enterprise",
    bgColor: "#009EE3",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="96" x="2" y="2" rx="24" fill="#009EE3"/>
      <path fill="#FFFFFF" d="M50 22c-15.5 0-28 12.5-28 28s12.5 28 28 28 28-12.5 28-28-12.5-28-28-28zm14.8 33.8l-8.9 8.9c-1.8 1.8-4.2 2.8-6.7 2.8s-4.9-1-6.7-2.8l-3.4-3.4-4.5 4.5c-3.7 3.7-9.7 3.7-13.4 0s-3.7-9.7 0-13.4l7.7-7.7c1.8-1.8 4.2-2.8 6.7-2.8s4.9 1 6.7 2.8l3.4 3.4 5.8-5.8c3.7-3.7 9.7-3.7 13.4 0 3.8 3.7 3.8 9.7 0 13.5zm-5.7-9.8c-1.8-1.8-4.7-1.8-6.5 0l-5.8 5.8-3.4-3.4c-.9-.9-2.1-1.4-3.3-1.4s-2.4.5-3.3 1.4l-7.7 7.7c-1.8 1.8-1.8 4.7 0 6.5s4.7 1.8 6.5 0l4.5-4.5 3.4 3.4c.9.9 2.1 1.4 3.3 1.4s2.4-.5 3.3-1.4l8.9-8.9c1.8-1.8 1.8-4.7.1-6.5z"/>
    </svg>`,
  },
  {
    id: "paypal",
    name: "PayPal",
    category: "enterprise",
    bgColor: "#003087",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="96" x="2" y="2" rx="24" fill="#003087"/>
      <g transform="translate(18, 16) scale(0.65)">
        <path fill="#0079C1" d="M63.3 25.1C62.1 33.5 56.4 38 48 38H33.5L25 91.5h16.2l4.8-30.5h9.8c14.6 0 24.5-7.7 26.6-22.3.9-6.3-.5-10.8-4.1-13.6z"/>
        <path fill="#00457C" d="M48 38c8.4 0 14.1-4.5 15.3-12.9.2-1.3.1-2.5-.2-3.6-1.5 6.2-6.5 10.3-14.8 10.3h-14l-3.3 21h10.2L48 38z"/>
        <path fill="#FFFFFF" d="M51.5 12.8C49.9 5.2 43.6 0 34.3 0H9.5C7.5 0 5.8 1.5 5.5 3.5L.2 37.1c-.3 2 .1 3.8 1.4 4.8 1 .8 2.4 1.3 4 1.3h14.7l3.7-23.4h11.2c8.2 0 14.3 3.5 16.3 13z"/>
      </g>
    </svg>`,
  },

  // 💬 REDES SOCIALES & CHAT
  {
    id: "whatsapp",
    name: "WhatsApp",
    category: "social",
    bgColor: "#25D366",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#25D366"/>
      <path fill="#FFFFFF" d="M50 17C31.8 17 17 31.8 17 50c0 6.4 1.8 12.4 5.1 17.5L18 83l16-4.2c4.9 2.7 10.5 4.2 16 4.2 18.2 0 33-14.8 33-33S68.2 17 50 17zm19.3 46.5c-.8 2.2-4 4.2-5.6 4.4-1.5.2-3.4.3-11.3-3-9.7-4-15.9-14-16.4-14.7-.5-.7-4-5.4-4-10.2 0-4.9 2.5-7.3 3.4-8.2.9-.9 2-1.3 2.7-1.3.7 0 1.4 0 2 .1.7 0 1.6-.2 2.5 1.9.9 2.2 3 7.5 3.3 8 .3.6.5 1.3.1 2.1-.4.8-.6 1.3-1.2 2-.6.7-1.2 1.5-1.8 2-.6.6-1.2 1.3-.5 2.5 1.6 2.6 4.3 5.5 7.6 7.8 3.5 2.5 6.5 3.3 7.7 3.9 1.2.5 2 .4 2.7-.4.7-.8 3-3.5 3.8-4.8.8-1.2 1.7-1 2.7-.6 1.1.4 7.1 3.3 8.3 3.9 1.2.6 2.1 1 2.4 1.5.3.7.3 3.6-.5 5.9z"/>
    </svg>`,
  },
  {
    id: "telegram",
    name: "Telegram",
    category: "social",
    bgColor: "#24A1DE",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#24A1DE"/>
      <path fill="#FFFFFF" d="M22 48.5l45.2-18.7c2.1-.8 4 .5 3.3 3.6l-7.7 36.3c-.6 2.6-2.1 3.2-4.3 2l-11.8-8.7-5.7 5.5c-.6.6-1.2 1.2-2.4 1.2l.9-12.1 22.1-20c1-.9-.2-1.3-1.4-.5L32.8 54.4l-11.8-3.7c-2.5-.8-2.6-2.5 1-2.2z"/>
    </svg>`,
  },
  {
    id: "instagram",
    name: "Instagram",
    category: "social",
    bgColor: "#E1306C",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <defs>
        <radialGradient id="igGrad2" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stop-color="#fdf497"/>
          <stop offset="5%" stop-color="#fdf497"/>
          <stop offset="45%" stop-color="#fd5949"/>
          <stop offset="60%" stop-color="#d6249f"/>
          <stop offset="90%" stop-color="#285AEB"/>
        </radialGradient>
      </defs>
      <rect width="96" height="96" x="2" y="2" rx="26" fill="url(#igGrad2)"/>
      <rect width="52" height="52" x="24" y="24" rx="14" fill="none" stroke="#FFFFFF" stroke-width="7"/>
      <circle cx="50" cy="50" r="13" fill="none" stroke="#FFFFFF" stroke-width="7"/>
      <circle cx="63.5" cy="36.5" r="3.5" fill="#FFFFFF"/>
    </svg>`,
  },
  {
    id: "tiktok",
    name: "TikTok",
    category: "social",
    bgColor: "#000000",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="96" x="2" y="2" rx="24" fill="#000000"/>
      <path fill="#25F4EE" d="M68 36c-4.8-.8-9.4-3.5-12.4-7.4v26.8c0 11.2-9.1 20.3-20.3 20.3-4.8 0-9.2-1.7-12.8-4.6 2.8 2.6 6.5 4.2 10.7 4.2 8.9 0 16.2-7.3 16.2-16.2V32.4c3.4 4.5 8.7 7.5 14.6 8v-4.4z"/>
      <path fill="#FE2C55" d="M64 34c-4.8-.8-9.4-3.5-12.4-7.4v26.8c0 11.2-9.1 20.3-20.3 20.3-4.8 0-9.2-1.7-12.8-4.6 2.8 2.6 6.5 4.2 10.7 4.2 8.9 0 16.2-7.3 16.2-16.2V30.4c3.4 4.5 8.7 7.5 14.6 8v-4.4z"/>
      <path fill="#FFFFFF" d="M66 35c-4.8-.8-9.4-3.5-12.4-7.4v26.8c0 11.2-9.1 20.3-20.3 20.3-4.8 0-9.2-1.7-12.8-4.6 2.8 2.6 6.5 4.2 10.7 4.2 8.9 0 16.2-7.3 16.2-16.2V31.4c3.4 4.5 8.7 7.5 14.6 8v-4.4z"/>
    </svg>`,
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "social",
    bgColor: "#FF0000",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="68" x="2" y="16" rx="20" fill="#FF0000"/>
      <polygon points="42,35 66,50 42,65" fill="#FFFFFF"/>
    </svg>`,
  },
  {
    id: "facebook",
    name: "Facebook",
    category: "social",
    bgColor: "#1877F2",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#1877F2"/>
      <path fill="#FFFFFF" d="M57 98V58h13.4l2-15.6H57v-10c0-4.5 1.3-7.6 7.7-7.6h8.2V11c-1.4-.2-6.3-.6-12-0.6-11.8 0-20 7.2-20 20.5v11.5H37.5v15.6H51v40h6z"/>
    </svg>`,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "social",
    bgColor: "#0A66C2",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="96" x="2" y="2" rx="22" fill="#0A66C2"/>
      <circle cx="30" cy="28" r="8" fill="#FFFFFF"/>
      <rect x="22" y="42" width="16" height="38" fill="#FFFFFF"/>
      <path fill="#FFFFFF" d="M48 42h15v5.5c2.3-4.2 7.8-6.5 13-6.5 12 0 16 7.9 16 18.2V80H77V61.5c0-4.6-.9-9-6.3-9-5.4 0-6.7 4.6-6.7 9.2V80H48V42z"/>
    </svg>`,
  },
  {
    id: "x",
    name: "X (Twitter)",
    category: "social",
    bgColor: "#000000",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="96" x="2" y="2" rx="24" fill="#000000"/>
      <path fill="#FFFFFF" d="M69 22H79L57 47.2 83 80H63.2L47.7 59.7 30 80H20l23.5-26.9L18 22h20.3l14 18.5L69 22zm-3.5 52h5.5L35.8 27.6h-6L65.5 74z"/>
    </svg>`,
  },
  {
    id: "spotify",
    name: "Spotify",
    category: "social",
    bgColor: "#1DB954",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#1DB954"/>
      <path fill="#FFFFFF" d="M72 45.4c-15.6-9.3-41.2-10.1-56-5.6-2.4.7-5-0.7-5.7-3.1s.7-5 3.1-5.7c17-5.2 45.2-4.2 63.3 6.5 2.1 1.3 2.9 4.1 1.6 6.3-1.3 2.1-4.1 2.9-6.3 1.6zm.5 12.8c-1.1 1.7-3.4 2.3-5.1 1.2-12.8-7.9-32.3-10.2-47.4-5.6-2 .6-4.1-.5-4.7-2.5-.6-2 .5-4.1 2.5-4.7 17.3-5.2 38.7-2.7 53.5 6.4 1.7 1 2.2 3.3 1.2 5.2zm-1.8 12.3c-.9 1.4-2.7 1.9-4.1 1-11.2-6.8-25.2-8.4-41.8-4.6-1.6.4-3.2-.6-3.6-2.2-.4-1.6.6-3.2 2.2-3.6 18.2-4.1 33.7-2.4 46.2 5.3 1.4.9 1.9 2.7 1.1 4.1z"/>
    </svg>`,
  },
  {
    id: "discord",
    name: "Discord",
    category: "social",
    bgColor: "#5865F2",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <rect width="96" height="96" x="2" y="2" rx="24" fill="#5865F2"/>
      <path fill="#FFFFFF" d="M69.8 30.5c-4.9-2.3-10.2-3.9-15.7-4.7-.2.4-.4.8-.6 1.3-6-0.9-12-0.9-17.9 0-.2-.5-.4-.9-.6-1.3-5.5.8-10.8 2.4-15.7 4.7-9.8 14.6-12.5 28.8-11.2 42.8 6.5 4.8 12.8 7.7 19 9.6 1.6-2.1 2.9-4.4 4-6.9-2.2-.8-4.4-1.9-6.3-3.2.5-.4 1.1-.8 1.6-1.2 12.3 5.7 25.7 5.7 37.8 0 .5.4 1.1.8 1.6 1.2-2 1.3-4.1 2.4-6.3 3.2 1.1 2.4 2.5 4.8 4 6.9 6.2-1.9 12.5-4.8 19-9.6 1.5-16.2-2.5-30.3-11.3-42.8zM36.2 59.8c-3.8 0-6.9-3.5-6.9-7.8s3-7.8 6.9-7.8c3.9 0 7 3.5 6.9 7.8 0 4.3-3 7.8-6.9 7.8zm27.6 0c-3.8 0-6.9-3.5-6.9-7.8s3-7.8 6.9-7.8c3.9 0 7 3.5 6.9 7.8 0 4.3-3 7.8-6.9 7.8z"/>
    </svg>`,
  },
  {
    id: "github",
    name: "GitHub",
    category: "social",
    bgColor: "#181717",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#181717"/>
      <path fill="#FFFFFF" d="M50 16C31.2 16 16 31.2 16 50c0 15 9.7 27.8 23.2 32.3 1.7.3 2.3-.7 2.3-1.6v-6.3c-9.5 2.1-11.5-4-11.5-4-1.5-3.9-3.7-4.9-3.7-4.9-3.1-2.1.2-2.1.2-2.1 3.4.2 5.2 3.5 5.2 3.5 3 5.2 8 3.7 10 2.8.3-2.2 1.2-3.7 2.2-4.6-7.6-.9-15.6-3.8-15.6-16.9 0-3.7 1.3-6.8 3.5-9.2-.3-.9-1.5-4.4.3-9.1 0 0 2.9-.9 9.4 3.5 2.7-.8 5.7-1.1 8.6-1.1s5.9.4 8.6 1.1c6.5-4.4 9.4-3.5 9.4-3.5 1.9 4.8.7 8.3.3 9.1 2.2 2.4 3.5 5.5 3.5 9.2 0 13.2-8 16-15.6 16.9 1.2 1 2.4 3.1 2.4 6.3v9.3c0 .9.6 2 2.3 1.6C74.3 77.8 84 65 84 50c0-18.8-15.2-34-34-34z"/>
    </svg>`,
  },

  // ⚡ SERVICIOS & UTILIDADES
  {
    id: "maps",
    name: "Google Maps",
    category: "services",
    bgColor: "#EA4335",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#EA4335"/>
      <path fill="#FFFFFF" d="M50 18c-13 0-23.5 10.5-23.5 23.5 0 17.6 23.5 43.1 23.5 43.1s23.5-25.5 23.5-43.1C73.5 28.5 63 18 50 18zm0 32.5c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z"/>
    </svg>`,
  },
  {
    id: "wifi",
    name: "WiFi",
    category: "services",
    bgColor: "#6366F1",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#6366F1"/>
      <path fill="#FFFFFF" d="M50 67a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm-19.8-12.7a28 28 0 0 1 39.6 0l5.7-5.6a36 36 0 0 0-51 0l5.7 5.6zm-11.3-11.3a44 44 0 0 1 62.2 0l5.7-5.7a52 52 0 0 0-73.6 0l5.7 5.7z"/>
    </svg>`,
  },
  {
    id: "contact",
    name: "Contacto",
    category: "services",
    bgColor: "#3B82F6",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#3B82F6"/>
      <circle cx="50" cy="38" r="16" fill="#FFFFFF"/>
      <path fill="#FFFFFF" d="M50 60c-18 0-32 10-32 20v4h64v-4c0-10-14-20-32-20z"/>
    </svg>`,
  },
  {
    id: "email",
    name: "Email",
    category: "services",
    bgColor: "#EF4444",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="#EF4444"/>
      <rect x="22" y="30" width="56" height="40" rx="6" fill="#FFFFFF"/>
      <polygon points="50,54 26,34 74,34" fill="#EF4444"/>
    </svg>`,
  },
];

/**
 * Convierte un SVG en un Data URL PNG transparente de 220x220 píxeles.
 * Proporciona máxima compatibilidad con el motor Sharp del backend.
 */
export async function svgToPngDataUrl(svgString: string, size = 220): Promise<string> {
  return new Promise((resolve) => {
    try {
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, size, size);
            ctx.drawImage(img, 0, 0, size, size);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/png"));
            return;
          }
        } catch {
          // Fallback a blob url
        }
        URL.revokeObjectURL(url);
        const base64 = btoa(unescape(encodeURIComponent(svgString)));
        resolve(`data:image/svg+xml;base64,${base64}`);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        const base64 = btoa(unescape(encodeURIComponent(svgString)));
        resolve(`data:image/svg+xml;base64,${base64}`);
      };

      img.src = url;
    } catch {
      const base64 = btoa(unescape(encodeURIComponent(svgString)));
      resolve(`data:image/svg+xml;base64,${base64}`);
    }
  });
}

/**
 * Retorna el ID del logo predeterminado sugerido según el tipo de código QR.
 */
export function getDefaultLogoForType(type: string): string | null {
  switch (type) {
    case "whatsapp":
      return "whatsapp";
    case "wifi":
      return "wifi";
    case "vcard":
      return "contact";
    case "email":
      return "email";
    case "location":
      return "maps";
    default:
      return null;
  }
}
