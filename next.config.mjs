const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      };
      return config;
    },
  };
  
  export default nextConfig;