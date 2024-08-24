/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React's Strict Mode for highlighting potential problems
    swcMinify: true,       // Uses SWC for minifying JavaScript, faster than Terser
  
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://vs160816svc363862.mock.blazemeter.com/api/1.0.0/:path*',
        },
      ];
    },
  
    // Example of adding custom environment variables
    env: {
      API_BASE_URL: 'https://vs160816svc363862.mock.blazemeter.com/api/1.0.0',
    },
  
    // Example of custom Webpack configuration
    webpack(config, { dev, isServer }) {
      // Perform customizations to webpack config
      if (!dev && !isServer) {
        // Example: Minify the JavaScript files only in production
        config.optimization.minimizer.push(
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
              },
            },
          })
        );
      }
  
      // Important: return the modified config
      return config;
    },
  };
  
  export default nextConfig;
  