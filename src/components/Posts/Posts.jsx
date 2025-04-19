import { useState } from "react";
import { useEffect } from "react";
import { getPost } from "../../API/PostApi";
import { deletePost } from "../../API/PostApi";
import Form from "../Form/Form";
import "./Posts.css";

export default function Posts() {
  const [data, setData] = useState([]);

  const getPostData = async () => {
    const response = await getPost();
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  // function to delete post
  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        console.log("deleting");
        const newUpdatePost = data.filter((curPost) => {
          console.log("ss", curPost.id, id);
          return curPost.id !== id;
        });
        setData(newUpdatePost);
      } else {
        console.log("Failed to delete post:", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section>
        <Form data={data} setData={setData} />
      </section>
      <section className="section-post">
        <ol>
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id}>
                <p>
                  Title: {title} {id}
                </p>
                <p>Body: {body}</p>
                <button>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
