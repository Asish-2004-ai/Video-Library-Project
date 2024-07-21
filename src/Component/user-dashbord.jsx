import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../css/userdashbord.css";

export function Userdashbord() {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(["user-id"]);
  const navigate = useNavigate();

  function Loadvideos(url) {
    axios.get(url).then((res) => {
      setVideos(res.data);
    });
  }

  function Loadcategories() {
    axios.get('https://mern-api-snowy.vercel.app/get-categories')
      .then(res => {
        const response = [{ CategoryId: 'ALL', CategoryName: 'ALL' }, ...res.data];
        setCategories(response);
      });
  }

  function handleChange(e) {
    const categoryId = e.target.value;
    if (categoryId === 'ALL') {
      Loadvideos("https://mern-api-snowy.vercel.app/get-video");
    } else {
      Loadvideos(`https://mern-api-snowy.vercel.app/get-categoryid/${categoryId}`);
    }
  }

  function handleFullSize(videoId) {
    navigate(`/video/${videoId}`);
  }

  function handleLike(videoId) {
    const updatedVideos = videos.map(video => {
      if (video.VideoId === videoId) {
        axios.put(`https://mern-api-snowy.vercel.app/update-like/${videoId}`, { Likes: video.Likes + 1 })
          .then(() => {
            video.Likes += 1;
          });
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  function handleDislike(videoId) {
    const updatedVideos = videos.map(video => {
      if (video.VideoId === videoId) {
        axios.put(`https://mern-api-snowy.vercel.app/update-dislike/${videoId}`, { Dislikes: video.Dislikes + 1 })
          .then(() => {
            video.Dislikes += 1;
          });
      }
      return video;
    });
    setVideos(updatedVideos);
  }

  useEffect(() => {
    Loadvideos('https://mern-api-snowy.vercel.app/get-video');
    Loadcategories();
  }, []);

  return (
    <div className="user-dashboard row">
      <h3 className="dashboard-title">User Dashboard</h3>
      <div className="col-2">
        <nav className="sticky-top" style={{ top: '20px' }}>
          <label className="text-white mb-2">Select Categories</label>
          <select className="form-select" onChange={handleChange}>
            {categories.map(category =>
              <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName.toUpperCase()}</option>
            )}
          </select>
        </nav>
      </div>
      <main className="video-container d-flex flex-wrap col-10">
        {videos.map((video) => (
          <div className="card video-card" style={{ width: "270px", margin: '10px', height: '330px' }} key={video.VideoId}>
            <div className="card-header video-frame" style={{ height: "200px", width: '270px' }}>
              <iframe src={video.Url} width='250px' style={{ height: "200px" }}></iframe>
            </div>
            <div className="card-body video-title">
              <span>{video.Title}</span>
              <button onClick={() => handleFullSize(video.VideoId)} title="Full Size" className="bi bi-aspect-ratio" style={{ fontSize: '20px', marginLeft: '20%', minWidth: '10px', border: 'none', color: 'blue' }}></button>
            </div>
            <div className="card-footer video-actions">
              <button className="btn bi bi-hand-thumbs-up-fill fs-5" onClick={() => handleLike(video.VideoId)}>{video.Likes}</button>
              <button className="btn bi bi-hand-thumbs-down-fill fs-5" onClick={() => handleDislike(video.VideoId)}>{video.Dislikes}</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
