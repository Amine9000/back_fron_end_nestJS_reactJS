import { Link, useNavigate, useParams } from "react-router-dom";
import Nav from "./Nav";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { defaultPost } from "./Create";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(defaultPost);
  useEffect(() => {
    fetch(`http://127.0.0.1:4000/posts/fetch/${id}`)
      .then((res) => res.json())
      .then((p) => setPost(p[0]))
      .catch((err) => console.log(err));
  }, [id]);
  function handelDelete(postId) {
    fetch(`http://127.0.0.1:4000/posts/delete/${postId}`, {
      method: "DELETE",
    })
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <Nav />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              One post.
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Learn how to do something usefull.
            </p>
          </div>
          <div className="w-full mx-auto mt-10 max-w-2xl gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
            <article
              key={post.id || 0}
              className="flex flex-col items-start justify-between w-full border-b-2 pb-4 mb-4"
            >
              <div className="w-full group relative">
                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link to={`/posts/${post.id || ""}`} className="mt-2">
                    <span className="absolute inset-0" />
                    {post.title || ""}
                  </Link>
                  <div className="absolute right-2 top-2 font-normal">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
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
                              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                            />
                          </svg>
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={"/update/" + (post.id || "")}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm text-sky-600"
                                  )}
                                >
                                  update
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  onClick={() => handelDelete(post.id)}
                                  className={classNames(
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700",
                                    "block px-4 py-2 text-sm text-red-600"
                                  )}
                                >
                                  delete
                                </span>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.body}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="text-sm leading-6">
                  <p className="font-semibold text-gray-900">
                    <span className="absolute inset-0" />
                    <small className="text-gray-900">
                      {(post.author.firstName || "") +
                        " " +
                        (post.author.lastName || "")}
                    </small>
                    <br />
                    <small className="text-sm text-gray-500 font-normal">
                      {post.author.email || ""}
                    </small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
