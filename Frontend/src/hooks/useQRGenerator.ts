import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { QRType, OutputFormat, WiFiSecurity, LogoShape, LogoSize } from "../types";
import { QR_CONFIG } from "../constants";
import { QRService } from "../services/qrService";
import { fileToBase64, isValidImageFile, isValidFileSize } from "../utils/fileUtils";
import { generateFinalUrl, downloadImage } from "../utils/qrUtils";
import { saveQRToHistory } from "../utils/historyUtils";
import { useToast } from "../context/ToastContext";
import { evaluateQRContrast } from "../utils/contrastUtils";
import { PRESET_LOGOS, svgToPngDataUrl, getDefaultLogoForType } from "../utils/logoPresets";

export interface UseQRGeneratorReturn {
  // Form state
  url: string;
  setUrl: (url: string) => void;
  whatsappMessage: string;
  setWhatsappMessage: (message: string) => void;
  wifiSSID: string;
  setWifiSSID: (ssid: string) => void;
  wifiPassword: string;
  setWifiPassword: (password: string) => void;
  wifiSecurity: WiFiSecurity;
  setWifiSecurity: (security: WiFiSecurity) => void;
  wifiHidden: boolean;
  setWifiHidden: (hidden: boolean) => void;
  textContent: string;
  setTextContent: (text: string) => void;

  // vCard Contact state
  vcardFirstName: string;
  setVcardFirstName: (val: string) => void;
  vcardLastName: string;
  setVcardLastName: (val: string) => void;
  vcardPhone: string;
  setVcardPhone: (val: string) => void;
  vcardEmail: string;
  setVcardEmail: (val: string) => void;
  vcardCompany: string;
  setVcardCompany: (val: string) => void;
  vcardTitle: string;
  setVcardTitle: (val: string) => void;
  vcardWebsite: string;
  setVcardWebsite: (val: string) => void;

  // Email state
  emailTo: string;
  setEmailTo: (val: string) => void;
  emailSubject: string;
  setEmailSubject: (val: string) => void;
  emailBody: string;
  setEmailBody: (val: string) => void;

  // Location state
  locationQuery: string;
  setLocationQuery: (val: string) => void;
  locationLatitude: string;
  setLocationLatitude: (val: string) => void;
  locationLongitude: string;
  setLocationLongitude: (val: string) => void;

  type: QRType;
  setType: (type: QRType) => void;
  handleTypeChange: (type: QRType) => Promise<void>;
  qrSize: number;
  setQrSize: (size: number) => void;
  enableLogo: boolean;
  setEnableLogo: (enable: boolean) => void;
  logoFile: File | null;
  setLogoFile: (file: File | null) => void;
  logoPreview: string;
  setLogoPreview: (preview: string) => void;
  selectedPresetLogo: string | null;
  selectPresetLogo: (presetId: string | null) => Promise<void>;
  logoShape: LogoShape;
  setLogoShape: (shape: LogoShape) => void;
  logoSize: LogoSize;
  setLogoSize: (size: LogoSize) => void;
  outputFormat: OutputFormat;
  setOutputFormat: (format: OutputFormat) => void;
  qrColor: string;
  setQrColor: (color: string) => void;
  
  // QR state
  qrCodeImage: string;
  selectedSize: number;
  loading: boolean;
  
  // Actions
  handleLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  generateQRCode: () => Promise<void>;
  handleDownloadQR: () => Promise<void>;
}

export const useQRGenerator = (): UseQRGeneratorReturn => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [url, setUrl] = useState<string>("");
  const [whatsappMessage, setWhatsappMessage] = useState<string>("");
  const [wifiSSID, setWifiSSID] = useState<string>("");
  const [wifiPassword, setWifiPassword] = useState<string>("");
  const [wifiSecurity, setWifiSecurity] = useState<WiFiSecurity>("WPA");
  const [wifiHidden, setWifiHidden] = useState<boolean>(false);
  const [textContent, setTextContent] = useState<string>("");

  // vCard
  const [vcardFirstName, setVcardFirstName] = useState<string>("");
  const [vcardLastName, setVcardLastName] = useState<string>("");
  const [vcardPhone, setVcardPhone] = useState<string>("");
  const [vcardEmail, setVcardEmail] = useState<string>("");
  const [vcardCompany, setVcardCompany] = useState<string>("");
  const [vcardTitle, setVcardTitle] = useState<string>("");
  const [vcardWebsite, setVcardWebsite] = useState<string>("");

  // Email
  const [emailTo, setEmailTo] = useState<string>("");
  const [emailSubject, setEmailSubject] = useState<string>("");
  const [emailBody, setEmailBody] = useState<string>("");

  // Location
  const [locationQuery, setLocationQuery] = useState<string>("");
  const [locationLatitude, setLocationLatitude] = useState<string>("");
  const [locationLongitude, setLocationLongitude] = useState<string>("");

  const [type, setType] = useState<QRType>("url");
  const [qrSize, setQrSize] = useState<number>(QR_CONFIG.DEFAULT_SIZE);
  const [enableLogo, setEnableLogo] = useState<boolean>(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [selectedPresetLogo, setSelectedPresetLogo] = useState<string | null>(null);
  const [logoShape, setLogoShape] = useState<LogoShape>("squircle");
  const [logoSize, setLogoSize] = useState<LogoSize>("medium");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("jpg");
  const [qrColor, setQrColor] = useState<string>(QR_CONFIG.DEFAULT_COLOR);
  const [qrCodeImage, setQrCodeImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number>(QR_CONFIG.DEFAULT_SIZE);
  const [loading, setLoading] = useState<boolean>(false);

  const selectPresetLogo = async (presetId: string | null) => {
    if (!presetId) {
      setSelectedPresetLogo(null);
      setLogoFile(null);
      setLogoPreview("");
      setEnableLogo(false);
      return;
    }

    const preset = PRESET_LOGOS.find((p) => p.id === presetId);
    if (!preset) return;

    try {
      const pngData = await svgToPngDataUrl(preset.svg);
      setSelectedPresetLogo(presetId);
      setLogoFile(null);
      setLogoPreview(pngData);
      setEnableLogo(true);
      toast.info(`Logo oficial de ${preset.name} seleccionado para el centro`);
    } catch (err) {
      console.error("Error convirtiendo logo preset:", err);
    }
  };

  const handleTypeChange = async (newType: QRType) => {
    setType(newType);
    const suggestedLogo = getDefaultLogoForType(newType);
    if (suggestedLogo) {
      await selectPresetLogo(suggestedLogo);
    }
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      toast.error(t("errors.invalidImage"));
      return;
    }

    if (!isValidFileSize(file, QR_CONFIG.MAX_LOGO_SIZE)) {
      toast.error(t("errors.fileTooLarge"));
      return;
    }

    setLogoFile(file);
    setSelectedPresetLogo(null);
    setEnableLogo(true);
    const base64 = await fileToBase64(file);
    setLogoPreview(base64);
    toast.success("Logo personalizado cargado correctamente");
  };

  const generateQRCode = async () => {
    // Validaciones por tipo
    if (type === "wifi") {
      if (!wifiSSID.trim()) {
        toast.error(t("errors.wifiSSIDRequired"));
        return;
      }
    } else if (type === "text") {
      if (!textContent.trim()) {
        toast.error(t("errors.textRequired"));
        return;
      }
    } else if (type === "vcard") {
      if (!vcardFirstName.trim() && !vcardPhone.trim()) {
        toast.error("Por favor, ingresa al menos un nombre o teléfono de contacto");
        return;
      }
    } else if (type === "email") {
      if (!emailTo.trim()) {
        toast.error("Por favor, ingresa el correo electrónico de destino");
        return;
      }
    } else if (type === "location") {
      if (!locationQuery.trim() && (!locationLatitude.trim() || !locationLongitude.trim())) {
        toast.error("Por favor, ingresa una dirección o las coordenadas");
        return;
      }
    } else {
      if (!url.trim()) {
        toast.error(t("errors.urlRequired"));
        return;
      }
    }

    if (enableLogo && !logoFile && !logoPreview) {
      toast.error(t("errors.logoRequired"));
      return;
    }

    // Advertencia amigable si el contraste es muy bajo
    const contrast = evaluateQRContrast(qrColor);
    if (!contrast.isGoodForQR) {
      toast.warning(
        "Color muy claro detectado. Si tu teléfono tiene problemas para leerlo, prueba un tono más oscuro.",
        "Aviso de Legibilidad"
      );
    }

    setLoading(true);

    try {
      const finalUrl = generateFinalUrl(
        type,
        url,
        whatsappMessage,
        type === "wifi"
          ? {
              ssid: wifiSSID,
              password: wifiPassword,
              security: wifiSecurity,
              hidden: wifiHidden,
            }
          : undefined,
        type === "text" ? textContent : undefined,
        type === "vcard"
          ? {
              firstName: vcardFirstName,
              lastName: vcardLastName,
              phone: vcardPhone,
              email: vcardEmail,
              company: vcardCompany,
              title: vcardTitle,
              website: vcardWebsite,
            }
          : undefined,
        type === "email"
          ? {
              to: emailTo,
              subject: emailSubject,
              body: emailBody,
            }
          : undefined,
        type === "location"
          ? {
              query: locationQuery,
              latitude: locationLatitude,
              longitude: locationLongitude,
            }
          : undefined
      );

      let logoBase64: string | null = null;

      if (enableLogo) {
        if (logoFile) {
          logoBase64 = await fileToBase64(logoFile);
        } else if (logoPreview) {
          logoBase64 = logoPreview;
        }
      }

      const response = await QRService.generateQR({
        url: finalUrl,
        size: qrSize,
        logo: logoBase64,
        format: outputFormat,
        color: qrColor,
        logoShape,
        logoSize,
      });

      setQrCodeImage(response.qrCode);
      const finalSize = response.size ?? qrSize;
      setSelectedSize(finalSize);
      
      // Guardar en el historial
      saveQRToHistory(response.qrCode, finalUrl, outputFormat, finalSize);
      toast.success(t("success.qrGenerated", "¡Código QR generado con éxito!"));
      
      if (response.warning) {
        toast.warning(response.warning);
      }
    } catch (error) {
      console.error("Error al generar el QR:", error);
      toast.error(t("errors.generateError"));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = async () => {
    if (!qrCodeImage) return;
    try {
      toast.info(t("success.downloadStarted", "Descargando código QR..."));
      await downloadImage(qrCodeImage, "qrcode", outputFormat);
    } catch (error) {
      console.error("Error al descargar:", error);
      toast.error(t("errors.generateError"));
    }
  };

  return {
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
    setType,
    handleTypeChange,
    qrSize,
    setQrSize,
    enableLogo,
    setEnableLogo,
    logoFile,
    setLogoFile,
    logoPreview,
    setLogoPreview,
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
    qrCodeImage,
    selectedSize,
    loading,
    handleLogoChange,
    generateQRCode,
    handleDownloadQR,
  };
};
