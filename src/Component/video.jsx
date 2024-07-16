import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function VideoPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`https://video-library-server.vercel.app/get-videos/${id}`)
      .then(res => {
        setVideo(res.data[0]);
      });
  }, [id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div className="video-page d-flex justify-content-center align-items-center" style={{height:'100vh',flexDirection:'column'}}>
      <Link to='/user-dashbord' style={{marginRight:'98%',marginBottom:'10px'}}><button className=" btn btn-white bi bi-arrow-left-circle-fill fs-2" ></button></Link>
      <iframe src={video.Url}  width="100%" height="700px"></iframe>
      
      <div>
        {video.Description }
      </div>
    </div>
  );
}
