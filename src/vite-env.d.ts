/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GAS_WEBAPP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*?raw' {
  const content: string;
  export default content;
}
