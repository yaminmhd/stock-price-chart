/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_POLYGON_BASE_URL: string;
  readonly VITE_POLYGON_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
