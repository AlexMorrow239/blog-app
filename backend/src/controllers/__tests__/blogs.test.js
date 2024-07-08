const Blog = require("../../models/Blog");
const cloudStorage = require("../../services/cloud-storage");
const {
  createBlogs,
  getBlogs,
  getBlogById,
  getBlogsByCategoryID,
  getBlogsByAuthorID,
  updateBlogByID,
  deleteBlogByID,
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
      "https://storage.googleapis.com/download/storage/v1/b/blog-app-bucket-5543/o/blog-app-bucket-5543%2Fuploads%2Fblogs%2F1718873403923.jpeg?generation=1718873407280113&alt=media"
    );

    Blog.mockClear();
    __mocks__.mockSave.mockClear();
    __mocks__.mockPopulate.mockClear();
  });

  test("Should create a blog with an image and return the blog data", async () => {
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

  test("Should create a blog with no image specified and return the blog data", async () => {
    req = {
      ...req,
      file: undefined,
    };

    __mocks__.mockSave.mockResolvedValue({ _id: "1" });
    __mocks__.mockPopulate.mockResolvedValue({
      ...__mocks__.mockBlogPost,
      image: "https://storage.googleapis.com/ix-blog-app/default.jpeg",
    });

    Blog.mockImplementation(() => ({
      save: __mocks__.mockSave,
    }));

    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate,
      }),
    }));

    await createBlogs(req, res);

    expect(__mocks__.mockSave).toHaveBeenCalled();
    expect(Blog.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog created!",
      data: {
        ...__mocks__.mockBlogPost,
        image: "https://storage.googleapis.com/ix-blog-app/default.jpeg",
      },
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

  test("Should return all blogs", async () => {
    // When no category is specified
    req = {
      params: {
        id: "null",
      },
    };

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

  test("Should return all blogs", async () => {
    //When no authorId is specified
    req = {
      params: {
        id: "null",
      },
    };

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

describe("Blogs Controller: updateBlogByID", () => {
  beforeEach(() => {
    req = {
      params: {
        id: "1",
      },

      body: {
        title: "Updated Blog Post - Jest Unit Test",
        description: "This is the updated description",
        categories: JSON.stringify([
          {
            id: "aaaa45dbc2294698fe74d8d4",
            title: "Updated Frontend Development",
            color: "#FFFFFF",
          },
          {
            id: "bbbb45ffc2294698fe74d8d9",
            title: "Backend Development",
            color: "#FFFFFF",
          },
        ]),
        content: JSON.stringify([
          {
            sectionHeader: "Updated Introduction",
            sectionText: "Updated intro section text",
          },
          {
            sectionHeader: "Updated Body",
            sectionText: "Updated body section text",
          },
        ]),
      },

      file: {
        path: "path/to/new/img.jpg",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Blog.mockClear();
    __mocks__.mockPopulate.mockClear();
  });

  test("Should update the blog (including image) with the specified Id", async () => {
    cloudStorage.uploadToFirebaseStorage.mockImplementation(
      jest.fn().mockResolvedValue(__mocks__.mockUpdatedBlog.image)
    );

    // Adding the chained save method to mockBlogPost
    // save resolves with updated blog and a populate function
    // populate simply returns the updated blog
    const mockBlog = {
      ...__mocks__.mockBlogPost,
      save: __mocks__.mockSave.mockResolvedValue({
        ...__mocks__.mockUpdatedBlog,
        populate: __mocks__.mockPopulate.mockResolvedValue(
          __mocks__.mockUpdatedBlog
        ),
      }),
    };

    Blog.findById.mockImplementation(() => ({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue(mockBlog),
      })),
    }));

    cloudStorage.deleteFromFirebaseStorage.mockImplementation(
      jest.fn().mockResolvedValue(true)
    );

    await updateBlogByID(req, res);

    expect(cloudStorage.uploadToFirebaseStorage).toHaveBeenCalledWith(
      req.file.path,
      req.file.path
    );
    expect(Blog.findById).toHaveBeenCalledWith("1");
    expect(cloudStorage.deleteFromFirebaseStorage).toHaveBeenCalledWith(
      "blog-app-bucket-5543/uploads/blogs/1718873403923.jpeg"
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog updated!",
      data: __mocks__.mockUpdatedBlog,
    });
  });

  test("Should not update the blog at specified Id", async () => {
    req = {
      params: {
        id: "1",
      },
    };

    // Adding the chained save method to mockBlogPost
    // save resolves with updated blog (but no changes) and a populate function
    // populate simply returns the updated blog (no changes as per req body)
    const mockBlog = {
      ...__mocks__.mockBlogPost,
      save: __mocks__.mockSave.mockResolvedValue({
        ...__mocks__.mockBlogPost,
        populate: __mocks__.mockPopulate.mockResolvedValue(
          __mocks__.mockBlogPost
        ),
      }),
    };

    Blog.findById.mockImplementation(() => ({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue(mockBlog),
      })),
    }));

    await updateBlogByID(req, res);

    expect(Blog.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog updated!",
      data: __mocks__.mockBlogPost,
    });
  });

  test("Should handle errors", async () => {
    const error = new Error("Something went wrong");
    __mocks__.mockPopulate.mockRejectedValue(error);

    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate,
      }),
    }));

    await updateBlogByID(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message, data: {} });
  });

  test("Should return 404 if blog is not in database", async () => {
    __mocks__.mockPopulate.mockResolvedValue(null);

    Blog.findById.mockImplementation(() => ({
      populate: () => ({
        populate: __mocks__.mockPopulate,
      }),
    }));

    await updateBlogByID(req, res);

    expect(Blog.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog not found!",
      data: [],
    });
  });
});

describe("Blogs Controller: deleteBlogByID", () => {
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
    __mocks__.mockFindByIdAndDelete.mockClear();
  });

  test("Should delete a blog by id and return it", async () => {
    __mocks__.mockFindByIdAndDelete.mockResolvedValue(__mocks__.mockBlogPost);

    Blog.findByIdAndDelete.mockImplementation(__mocks__.mockFindByIdAndDelete);

    cloudStorage.deleteFromFirebaseStorage.mockImplementation(
      jest.fn().mockResolvedValue(true)
    );

    await deleteBlogByID(req, res);

    expect(__mocks__.mockFindByIdAndDelete).toHaveBeenCalledWith("1");
    expect(cloudStorage.deleteFromFirebaseStorage).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog deleted!",
      id: req.params.id,
    });
  });

  test("Should delete a blog by id and return it", async () => {
    const mockBlog = {
      ...__mocks__.mockBlog,
      image: "https://storage.googleapis.com/ix-blog-app/default.jpeg",
    };

    __mocks__.mockFindByIdAndDelete.mockResolvedValue(mockBlog);

    Blog.findByIdAndDelete.mockImplementation(__mocks__.mockFindByIdAndDelete);

    await deleteBlogByID(req, res);

    expect(__mocks__.mockFindByIdAndDelete).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Blog deleted!",
      id: req.params.id,
    });
  });

  test("Should handle errors", async () => {
    const error = new Error("Something went wrong");
    __mocks__.mockFindByIdAndDelete.mockRejectedValue(error);

    Blog.findByIdAndDelete.mockImplementation(__mocks__.mockFindByIdAndDelete);

    await deleteBlogByID(req, res);

    expect(Blog.findByIdAndDelete).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: error.message });
  });

  test("Should return 404 if blog is not in database", async () => {
    __mocks__.mockFindByIdAndDelete.mockResolvedValue(null);

    Blog.findByIdAndDelete.mockImplementation(__mocks__.findByIdAndDelete);

    await deleteBlogByID(req, res);

    expect(Blog.findByIdAndDelete).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Blog not found!" });
  });
});
