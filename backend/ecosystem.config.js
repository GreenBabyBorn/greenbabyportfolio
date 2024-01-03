module.exports = {
  apps: [
    {
      name: "greenbabyapi",
      port: "3001",
      exec_mode: "cluster",
      instances: "max",
      script: "./dist/main.js",
    },
  ],
};
