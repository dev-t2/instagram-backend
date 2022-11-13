declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    DATABASE_URL: string;
    ADMIN_NAME: string;
    ADMIN_PASSWORD: string;
    JWT_SECRET: string;
  }
}
