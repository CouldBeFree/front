module.exports = {
  apps: [{
    name: "frontend",
    script: "npm",
    args: "start",
    env: {
      HOST: '0.0.0.0',
      PORT: 8080,
      NODE_TLS_REJECT_UNAUTHORIZED: '0'
    },
    env_dev: {
      HOST: '0.0.0.0',
      PORT: 8080
    }
  }, {
    name: "backend",
    cwd: '../bz-cms/server',
    script: "node",
    args: "dist/bin/www.js",
    env: {
      HOST: '127.0.0.1',
      PORT: 5000,
      NODE_TLS_REJECT_UNAUTHORIZED: '0'
    }
  }]
}
