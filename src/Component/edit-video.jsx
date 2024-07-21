


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import "../css/edit.css"; 
export function Editvideo() {
  const [videos, setvideos] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Description: "",
      Views: 0,
      Likes: 0,
      Dislikes: 0,
      CategoryId: 0,
    },
  ]);
  const [categories, setcategories] = useState([
    { CategoryId: 0, CategoryName: "" },
  ]);

  let param = useParams();
  let navigate = useNavigate();

  function Loadvideo() {
    axios
      .get(`https://mern-api-snowy.vercel.app/${param.id}`)
      .then((res) => {
        setvideos(res.data);
      });
  }

  function Loadcategories() {
    axios.get("https://mern-api-snowy.vercel.app/get-categories").then((response) => {
      response.data.unshift({
        CategoryId: "-1",
        CategoryName: "Select Category",
      });
      setcategories(response.data);
    });
  }
  const formik = useFormik({
    initialValues: {
      VideoId: videos[0].VideoId,
      Title: videos[0].Title,
      Url: videos[0].Url,
      Description: videos[0].Description,
      Views: videos[0].Views,
      Likes: videos[0].Likes,
      Dislikes: videos[0].Dislikes,
      CategoryId: videos[0].CategoryId,
    },
    onSubmit: (video) => {
      axios.put(`https://mern-api-snowy.vercel.app/${video.VideoId}`, video).then(() => {
        alert("Video updated");
        navigate("/admin-dashbord");
      });
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    Loadvideo();
    Loadcategories();
  }, []);

  return (
    <div className="edit-video-container mt-5">
      <h3 className="mb-4 text-dark">Edit Video</h3>
      <form onSubmit={formik.handleSubmit}>
        <dl className="row">
          <dt className="col-3 text-dark">Video ID</dt>
          <dd className="col-9">
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.VideoId}
              name="VideoId"
              className="form-control"
              readOnly
            />
          </dd>
          <dt className="col-3   text-dark">Title</dt>
          <dd className="col-9">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.Title}
              name="Title"
              className="form-control"
            />
          </dd>
          <dt className="col-3   text-dark">URL</dt>
          <dd className="col-9">
            <input
              type="text"
              onChange={formik.handleChange}
              value={formik.values.Url}
              name="Url"
              className="form-control"
            />
          </dd>
          <dt className="col-3  text-dark">Description</dt>
          <dd className="col-9">
            <textarea
              name="Description"
              onChange={formik.handleChange}
              value={formik.values.Description}
              rows="4"
              className="form-control"
            ></textarea>
          </dd>
          <dt className="col-3 text-dark">Views</dt>
          <dd className="col-9">
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.Views}
              name="Views"
              className="form-control"
            />
          </dd>
          <dt className="col-3 text-dark">Likes</dt>
          <dd className="col-9">
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.Likes}
              name="Likes"
              className="form-control"
            />
          </dd>
          <dt className="col-3 text-dark">Dislikes</dt>
          <dd className="col-9">
            <input
              type="number"
              onChange={formik.handleChange}
              value={formik.values.Dislikes}
              name="Dislikes"
              className="form-control"
            />
          </dd>
          <dt className="col-3 text-dark">Category</dt>
          <dd className="col-9">
            <select
              name="CategoryId"
              value={formik.values.CategoryId}
              onChange={formik.handleChange}
              className="form-control"
            >
              {categories.map((category) => (
                <option key={category.CategoryId} value={category.CategoryId}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </dd>
        </dl>
        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-3">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin-dashbord")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
