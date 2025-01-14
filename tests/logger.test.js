const fs = require('fs');
const path = require('path');
const logger = require('../scripts/log-service');

describe('Logger', () => {
  const errorLogPath = path.resolve(__dirname, '../logs/error.log');
  beforeEach(() => {
    if (fs.existsSync(errorLogPath)) {
      fs.unlinkSync(errorLogPath);
    }
  });
  afterAll(() => {
    if (fs.existsSync(errorLogPath)) {
      fs.unlinkSync(errorLogPath);
    }
  });
  it('should log an error message to error.log', (done) => {
    const testErrorMessage = 'Test error log message';

    logger.error(testErrorMessage);

    setTimeout(() => {
      expect(fs.existsSync(errorLogPath)).toBe(true);
      const logContents = fs.readFileSync(errorLogPath, 'utf8');
      expect(logContents).toContain(testErrorMessage);
      done();
    }, 500);
  });
});
