const app = require('./app');
const config = require('./config/environment');
const logger = require('./utils/logger');

const PORT = config.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${config.NODE_ENV}`);
});
