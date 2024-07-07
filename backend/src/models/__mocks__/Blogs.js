const mockSave = jest.fn();
const mockPopulate = jest.fn();
const mockSort = jest.fn();

module.exports.__mocks__ = {
  mockSave,
  mockPopulate,
  mockSort,
};

// path: backend/src/controllers/__tests__/blogs.test.js
