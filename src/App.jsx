import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const user = {
    firstName: "Alex",
    lastName: "Morrow",
    bio: "email",
    email: "something@example.com",
    image: "https://via.placeholder.com/150",
    authenticated: true,
  };

  const blogs = [
    {
      id: 1,
      title: "Learning Js",
      author: user,
    },
    {
      id: 2,
      title: "Learning React",
      author: user,
    },
    {
      id: 3,
      title: "Learning Node",
      author: user,
    },
  ];

  return (
    <>
      <div>
        <h1>Welcome to our new app</h1>
        <h5>{user.firstName}</h5>
        <img src={user.image} alt="user" />
      </div>
      <div>
        {blogs.map((blog) => {
          return (
            <>
              <h1>{blog.title}</h1>
              <h5>{JSON.stringify(blog.author.firstName)}</h5>
              <img src={blog.author.image} alt="author" />
            </>
          );
        })}
      </div>

      <div>
        <button class="btn btn-primary">Click Me</button>
      </div>
    </>
  );
}

export default App;
