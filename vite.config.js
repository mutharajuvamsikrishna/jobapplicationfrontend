import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  // Custom build configuration
  build: {
    // Custom Rollup options
    rollupOptions: {
      // Custom onwarn function to handle warnings
      onwarn: (warning, warn) => {
        // Log the warning message to the console without aborting the build
        console.warn(`[${warning.code}]: ${warning.message}`);
        // Proceed with the build process
        warn(warning);
      }
    }
  }
});
