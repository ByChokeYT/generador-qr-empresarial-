import "dotenv/config";
import express from "express";
import cors from "cors";
import QRCode from "qrcode";
import sharp from "sharp";

const app = express();

// Configurar CORS: permite localhost en desarrollo y el dominio de producción
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [
      "http://localhost:5173",
      "http://localhost:3000"
    ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

app.get('/api', (req, res) => {
  res.json({ message: 'API QR funcionando' });
});

const getLogoRatio = (sizeOption) => {
  if (sizeOption === 'small') return 0.18;
  if (sizeOption === 'large') return 0.26;
  return 0.22; // medium / default
};

const addLogoToSVG = async (svgString, logoDataURL, qrSize, options = {}) => {
  const { logoShape = 'squircle', logoSize = 'medium' } = options;
  const logoBuffer = Buffer.from(logoDataURL.split(',')[1], 'base64');
  
  const logoMetadata = await sharp(logoBuffer).metadata();
  const logoWidth = logoMetadata.width || 100;
  const logoHeight = logoMetadata.height || 100;
  
  const ratio = getLogoRatio(logoSize);
  const maxLogoSize = Math.max(20, Math.floor(qrSize * ratio));
  
  let newLogoWidth = maxLogoSize;
  let newLogoHeight = maxLogoSize;
  
  if (logoWidth > logoHeight) {
    newLogoHeight = Math.max(1, Math.floor((maxLogoSize * logoHeight) / logoWidth));
  } else if (logoHeight > logoWidth) {
    newLogoWidth = Math.max(1, Math.floor((maxLogoSize * logoWidth) / logoHeight));
  }
  
  const resizedLogo = await sharp(logoBuffer)
    .resize(newLogoWidth, newLogoHeight, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toBuffer();
  
  const logoBase64 = resizedLogo.toString('base64');
  const logoDataUri = `data:image/png;base64,${logoBase64}`;
  
  let elementsToAdd = '';

  if (logoShape === 'none') {
    const logoX = (qrSize - newLogoWidth) / 2;
    const logoY = (qrSize - newLogoHeight) / 2;
    elementsToAdd = `<image href="${logoDataUri}" x="${logoX}" y="${logoY}" width="${newLogoWidth}" height="${newLogoHeight}" preserveAspectRatio="xMidYMid meet"/>`;
  } else {
    const padding = Math.max(6, Math.floor(qrSize * 0.025));
    const badgeSize = Math.max(newLogoWidth, newLogoHeight) + (padding * 2);
    const badgeX = (qrSize - badgeSize) / 2;
    const badgeY = (qrSize - badgeSize) / 2;
    const logoX = badgeX + (badgeSize - newLogoWidth) / 2;
    const logoY = badgeY + (badgeSize - newLogoHeight) / 2;

    if (logoShape === 'circle') {
      const radius = badgeSize / 2;
      const cx = qrSize / 2;
      const cy = qrSize / 2;
      elementsToAdd = `
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#FFFFFF" stroke="#F1F5F9" stroke-width="1"/>
        <image href="${logoDataUri}" x="${logoX}" y="${logoY}" width="${newLogoWidth}" height="${newLogoHeight}" preserveAspectRatio="xMidYMid meet"/>
      `;
    } else {
      // Squircle profesional con esquinas suaves
      const rx = Math.round(badgeSize * 0.24);
      elementsToAdd = `
        <rect x="${badgeX}" y="${badgeY}" width="${badgeSize}" height="${badgeSize}" rx="${rx}" ry="${rx}" fill="#FFFFFF" stroke="#F1F5F9" stroke-width="1"/>
        <image href="${logoDataUri}" x="${logoX}" y="${logoY}" width="${newLogoWidth}" height="${newLogoHeight}" preserveAspectRatio="xMidYMid meet"/>
      `;
    }
  }
  
  return svgString.replace('</svg>', `${elementsToAdd}</svg>`);
};

const addLogoToQR = async (qrDataURL, logoDataURL, qrSize, format = 'png', options = {}) => {
  const { logoShape = 'squircle', logoSize = 'medium' } = options;
  const qrBuffer = Buffer.from(qrDataURL.split(',')[1], 'base64');
  const logoBuffer = Buffer.from(logoDataURL.split(',')[1], 'base64');
  
  const logoMetadata = await sharp(logoBuffer).metadata();
  const logoWidth = logoMetadata.width || 100;
  const logoHeight = logoMetadata.height || 100;
  
  const ratio = getLogoRatio(logoSize);
  const maxLogoSize = Math.max(20, Math.floor(qrSize * ratio));
  
  let newLogoWidth = maxLogoSize;
  let newLogoHeight = maxLogoSize;
  
  if (logoWidth > logoHeight) {
    newLogoHeight = Math.max(1, Math.floor((maxLogoSize * logoHeight) / logoWidth));
  } else if (logoHeight > logoWidth) {
    newLogoWidth = Math.max(1, Math.floor((maxLogoSize * logoWidth) / logoHeight));
  }
  
  const resizedLogo = await sharp(logoBuffer)
    .resize(newLogoWidth, newLogoHeight, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 }
    })
    .png()
    .toBuffer();
  
  let finalBadgeBuffer;
  let badgeTotalWidth;
  let badgeTotalHeight;

  if (logoShape === 'none') {
    finalBadgeBuffer = resizedLogo;
    badgeTotalWidth = newLogoWidth;
    badgeTotalHeight = newLogoHeight;
  } else {
    const padding = Math.max(6, Math.floor(qrSize * 0.025));
    const badgeSize = Math.max(newLogoWidth, newLogoHeight) + (padding * 2);
    badgeTotalWidth = badgeSize;
    badgeTotalHeight = badgeSize;

    const logoOffsetX = Math.floor((badgeSize - newLogoWidth) / 2);
    const logoOffsetY = Math.floor((badgeSize - newLogoHeight) / 2);

    let badgeSvgString;
    if (logoShape === 'circle') {
      const radius = badgeSize / 2;
      badgeSvgString = `<svg width="${badgeSize}" height="${badgeSize}" viewBox="0 0 ${badgeSize} ${badgeSize}">
        <circle cx="${radius}" cy="${radius}" r="${radius}" fill="#FFFFFF"/>
      </svg>`;
    } else {
      // Squircle suave con curvatura 24%
      const rx = Math.round(badgeSize * 0.24);
      badgeSvgString = `<svg width="${badgeSize}" height="${badgeSize}" viewBox="0 0 ${badgeSize} ${badgeSize}">
        <rect width="${badgeSize}" height="${badgeSize}" rx="${rx}" ry="${rx}" fill="#FFFFFF"/>
      </svg>`;
    }

    const badgeBgBuffer = await sharp(Buffer.from(badgeSvgString)).png().toBuffer();

    finalBadgeBuffer = await sharp(badgeBgBuffer)
      .composite([{
        input: resizedLogo,
        top: logoOffsetY,
        left: logoOffsetX
      }])
      .png()
      .toBuffer();
  }

  const logoX = Math.floor((qrSize - badgeTotalWidth) / 2);
  const logoY = Math.floor((qrSize - badgeTotalHeight) / 2);
  
  let finalImage;
  let mimeType;
  
  if (format === 'jpg' || format === 'jpeg') {
    finalImage = await sharp(qrBuffer)
      .resize(qrSize, qrSize)
      .composite([{
        input: finalBadgeBuffer,
        top: logoY,
        left: logoX
      }])
      .jpeg({ quality: 92 })
      .toBuffer();
    mimeType = 'image/jpeg';
  } else {
    finalImage = await sharp(qrBuffer)
      .resize(qrSize, qrSize)
      .composite([{
        input: finalBadgeBuffer,
        top: logoY,
        left: logoX
      }])
      .png()
      .toBuffer();
    mimeType = 'image/png';
  }
  
  return `data:${mimeType};base64,${finalImage.toString('base64')}`;
};

const generateQRHandler = async (req, res) => {
  const { 
    url, 
    size = 148, 
    logo, 
    format = 'jpg', 
    color = '#000000',
    logoShape = 'squircle',
    logoSize = 'medium'
  } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL es requerida" });
  }

  const logoOptions = { logoShape, logoSize };

  try {
    let finalQRImage;
    
    // Si el formato es SVG, generar directamente como SVG
    if (format === 'svg') {
      const svgString = await QRCode.toString(url, {
        type: 'svg',
        width: size,
        margin: 1,
        errorCorrectionLevel: 'H',
        color: {
          dark: color,
          light: '#FFFFFF'
        }
      });
      
      if (logo) {
        try {
          const svgWithLogo = await addLogoToSVG(svgString, logo, size, logoOptions);
          finalQRImage = `data:image/svg+xml;base64,${Buffer.from(svgWithLogo).toString('base64')}`;
        } catch (logoError) {
          console.error("Error procesando logo en SVG:", logoError);
          finalQRImage = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
          return res.json({ 
            qrCode: finalQRImage, 
            size: size,
            warning: "No se pudo agregar el logo, se generó el QR sin logo"
          });
        }
      } else {
        finalQRImage = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
      }
    } else {
      // Para otros formatos (PNG, JPG, PDF), usar el método con Sharp
      const qrCodeImage = await QRCode.toDataURL(url, {
        width: size,
        height: size,
        margin: 1,
        errorCorrectionLevel: 'H',
        type: 'image/png',
        color: {
          dark: color,
          light: '#FFFFFF'
        }
      });
      
      finalQRImage = qrCodeImage;
      
      if (logo) {
        try {
          finalQRImage = await addLogoToQR(qrCodeImage, logo, size, format, logoOptions);
        } catch (logoError) {
          console.error("Error procesando logo:", logoError);
          return res.json({ 
            qrCode: qrCodeImage, 
            size: size,
            warning: "No se pudo agregar el logo, se generó el QR sin logo"
          });
        }
      } else {
        if (format === 'jpg' || format === 'jpeg') {
          const qrBuffer = Buffer.from(qrCodeImage.split(',')[1], 'base64');
          const jpgBuffer = await sharp(qrBuffer).jpeg({ quality: 92 }).toBuffer();
          finalQRImage = `data:image/jpeg;base64,${jpgBuffer.toString('base64')}`;
        } else if (format === 'pdf') {
          finalQRImage = qrCodeImage;
        }
      }
    }
    
    res.json({ qrCode: finalQRImage, size: size });
  } catch (error) {
    console.error("Error generando el QR:", error);
    res.status(500).json({ error: "Error generando el código QR" });
  }
};

app.post("/api/generate-qr", (generateQRHandler));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});

export default app; 