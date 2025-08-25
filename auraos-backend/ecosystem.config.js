// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'auraos-backend',
    script: 'src/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: 'logs/pm2/err.log',
    out_file: 'logs/pm2/out.log',
    merge_logs: true,
    time: true,
    instance_var: 'INSTANCE_ID',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
