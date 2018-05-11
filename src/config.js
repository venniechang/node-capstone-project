'use strict';

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/dream-collection';
exports.PORT = process.env.PORT || 8081;
exports.JWT_SECRET = process.env.JWT_SECRET || 'test';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';