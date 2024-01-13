import { useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import { useEffect, useState } from "react";

export const defaultPost = {
  id: null,
  title: null,
  body: null,
  href: null,
  author: {
    firstName: null,
    lastName: null,
    email: null,
  },
};

function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(defaultPost);
  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:4000/posts/fetch/${id}`)
        .then((data) => data.json())
        .then((p) => setPost(p[0] || defaultPost))
        .catch((err) => console.log(err));
    }
  }, [id]);

  function submitHandler(e) {
    e.preventDefault();
    if (id !== undefined)
      fetch(`http://127.0.0.1:4000/posts/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
    else
      fetch("http://127.0.0.1:4000/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(() => navigate("/"))
        .catch((err) => console.log(err));
  }

  return (
    <>
      <Nav />
      <div className="h-1/2 isolate bg-white px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Add a post
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Your opinion is important to us; please feel free to share it.
          </p>
        </div>
        <form className="mx-auto max-w-xl sm:mt-20" onSubmit={submitHandler}>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  value={post.author.firstName || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      author: { ...post.author, firstName: e.target.value },
                    })
                  }
                  autoComplete="given-name"
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  value={post.author.lastName || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      author: { ...post.author, lastName: e.target.value },
                    })
                  }
                  autoComplete="family-name"
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={post.author.email || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      author: { ...post.author, email: e.target.value },
                    })
                  }
                  autoComplete="email"
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={post.title || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      title: e.target.value,
                    })
                  }
                  autoComplete="email"
                  className="block outline-none w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="body"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Post
              </label>
              <div className="mt-2.5">
                <textarea
                  name="body"
                  id="body"
                  value={post.body || ""}
                  onChange={(e) =>
                    setPost({
                      ...post,
                      body: e.target.value,
                    })
                  }
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="flex items-center justify-center gap-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
              post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Create;
