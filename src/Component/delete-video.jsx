import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/delete.css"; // Import your CSS file

export function Deletevideo() {
  let params = useParams([]);
  let navigate = useNavigate();
  const [dvideo, setdvideo] = useState([{
    VideoId: 0,
    Title: "",
    Url: "",
    Description: "",
    Views: 0,
    Likes: 0,
    Dislikes: 0,
    CategoryId: 0,
  }]);

  function yesclick() {
    axios.delete(`http://127.0.0.1:3030/delete-video/${params.id}`).then(() => {
      alert("Video Deleted");
      navigate("/admin-dashbord");
    });
  }

  function noclick() {
    navigate("/admin-dashbord");
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:3030/get-videos/${params.id}`).then((res) => {
      setdvideo(res.data);
    });
  }, []);

  return (
    <div className="delete-video-container d-flex justify-content-center align-items-center">
      <div className="card w-50">
        <div className="card-header text-center">
          <iframe
            style={{ width: "100%", height: "300px" }}
            src={dvideo[0].Url}
            frameBorder="0"
            title="Video Preview"
          ></iframe>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{dvideo[0].Title}</h5>
          <p className="card-text">{dvideo[0].Description}</p>
        </div>
        <div className="card-footer text-center">
          <p>Are you sure you want to delete this video?</p>
          <div className="text-center">
            <button className="btn btn-primary me-3" onClick={yesclick}>
              Yes
            </button>
            <button className="btn btn-danger" onClick={noclick}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
