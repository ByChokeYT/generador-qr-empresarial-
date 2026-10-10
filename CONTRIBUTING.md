# 🤝 Guía de Contribución al Proyecto

¡Gracias por tu interés en contribuir a **Generador QR Empresarial Pro**! Este proyecto es de código abierto y agradece activamente el apoyo de desarrolladores, diseñadores y entusiastas que deseen mejorar la plataforma.

Sigue esta guía para asegurar que tu contribución sea fluida, profesional y de rápida integración.

---

## 🌟 Formas en las que Puedes Colaborar

No necesitas ser un experto para participar. Hay muchas formas de aportar valor:

1. **🐛 Reportar Bugs:** Si encuentras un error visual, un QR que no se decodifica o una falla en el servidor, repórtalo en los [Issues](https://github.com/ByChokeYT/generador-qr-empresarial-/issues).
2. **💡 Proponer Nuevas Funcionalidades:** Sugerir nuevos tipos de QR (ej. criptomonedas, eventos de calendario `.ics`, PDFs embebidos) o nuevos logotipos corporativos.
3. **🎨 Mejoras de UI/UX:** Nuevos estilos de marcos decorativos, plantillas CTA ("Escanéame") o mejoras de accesibilidad.
4. **🌐 Traducciones e i18n:** Añadir soporte para nuevos idiomas o mejorar las traducciones existentes en `src/i18n/locales/`.
5. **💻 Enviar Código:** Resolver issues existentes o implementar mejoras a través de Pull Requests.

---

## 🚀 Flujo de Trabajo para Pull Requests

### 1. Haz un Fork del Repositorio
Haz clic en el botón **Fork** en la esquina superior derecha del repositorio en GitHub:
👉 [https://github.com/ByChokeYT/generador-qr-empresarial-](https://github.com/ByChokeYT/generador-qr-empresarial-)

### 2. Clona tu Fork Localmente
```bash
git clone https://github.com/TU-USUARIO/generador-qr-empresarial-.git
cd generador-qr-empresarial-
```

### 3. Crea una Rama de Trabajo
Usa nombres descriptivos con prefijos:
```bash
# Para una nueva funcionalidad:
git checkout -b feature/nombre-de-la-mejora

# Para una corrección de bug:
git checkout -b fix/nombre-del-bug

# Para documentación:
git checkout -b docs/mejora-en-guias
```

### 4. Configuración del Entorno de Desarrollo

#### Backend:
```bash
cd Backend
npm install
npm start
```

#### Frontend:
```bash
cd ../Frontend
npm install --legacy-peer-deps
npm run dev
```

### 5. Verifica la Calidad del Código
Antes de hacer commit, asegúrate de que el linter y la compilación pasen sin errores:
```bash
# En el directorio Frontend:
npm run lint
npm run build
```

---

## 📝 Estándar de Mensajes de Commit (Conventional Commits)

Este repositorio sigue el estándar internacional **Conventional Commits**. Asegúrate de dar formato a tus commits de la siguiente forma:

| Tipo | Propósito | Ejemplo |
| :--- | :--- | :--- |
| **`feat:`** | Una nueva funcionalidad | `feat(logos): agregar logotipo oficial de Stripe` |
| **`fix:`** | Corrección de un error | `fix(contrast): corregir cálculo de luminancia en tonos pastel` |
| **`docs:`** | Cambios en la documentación | `docs: actualizar guía de variables de entorno` |
| **`style:`** | Cambios visuales o de formato que no afectan la lógica | `style: alinear espaciado de tarjetas en móvil` |
| **`refactor:`** | Refactorización de código sin alterar su comportamiento | `refactor: optimizar hook useQRGenerator` |
| **`perf:`** | Mejora de rendimiento | `perf: acelerar compresión Sharp para formatos JPG` |
| **`chore:`** | Tareas de mantenimiento y dependencias | `chore: actualizar dependencias de Vite` |

---

## 🛡️ Reglas y Estándares de Código

* **TypeScript Estricto:** No utilices `any` salvo excepciones plenamente justificadas. Define siempre interfaces o tipos descriptivos.
* **Componentes Modulares:** Mantén cada componente enfocado en una única responsabilidad.
* **Accesibilidad (a11y):** Asegura contraste adecuado (WCAG 2.1 AA) y soporte de navegación por teclado.
* **Zero Console Errors:** No dejes `console.log` de depuración en código final de producción.
* **Seguridad:** No incluyas claves de API ni credenciales sensibles en el código.

---

## 📬 Envío de tu Pull Request

1. Sube tus cambios a tu fork:
   ```bash
   git push origin feature/nombre-de-la-mejora
   ```
2. Ve al repositorio original en GitHub:
   👉 [https://github.com/ByChokeYT/generador-qr-empresarial-/pulls](https://github.com/ByChokeYT/generador-qr-empresarial-/pulls)
3. Haz clic en **"New Pull Request"**.
4. Describe detalladamente:
   * **¿Qué problema resuelve?**
   * **¿Qué cambios se implementaron?**
   * **Capturas de pantalla o GIFs demostrativos** (si involucra cambios visuales).
5. ¡Espera la revisión! El mantenedor (**bychoke**) revisará tu PR, te dará retroalimentación constructiva y lo fusionará.

---

## 🎖️ Reconocimiento

Todos los contribuidores que envíen mejoras aprobadas serán reconocidos con mención de autoría en el proyecto y en las notas de versión.

¡Gracias por hacer que este generador sea cada día más potente y accesible para toda la comunidad hispanohablante y global! 🚀
