import JoditEditor from "jodit-react";
import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Form, Input, Label, Button, Container } from "reactstrap";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./TextEditor.css";

const TextEditor = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [post, setPost] = useState({
    title: "",
    tag: "",
    content: "",
  });

  const createPost = async (event) => {
    event.preventDefault();

    if (post.title.trim() === "") {
      toast.error("Post title is required !!");
      return;
    }

    if (post.content.trim() === "") {
      toast.error("Post content is required !!");
      return;
    }

    console.log(post);
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("tags", post.tag);
      formData.append("desc", post.content);
      formData.append("image", event.target.image.files[0]);
      console.log(formData.tags);

      const response = await axios.post(
        "http://localhost:3000/api/v1/post/addPost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "http://localhost:5173/",
          },
        }
      );

      console.log(response);
      navigate("/empower");
    } catch (err) {
      console.log(err);
    }
  };

  const fieldChanged = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const tagChanged = (event) => {
    setPost({ ...post, tag: event.target.value });
  };

  const contentFieldChanged = (data) => {
    setPost({ ...post, content: data });
  };

  return (
    <div className="wrapper">
      <div className="textedit-cont">
        <div className="card-body">
          <h3 className="custom-heading">What is going on in your mind?</h3>
          <Form onSubmit={createPost}>
            <div className="head-3">
              <div className="my-3">
                <Label htmlFor="title" className="custom-label">
                  Post Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter here"
                  className="custom-input"
                  name="title"
                  onChange={fieldChanged}
                />
              </div>

              <div className="my-3">
                {" "}
                <Label htmlFor="tag" className="custom-label">
                  Tag:
                </Label>
                <select className="type-select" onChange={tagChanged}>
                  <option className="type-option" value="">
                    Select Type
                  </option>
                  <option className="type-option" value="type1">
                    Type 1
                  </option>
                  <option className="type-option" value="type2">
                    Type 2
                  </option>
                </select>
              </div>
            </div>

            <div className="my-3">
              <Label htmlFor="content" className="custom-label">
                Post Content
              </Label>

              <JoditEditor
                ref={editor}
                value={post.content}
                onChange={(newContent) => contentFieldChanged(newContent)}
              />
            </div>

            <div className="mt-3">
              <Label htmlFor="image" className="custom-label">
                Select Post Banner
              </Label>
              <Input id="image" type="file" />
            </div>

            <Container className="text-center">
              <Button type="submit" className="rounded-0" color="primary">
                Create Post
              </Button>
              <Button className="rounded-0 ms-2" color="danger">
                Reset Content
              </Button>
            </Container>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
