// lib/config/env.ts
export const env = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001/api',
    apiTimeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
    tokenKey: process.env.NEXT_PUBLIC_TOKEN_STORAGE_KEY || 'access_token',
    appName: process.env.NEXT_PUBLIC_APP_NAME || 'My App',
    appVersion: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    enableLogging: process.env.NEXT_PUBLIC_ENABLE_LOGGING === 'true',
} as const;

// Geliştirme ortamında env değişkenlerini logla
if (process.env.NODE_ENV === 'development' && env.enableLogging) {
    console.log('🔧 Environment Configuration:', {
        apiUrl: env.apiUrl,
        apiTimeout: env.apiTimeout,
        appName: env.appName,
        appVersion: env.appVersion,
    });
}

// Environment validation
export function validateEnv() {
    const required = ['NEXT_PUBLIC_API_URL'];

    const missing = required.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        throw new Error(`❌ Missing required environment variables: ${missing.join(', ')}`);
    }

    console.log('✅ Environment variables validated');
}
