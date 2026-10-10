/**
 * Utilidades para calcular el contraste de color según WCAG 2.1
 * y verificar la legibilidad de códigos QR.
 */

export interface ContrastQuality {
  ratio: number;
  level: "optimal" | "acceptable" | "low";
  isGoodForQR: boolean;
  scoreLabel: string;
}

export interface ColorPreset {
  name: string;
  hex: string;
}

export const COLOR_PRESETS: ColorPreset[] = [
  { name: "Negro Clásico", hex: "#000000" },
  { name: "Azul Marino", hex: "#1E3A8A" },
  { name: "Índigo", hex: "#4338CA" },
  { name: "Verde Bosque", hex: "#065F46" },
  { name: "Vino Tinto", hex: "#881337" },
  { name: "Púrpura Oscuro", hex: "#581C87" },
  { name: "Gris Carbón", hex: "#1F2937" },
  { name: "Café Moca", hex: "#451A03" },
];

/**
 * Normaliza y expande un string hexadecimal a formato de 6 dígitos sin #.
 */
function normalizeHex(hex: string): string | null {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    return clean
      .split("")
      .map((char) => char + char)
      .join("");
  }
  if (clean.length === 6) {
    return clean;
  }
  return null;
}

/**
 * Convierte un canal sRGB a valor lineal.
 */
function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

/**
 * Calcula la luminancia relativa (0 a 1) según WCAG 2.1.
 */
export function getRelativeLuminance(hex: string): number {
  const normalized = normalizeHex(hex);
  if (!normalized) return 0; // Default a oscuro si es inválido

  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);

  const rLinear = srgbToLinear(r);
  const gLinear = srgbToLinear(g);
  const bLinear = srgbToLinear(b);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calcula el ratio de contraste entre dos colores (por defecto contra fondo blanco #FFFFFF).
 * El resultado va de 1:1 (sin contraste) a 21:1 (máximo contraste, negro sobre blanco).
 */
export function getContrastRatio(foregroundHex: string, backgroundHex = "#FFFFFF"): number {
  const lum1 = getRelativeLuminance(foregroundHex);
  const lum2 = getRelativeLuminance(backgroundHex);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 10) / 10;
}

/**
 * Evalúa la calidad de legibilidad del código QR con base en su contraste contra fondo blanco.
 */
export function evaluateQRContrast(hex: string): ContrastQuality {
  const ratio = getContrastRatio(hex, "#FFFFFF");

  if (ratio >= 7) {
    return {
      ratio,
      level: "optimal",
      isGoodForQR: true,
      scoreLabel: "Excelente",
    };
  }

  if (ratio >= 4) {
    return {
      ratio,
      level: "acceptable",
      isGoodForQR: true,
      scoreLabel: "Aceptable",
    };
  }

  return {
    ratio,
    level: "low",
    isGoodForQR: false,
    scoreLabel: "Bajo (Poco legible)",
  };
}
