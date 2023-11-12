

interface AppConfig {
  API_KEY: string; // Ключ от API
  REQUEST_TIMEOUT: number; // Задержка перед отправкой запроса к API
}

/**
 * Конфигурация приложения
 */
const config: AppConfig = {
  API_KEY: process.env.REACT_APP_API_KEY || "",
  REQUEST_TIMEOUT: 1000,
};

export default config;