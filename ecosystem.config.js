module.exports = {
  apps: [
    {
      name: "nanopharm",
      script: "backend/server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

