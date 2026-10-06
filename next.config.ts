import type { NextConfig } from "next";
import pkg from "./package.json" with { type: "json" };

const nextConfig: NextConfig = {
  // El indicador tapa la barra inferior del celular; los errores se siguen mostrando.
  devIndicators: false,
  experimental: {
    // Subida del .docx del cronograma (la acción valida hasta 5 MB).
    serverActions: { bodySizeLimit: "6mb" },
  },
  env: {
    // Versión visible en el footer; única fuente de verdad: package.json.
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
