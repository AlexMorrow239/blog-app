const mockSave = jest.fn();
const mockPopulate = jest.fn();
const mockSort = jest.fn();
const mockFindByIdAndDelete = jest.fn();

const mockBlogPost = {
  _id: "1",
  title: "My First Blog Post - Jest Unit Test",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  categoryIds: [
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
  ],
  authorId: "665e4736cdb3ef11df5134f3",
  content: [
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
  ],
  image:
    "https://storage.googleapis.com/download/storage/v1/b/blog-app-bucket-5543/o/blog-app-bucket-5543%2Fuploads%2Fblogs%2F1718873403923.jpeg?generation=1718873407280113&alt=media",
};

const mockUpdatedBlog = {
  _id: "1",
  title: "Updated Blog Post - Jest Unit Test",
  description: "This is the updated description",
  categoryIds: [
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
  ],
  authorId: "665e4736cdb3ef11df5134f3",
  content: [
    {
      sectionHeader: "Updated Introduction",
      sectionText: "Updated intro section text",
    },
    {
      sectionHeader: "Updated Body",
      sectionText: "Updated body section text",
    },
    {
      sectionHeader: "Conclusion",
      sectionText:
        "I hope you enjoyed reading my first blog post. I'm looking forward to sharing more with you in the future.\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  ],
  image:
    "https://storage.googleapis.com/download/storage/v1/b/blog-app-bucket-5543/o/blog-app-bucket-5543%2Fuploads%2Fblogs%2F1718801038279.png?generation=1718801039940032&alt=media",
};

module.exports.__mocks__ = {
  mockSave,
  mockPopulate,
  mockSort,
  mockFindByIdAndDelete,
  mockBlogPost,
  mockUpdatedBlog,
};

// path: backend/src/controllers/__tests__/blogs.test.js
