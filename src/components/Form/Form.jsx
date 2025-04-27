import React from "react";
import "./Form.css";
import { useState } from "react";
import { postData } from "../../API/PostApi";
import { useEffect } from "react";
import { updatePost } from "../../API/PostApi";

export default function Form({
  data,
  setData,
  updateDataApi,
  setUpdateDataApi,
}) {
  const detail = {
    title: "",
    body: "",
  };
  const [addData, setAddData] = useState({ ...detail });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  // get the updated data and add into input field

  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  const handleInputChange = (event) => {
    // console.log("sdsfdsd");
    const name = event.target.name;
    const value = event.target.value;
    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    // for understanding perpose
    // {...data, [name]: 'sdfsd'}
    // data && data.name
    // data?.name
    // data?.[name]
    // setAddData({ ...addData, ['asdasd']: addData.title }); // old title
    // setAddData((newAddData) => ({ ...addData, ["asdasd"]: newAddData.title })); // updated title
  };

  // add post data
  const addPostData = async () => {
    const res = await postData(addData);
    console.log("res ", res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ ...detail });
    }
  };

  // update post data
  const updatePostData = async () => {
    try {
      const res = await updatePost(updateDataApi.id, addData);
      console.log(res);

      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curElem) => {
            return curElem.id === res.data.id ? res.data : curElem;
          });
        });
        setAddData({ ...detail });
        setUpdateDataApi({});
        // or event.currentTarget.reset()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (/** @type {Event} */ event) => {
    event.preventDefault();
    if (data.title == "" || data.body == "") {
      alert("please enter detail");
    } else {
      const action = event.nativeEvent.submitter.value;
      if (action === "Add") {
        addPostData();
        event.currentTarget.reset();
        setAddData({ ...detail });
      } else if (action === "Edit") {
        updatePostData();
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit} action="">
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={addData.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={addData.body}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="form-button"
        type="submit"
        value={isEmpty ? "Add" : "Edit"}
      >
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
}
