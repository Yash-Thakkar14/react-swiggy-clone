// Mock implementation of TextEncoder and TextDecoder for Jest
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
    this.entries = [];
    this.observe = jest.fn();
    this.disconnect = jest.fn();
    this.unobserve = jest.fn();
  }

  // Helper to simulate intersection
  simulateIntersection(isIntersecting) {
    this.entries.push({ isIntersecting });
    this.callback(this.entries);
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Create a mock for URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => "mock-url");

// Create mock implementation for any other APIs needed by React Router
const nodeCrypto = require("crypto");

// Mocking the crypto API
global.crypto = {
  getRandomValues: function (buffer) {
    return nodeCrypto.randomFillSync(buffer);
  },
  subtle: {
    digest: jest.fn(() => Promise.resolve(new ArrayBuffer(32))),
  },
};

// Add any other global mocks needed for tests here
