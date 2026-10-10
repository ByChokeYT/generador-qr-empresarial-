import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  Link,
  MessageCircle,
  Image as ImageIcon,
  Wifi,
  Eye,
  EyeOff,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Info,
  Palette,
  User,
  Mail,
  MapPin,
  Building2,
  Phone,
  Globe,
  Briefcase,
  Sliders,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { QR_CONFIG } from "../../constants";
import type { UseQRGeneratorReturn } from "../../hooks/useQRGenerator";
import type { WiFiSecurity, LogoSize } from "../../types";
import { evaluateQRContrast, COLOR_PRESETS } from "../../utils/contrastUtils";
import { PRESET_LOGOS, LOGO_CATEGORIES } from "../../utils/logoPresets";

interface QRFormProps {
  qrGenerator: UseQRGeneratorReturn;
}

export const QRForm = ({ qrGenerator }: QRFormProps) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [logoCategory, setLogoCategory] = useState<string>("all");
  const {
    url,
    setUrl,
    whatsappMessage,
    setWhatsappMessage,
    wifiSSID,
    setWifiSSID,
    wifiPassword,
    setWifiPassword,
    wifiSecurity,
    setWifiSecurity,
    wifiHidden,
    setWifiHidden,
    textContent,
    setTextContent,
    vcardFirstName,
    setVcardFirstName,
    vcardLastName,
    setVcardLastName,
    vcardPhone,
    setVcardPhone,
    vcardEmail,
    setVcardEmail,
    vcardCompany,
    setVcardCompany,
    vcardTitle,
    setVcardTitle,
    vcardWebsite,
    setVcardWebsite,
    emailTo,
    setEmailTo,
    emailSubject,
    setEmailSubject,
    emailBody,
    setEmailBody,
    locationQuery,
    setLocationQuery,
    locationLatitude,
    setLocationLatitude,
    locationLongitude,
    setLocationLongitude,
    type,
    handleTypeChange,
    qrSize,
    setQrSize,
    enableLogo,
    setEnableLogo,
    logoPreview,
    selectedPresetLogo,
    selectPresetLogo,
    logoShape,
    setLogoShape,
    logoSize,
    setLogoSize,
    outputFormat,
    setOutputFormat,
    qrColor,
    setQrColor,
    loading,
    handleLogoChange,
    generateQRCode,
  } = qrGenerator;

  const contrast = evaluateQRContrast(qrColor);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-5 lg:p-6 rounded-lg shadow-md transition-colors">
      <div className="space-y-4">
        {/* Selector de Tipo de QR */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
          <button
            type="button"
            onClick={() => handleTypeChange("url")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium justify-center transition-all ${
              type === "url"
                ? "bg-blue-600 text-white shadow-md scale-102"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Link className="h-4 w-4" />
            <span>URL</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("whatsapp")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium justify-center transition-all ${
              type === "whatsapp"
                ? "bg-green-600 text-white shadow-md scale-102"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("wifi")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium justify-center transition-all ${
              type === "wifi"
                ? "bg-purple-600 text-white shadow-md scale-102"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Wifi className="h-4 w-4" />
            <span>WiFi</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("vcard")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium justify-center transition-all ${
              type === "vcard"
                ? "bg-indigo-600 text-white shadow-md scale-102"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Contacto</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("email")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium justify-center transition-all ${
              type === "email"
                ? "bg-rose-600 text-white shadow-md scale-102"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("location")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium justify-center transition-all ${
              type === "location"
                ? "bg-red-600 text-white shadow-md scale-102"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <MapPin className="h-4 w-4" />
            <span>Ubicación</span>
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange("text")}
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs sm:text-sm font-medium justify-center transition-all ${
              type === "text"
                ? "bg-orange-600 text-white shadow-md scale-102"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>{t("form.text")}</span>
          </button>
        </div>

        {/* Campos según el tipo */}
        {type === "vcard" ? (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex items-start gap-2.5 text-xs text-indigo-800 dark:text-indigo-300">
              <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Tarjeta de Contacto Digital (vCard):</strong> Al escanear este código con la cámara, el teléfono ofrecerá agregar tu contacto automáticamente a la agenda.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={vcardFirstName}
                  onChange={(e) => setVcardFirstName(e.target.value)}
                  placeholder="Ej: Jose Luis"
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Apellido</label>
                <input
                  type="text"
                  value={vcardLastName}
                  onChange={(e) => setVcardLastName(e.target.value)}
                  placeholder="Ej: Choquevillca"
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Teléfono Móvil</label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    placeholder="+54 9 11 1234-5678"
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    placeholder="contacto@ejemplo.com"
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa / Negocio</label>
                <div className="relative">
                  <Building2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={vcardCompany}
                    onChange={(e) => setVcardCompany(e.target.value)}
                    placeholder="Empresa o proyecto"
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cargo / Profesión</label>
                <div className="relative">
                  <Briefcase className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={vcardTitle}
                    onChange={(e) => setVcardTitle(e.target.value)}
                    placeholder="Ej: Desarrollador / CEO"
                    className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sitio Web / Portafolio</label>
              <div className="relative">
                <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="url"
                  value={vcardWebsite}
                  onChange={(e) => setVcardWebsite(e.target.value)}
                  placeholder="https://bychokeportafolio.netlify.app/"
                  className="pl-8 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border"
                />
              </div>
            </div>
          </div>
        ) : type === "email" ? (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex items-start gap-2.5 text-xs text-rose-800 dark:text-rose-300">
              <Mail className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Enviar Correo Electrónico:</strong> Al escanear con la cámara, abrirá la app de correo del teléfono lista para enviar al destinatario.
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Destinatario (Email) *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder="contacto@ejemplo.com"
                  className="pl-9 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 sm:p-2.5 text-sm sm:text-base border"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Asunto del correo
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Ej: Consulta sobre servicios"
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 sm:p-2.5 text-sm sm:text-base border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Mensaje predeterminado (Opcional)
              </label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Escribe el cuerpo del mensaje que se completará automáticamente..."
                rows={3}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 sm:p-2.5 text-sm sm:text-base border"
              />
            </div>
          </div>
        ) : type === "location" ? (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex items-start gap-2.5 text-xs text-red-800 dark:text-red-300">
              <MapPin className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Ubicación en Google Maps:</strong> Al escanear, abrirá directamente la app de mapas para mostrar la dirección o iniciar la navegación GPS.
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Dirección o Nombre del Lugar
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                <input
                  type="text"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Ej: Obelisco, Buenos Aires o nombre de tu negocio"
                  className="pl-9 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 sm:p-2.5 text-sm sm:text-base border"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Opcional: Coordenadas GPS exactas
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Latitud</label>
                  <input
                    type="text"
                    value={locationLatitude}
                    onChange={(e) => setLocationLatitude(e.target.value)}
                    placeholder="-34.6037"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Longitud</label>
                  <input
                    type="text"
                    value={locationLongitude}
                    onChange={(e) => setLocationLongitude(e.target.value)}
                    placeholder="-58.3816"
                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm p-2 text-sm border font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : type === "text" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("form.textLabel")}
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 h-4 w-4 sm:h-5 sm:w-5 z-10 pointer-events-none" />
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder={t("form.textPlaceholder")}
                className="pl-9 sm:pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border"
                rows={4}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {t("form.textHint")}
            </p>
          </div>
        ) : type === "wifi" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("form.wifiSSID")}
              </label>
              <div className="relative">
                <Wifi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 sm:h-5 sm:w-5 z-10 pointer-events-none" />
                <input
                  type="text"
                  value={wifiSSID}
                  onChange={(e) => setWifiSSID(e.target.value)}
                  placeholder={t("form.wifiSSIDPlaceholder")}
                  className="pl-9 sm:pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("form.wifiPassword")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                  placeholder={t("form.wifiPasswordPlaceholder")}
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 pr-10 text-sm sm:text-base border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                  aria-label={showPassword ? t("form.hidePassword") : t("form.showPassword")}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("form.wifiSecurity")}
              </label>
              <select
                value={wifiSecurity}
                onChange={(e) => setWifiSecurity(e.target.value as WiFiSecurity)}
                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Sin contraseña</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="wifiHidden"
                checked={wifiHidden}
                onChange={(e) => setWifiHidden(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="wifiHidden"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                {t("form.wifiHidden")}
              </label>
            </div>
          </div>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {type === "url" ? t("form.urlLabel") : t("form.whatsappLabel")}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                {type === "url" ? (
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 sm:h-5 sm:w-5 z-10 pointer-events-none" />
                ) : (
                  <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4 sm:h-5 sm:w-5 z-10 pointer-events-none" />
                )}
                <input
                  type={type === "url" ? "url" : "tel"}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={
                    type === "url" ? t("form.urlPlaceholder") : t("form.whatsappPlaceholder")
                  }
                  className="pl-9 sm:pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border relative"
                  style={{
                    isolation: "isolate",
                    contain: "layout style paint",
                  }}
                />
              </div>
            </div>

            {/* Campo de mensaje para WhatsApp */}
            {type === "whatsapp" && (
              <div className="mt-4 isolate">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("form.whatsappMessage")}
                </label>
                <textarea
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                  placeholder={t("form.whatsappMessagePlaceholder")}
                  className="mt-1 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 border text-sm sm:text-base"
                  rows={3}
                  style={{
                    isolation: "isolate",
                    contain: "layout style paint",
                  }}
                />
              </div>
            )}
          </>
        )}

        {/* Slider de tamaño */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            {t("form.sizeLabel")}
          </label>
          <div
            className="relative"
            onDragStart={(e) => e.preventDefault()}
            onDrag={(e) => e.preventDefault()}
            onDragEnd={(e) => e.preventDefault()}
          >
            <input
              type="range"
              min={QR_CONFIG.MIN_SIZE}
              max={QR_CONFIG.MAX_SIZE}
              step={QR_CONFIG.STEP_SIZE}
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onDragStart={(e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
              draggable="false"
              className="w-full h-5 bg-transparent cursor-pointer slider select-none"
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">{t("form.lowQuality")}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {qrSize} x {qrSize} Px
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{t("form.highQuality")}</span>
          </div>
        </div>

        {/* Opción de logo central */}
        <div className="mt-6 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/60 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enableLogo"
                checked={enableLogo}
                onChange={(e) => {
                  setEnableLogo(e.target.checked);
                  if (!e.target.checked) {
                    selectPresetLogo(null);
                  }
                }}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="enableLogo"
                className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Logo oficial o icono en el centro del QR
              </label>
            </div>

            {enableLogo && logoPreview && (
              <button
                type="button"
                onClick={() => selectPresetLogo(null)}
                className="text-xs font-medium text-red-600 dark:text-red-400 hover:underline"
              >
                Quitar logo
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Incrusta un logo de marca o icono oficial en el centro para darle identidad y confianza a tu código QR.
          </p>

          {enableLogo && (
            <div className="space-y-4 pt-3 border-t border-gray-200 dark:border-gray-700">
              {/* Pestañas de categorías de marcas */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    Logos corporativos y oficiales:
                  </span>
                  <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">
                    {PRESET_LOGOS.length} disponibles
                  </span>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-2.5 scrollbar-none">
                  {LOGO_CATEGORIES.map((cat) => {
                    const isCatActive = logoCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setLogoCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                          isCatActive
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-gray-100 dark:bg-gray-700/80 text-gray-600 dark:text-gray-300 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Grilla de logos filtrados */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {PRESET_LOGOS.filter(
                    (logo) => logoCategory === "all" || logo.category === logoCategory
                  ).map((logo) => {
                    const isSelected = selectedPresetLogo === logo.id;
                    return (
                      <button
                        key={logo.id}
                        type="button"
                        onClick={() => selectPresetLogo(logo.id)}
                        className={`p-2 rounded-lg flex flex-col items-center justify-center gap-1 text-center transition-all border ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 ring-2 ring-blue-400 scale-105 shadow-sm"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 shadow-xs hover:scale-102"
                        }`}
                        title={logo.name}
                      >
                        <div
                          className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden shadow-xs"
                          dangerouslySetInnerHTML={{ __html: logo.svg }}
                        />
                        <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">
                          {logo.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subir archivo propio */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5">
                  O subir tu propio logo (PNG / JPG / SVG):
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="block w-full text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/50 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-800 cursor-pointer"
                />
              </div>

              {/* Controles del Molde Central y Tamaño */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-blue-500" />
                      Molde central del QR:
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      Forma de protección
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setLogoShape("squircle")}
                      className={`p-2 rounded-lg flex flex-col items-center gap-1 text-center border transition-all ${
                        logoShape === "squircle"
                          ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/40 ring-2 ring-blue-400 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-6 h-6 rounded-md bg-white dark:bg-gray-700 border-2 border-current shadow-xs flex items-center justify-center text-[10px] font-bold">
                        ■
                      </div>
                      <span className="text-[11px] font-medium leading-tight">Burbuja Suave</span>
                      <span className="text-[9px] text-gray-400 dark:text-gray-500">Recomendado</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLogoShape("circle")}
                      className={`p-2 rounded-lg flex flex-col items-center gap-1 text-center border transition-all ${
                        logoShape === "circle"
                          ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/40 ring-2 ring-blue-400 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-white dark:bg-gray-700 border-2 border-current shadow-xs flex items-center justify-center text-[10px] font-bold">
                        ●
                      </div>
                      <span className="text-[11px] font-medium leading-tight">Circular</span>
                      <span className="text-[9px] text-gray-400 dark:text-gray-500">Para redondos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setLogoShape("none")}
                      className={`p-2 rounded-lg flex flex-col items-center gap-1 text-center border transition-all ${
                        logoShape === "none"
                          ? "border-blue-500 bg-blue-50/80 dark:bg-blue-900/40 ring-2 ring-blue-400 text-blue-700 dark:text-blue-300"
                          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-gray-300"
                      }`}
                    >
                      <div className="w-6 h-6 rounded bg-transparent border-2 border-dashed border-current flex items-center justify-center text-[10px]">
                        ✕
                      </div>
                      <span className="text-[11px] font-medium leading-tight">Flotante</span>
                      <span className="text-[9px] text-gray-400 dark:text-gray-500">Sin fondo</span>
                    </button>
                  </div>
                </div>

                {/* Selector de Tamaño del logo */}
                <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Escala del logo:
                  </span>
                  <div className="inline-flex rounded-md shadow-xs" role="group">
                    {(["small", "medium", "large"] as LogoSize[]).map((sizeKey) => (
                      <button
                        key={sizeKey}
                        type="button"
                        onClick={() => setLogoSize(sizeKey)}
                        className={`px-2.5 py-1 text-xs font-medium border first:rounded-l-md last:rounded-r-md transition-colors ${
                          logoSize === sizeKey
                            ? "bg-blue-600 text-white border-blue-600 z-10"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                        }`}
                      >
                        {sizeKey === "small" ? "Pequeño (18%)" : sizeKey === "medium" ? "Medio (22%)" : "Grande (26%)"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview del logo seleccionado */}
              {logoPreview && (
                <div className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50">
                  <div
                    className={`w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1.5 shadow-xs overflow-hidden ${
                      logoShape === "circle"
                        ? "rounded-full"
                        : logoShape === "squircle"
                        ? "rounded-xl"
                        : "rounded-none"
                    }`}
                  >
                    <img
                      src={logoPreview}
                      alt="Logo en centro"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">
                        Logo activo en el molde central
                      </p>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                        <ShieldCheck className="w-3 h-3 mr-0.5" />
                        Nivel H
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                      {selectedPresetLogo
                        ? `Oficial: ${PRESET_LOGOS.find((l) => l.id === selectedPresetLogo)?.name} · Molde: ${
                            logoShape === "circle" ? "Círculo" : logoShape === "squircle" ? "Burbuja" : "Flotante"
                          }`
                        : `Personalizado · Molde: ${logoShape}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Selector de color */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("form.colorLabel")}
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-blue-500" />
              Paleta rápida o personalizado
            </span>
          </div>

          {/* Paleta rápida de colores recomendados */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {COLOR_PRESETS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                onClick={() => setQrColor(preset.hex)}
                className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                  qrColor.toLowerCase() === preset.hex.toLowerCase()
                    ? "border-blue-500 ring-2 ring-blue-300 dark:ring-blue-700 scale-105"
                    : "border-white dark:border-gray-700 shadow-sm"
                }`}
                style={{ backgroundColor: preset.hex }}
                title={`${preset.name} (${preset.hex})`}
                aria-label={preset.name}
              />
            ))}
          </div>

          <div className="flex items-center gap-3 isolate">
            <input
              type="color"
              value={qrColor}
              onChange={(e) => setQrColor(e.target.value)}
              className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer focus:outline-none focus:ring-0 focus:border-gray-300 dark:focus:border-gray-600"
              style={{
                isolation: "isolate",
                willChange: "auto",
              }}
            />
            <input
              type="text"
              value={qrColor}
              onChange={(e) => {
                const value = e.target.value;
                if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                  setQrColor(value);
                }
              }}
              placeholder="#000000"
              className="flex-1 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border font-mono"
              style={{
                isolation: "isolate",
                contain: "layout style paint",
              }}
            />
          </div>

          {/* Indicador de contraste dinámico */}
          {contrast.level === "optimal" && (
            <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
              <span>
                <strong>Excelente contraste ({contrast.ratio}:1):</strong> El código se escaneará nítidamente en cualquier dispositivo.
              </span>
            </div>
          )}

          {contrast.level === "acceptable" && (
            <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <span>
                <strong>Contraste aceptable ({contrast.ratio}:1):</strong> Legible para la mayoría de teléfonos y cámaras.
              </span>
            </div>
          )}

          {contrast.level === "low" && (
            <div className="mt-2.5 flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">⚠️ Contraste bajo ({contrast.ratio}:1):</span>
                <span className="block mt-0.5 text-amber-800 dark:text-amber-300">
                  Este color es demasiado claro contra el fondo blanco. Las cámaras podrían tener dificultades para leerlo. Te sugerimos seleccionar un tono más oscuro de la paleta.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Selector de formato */}
        <div className="mt-6 isolate">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("form.formatLabel")}
          </label>
          <select
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as "jpg" | "png" | "pdf" | "svg")}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 sm:p-2.5 text-sm sm:text-base border"
            style={{
              isolation: "isolate",
              contain: "layout style paint",
            }}
          >
            <option value="jpg">JPG</option>
            <option value="png">PNG</option>
            <option value="pdf">PDF</option>
            <option value="svg">SVG</option>
          </select>
        </div>

        <div className="mt-4">
          <button
            onClick={generateQRCode}
            disabled={loading}
            className={`w-full px-4 py-2.5 sm:py-2 text-sm sm:text-base ${
              loading
                ? "bg-gray-400"
                : type === "url"
                ? "bg-blue-600 hover:bg-blue-700"
                : type === "whatsapp"
                ? "bg-green-600 hover:bg-green-700"
                : type === "wifi"
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-orange-600 hover:bg-orange-700"
            } text-white rounded-md transition-colors disabled:cursor-not-allowed`}
          >
            {loading ? t("form.generating") : t("form.generateButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

