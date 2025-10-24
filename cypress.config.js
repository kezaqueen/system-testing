import { defineConfig } from 'cypress';

export default defineConfig({
   component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
  env: {
    login_email: 'testuser@craftcrest.com',
    login_password: 'SecurePass123!',
  },
  e2e: {
    baseUrl: 'https://craftcrest.vercel.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});



