const Blog = require("../../models/Blog");
const cloudStorage = require("../../services/cloud-storage");
const {
  createBlogs,
  getBlogs,
  getBlogById,
  getBlogsByCategoryID,
  getBlogsByAuthorID,
  updateBlogByID,
} = require("../Blogs");

const { __mocks__ } = require("../../models/__mocks__/Blogs");

jest.mock("../../models/Blog");
jest.mock("../../services/cloud-storage");

let req, res;

describe("Blogs Controller: createBlogs", () => {
  beforeEach(() => {
    req = {
      body: {
        title: "My First Blog Post - Jest Unit Test",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        categories: JSON.stringify([
          {
            id: "665945dbc2294698fe74d8d4",
            title: "Frontend Development",
            color: "#026AA2",
          },
          {
            id: "665945ffc2294698fe74d8d9",
            title: "Backend Development",
            color: "#C11574",
          },
        ]),
        authorId: "665e4736cdb3ef11df5134f3",
        content: JSON.stringify([
          {
            sectionHeader: "Introduction",
            sectionText:
              "I'm so excited to share my first blog post with the world. I've been working on this for a while and I'm happy to finally share it with you.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            sectionHeader: "Body",
            sectionText:
              "This is the body of my blog post. I hope you enjoy reading it as much as I enjoyed writing it.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          {
            sectionHeader: "Conclusion",
            sectionText:
              "I hope you enjoyed reading my first blog post. I'm looking forward to sharing more with you in the future.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
        ]),
      },
      file: {
        path: "path/to/file",
      },
    };

    res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    cloudStorage.uploadToFirebaseStorage.mockResolvedValue(
      "https://storage.googleapis.com/ix-blog-app/default.jpeg"
    );

    Blog.mockClear();
    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
  });

  test("Should create a blog and return the blog data", async () => {
    __mocks__.mockSave.mockResolvedValue({ _id: "1" });
    __mocks__.mockPopulate.mockResolvedValue(__mocks__.mockBlogPost);

    Blog.mockImplementation(() => ({
      save: __mocks__.mockSave,
    }));

    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate,
      }),
    }));

    await createBlogs(req, res);

    expect(cloudStorage.uploadToFirebaseStorage).toHaveBeenCalledWith(
      "path/to/file",
      "path/to/file"
    );
    expect(__mocks__.mockSave).toHaveBeenCalled();
    expect(Blog.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog created!",
      data: __mocks__.mockBlogPost,
    });
  });

  test("should handle errors", async () => {
    const error = new Error("Something went wrong");
    __mocks__.mockSave.mockRejectedValue(error);
    Blog.mockImplementation(() => ({
      save: __mocks__.mockSave,
    }));
    await createBlogs(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message, data: {} });
  });
});

describe("Blogs Controller: getBlogs", () => {
  beforeEach(() => {
    req = {
      body: "test",
    };

    res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    Blog.mockClear();
    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
    __mocks__.mockSort.mockClear();
  });

  test("Should return all blogs data", async () => {
    __mocks__.mockPopulate.mockResolvedValue([__mocks__.mockBlogPost]);
    __mocks__.mockSort.mockReturnValue([__mocks__.mockBlogPost]);

    Blog.find.mockImplementation(() => {
      const chain = {
        populate: jest.fn(() => chain),
        sort: jest.fn(() => [__mocks__.mockBlogPost]),
      };
      return chain;
    });

    await getBlogs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Get all blogs!",
      data: [__mocks__.mockBlogPost],
    });
  });

  test("should handle errors", async () => {
    Blog.mockImplementation(() => ({
      save: __mocks__.mockSave,
    }));

    const error = new Error("Something went wrong");
    Blog.find.mockImplementation(() => {
      return {
        populate: __mocks__.mockPopulate.mockReturnThis(),
        sort: __mocks__.mockSort.mockRejectedValue(error),
      };
    });

    await getBlogs(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message, data: {} });
  });
});

describe("Blogs Controller: getBlogById", () => {
  beforeEach(() => {
    (req = {
      params: {
        id: "1",
      },
    }),
      (res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      });

    Blog.mockClear();
    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
  });

  test("Should return a blog by Id", async () => {
    __mocks__.mockPopulate.mockResolvedValue(__mocks__.mockBlogPost);

    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate,
      }),
    }));

    await getBlogById(req, res);

    expect(Blog.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Return blog by ID!",
      data: __mocks__.mockBlogPost,
    });
  });

  test("should handle errors", async () => {
    const error = new Error("Something went wrong");
    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate.mockRejectedValue(error),
      }),
    }));

    await getBlogById(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message, data: {} });
  });

  test("Should return 404 if blog not found", async () => {
    __mocks__.mockPopulate.mockResolvedValue(null);

    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate,
      }),
    }));

    await getBlogById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog not found!",
      data: {},
    });
  });
});

describe("Blogs Controller: getBlogsByCategoryID", () => {
  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Blog.mockClear();
    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
  });

  test("Should return all blogs by category ID", async () => {
    __mocks__.mockPopulate.mockResolvedValue([__mocks__.mockBlogPost]);

    Blog.find.mockImplementation(() => ({
      populate: jest.fn(() => ({
        populate: __mocks__.mockPopulate,
      })),
    }));

    await getBlogsByCategoryID(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Get blogs by categoryID!",
      data: [__mocks__.mockBlogPost],
    });
  });

  test("should handle errors", async () => {
    const error = new Error("Something went wrong");
    Blog.find.mockImplementation(() => ({
      populate: jest.fn(() => ({
        populate: __mocks__.mockPopulate.mockRejectedValue(error),
      })),
    }));

    await getBlogsByCategoryID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message, data: {} });
  });
});

describe("Blogs Controller: getBlogsByAuthorID", () => {
  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Blog.mockClear();
    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
  });

  test("Should return all blogs by author ID", async () => {
    __mocks__.mockPopulate.mockResolvedValue([__mocks__.mockBlogPost]);

    Blog.find.mockImplementation(() => ({
      populate: jest.fn(() => ({
        populate: __mocks__.mockPopulate,
      })),
    }));

    await getBlogsByAuthorID(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Get blogs by authorID!",
      data: [__mocks__.mockBlogPost],
    });
  });

  test("should handle errors", async () => {
    const error = new Error("Something went wrong");
    Blog.find.mockImplementation(() => ({
      populate: jest.fn(() => ({
        populate: __mocks__.mockPopulate.mockRejectedValue(error),
      })),
    }));

    await getBlogsByAuthorID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message, data: {} });
  });
});

describe("Blogs Controller: updateBlogById", () => {
  beforeEach(() => {
    req = {
      params: { id: "1" },
      body: {
        title: "Updated Blog Post - Jest Unit Test",
        categories: JSON.stringify([
          { id: "665945dbc2294698fe74d8d4" },
          { id: "665945ffc2294698fe74d8d9" },
        ]),
        content: JSON.stringify([
          { sectionHeader: "Introduction", sectionText: "Updated content..." },
        ]),
      },
      file: {
        path: "path/to/new/image.jpg",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    cloudStorage.uploadToFirebaseStorage.mockResolvedValue(
      "https://storage.googleapis.com/ix-blog-app/default/new-image.jpeg"
    );

    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
  });

  test("Should update a blog and return the updated blog data", async () => {
    __mocks__.mockPopulate.mockResolvedValue(__mocks__.mockBlogPost);
    __mocks__.mockSavePopulate.mockResolvedValue(__mocks__.mockUpdatedBlog);

    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate,
      }),
    }));

    Blog.mockImplementation(() => ({
      save: jest.fn(() => ({
        populate: jest.fn(() => ({
          populate: __mocks__.mockSavePopulate,
        })),
      })),
    }));

    await updateBlogByID(req, res);

    expect(Blog.findById).toHaveBeenCalledWith("1");
    expect(cloudStorage.uploadToFirebaseStorage).toHaveBeenCalledWith(
      req.file.path,
      req.file.path
    );
    // expect(__mocks__.mockSavePopulate).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog updated!",
      data: __mocks__.mockBlogPost,
    });
  });

  // test("Should handle errors", async () => {
  //   const error = new Error("Something went wrong");
  //   Blog.findById.mockRejectedValue(error);

  //   await updateBlogByID(req, res);

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.json).toHaveBeenCalledWith({ message: error.message, data: {} });
  // });
});
