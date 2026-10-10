export type QRType = "url" | "whatsapp" | "wifi" | "text" | "vcard" | "email" | "location";
export type OutputFormat = "jpg" | "png" | "pdf" | "svg";
export type Language = "es" | "en" | "pt";
export type WiFiSecurity = "WPA" | "WPA2" | "WEP" | "nopass";

export interface VCardData {
  firstName: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
  title?: string;
  website?: string;
}

export interface EmailData {
  to: string;
  subject?: string;
  body?: string;
}

export interface LocationData {
  query?: string;
  latitude?: string;
  longitude?: string;
}

export interface QRFormData {
  url: string;
  whatsappMessage: string;
  wifiSSID: string;
  wifiPassword: string;
  wifiSecurity: WiFiSecurity;
  wifiHidden: boolean;
  textContent: string;
  vcardData?: VCardData;
  emailData?: EmailData;
  locationData?: LocationData;
  type: QRType;
  qrSize: number;
  enableLogo: boolean;
  logoFile: File | null;
  outputFormat: OutputFormat;
  qrColor: string;
}

export type LogoShape = "squircle" | "circle" | "none";
export type LogoSize = "small" | "medium" | "large";

export interface QRGenerateRequest {
  url: string;
  size: number;
  logo: string | null;
  format: OutputFormat;
  color: string;
  logoShape?: LogoShape;
  logoSize?: LogoSize;
}

export interface QRGenerateResponse {
  qrCode: string;
  size?: number;
  warning?: string;
  error?: string;
}

