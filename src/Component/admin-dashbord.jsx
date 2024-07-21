import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../css/admindashbord.css';

export function Dashbord() {
    const [Video, setVideo] = useState([]);

    function loadVideos() {
        axios.get('https://mern-api-snowy.vercel.app/get-video')
            .then(res => {
                setVideo(res.data);
            })
            .catch(err => {
                console.error("Error loading videos:", err);
            });
    }

    useEffect(() => {
        loadVideos();
    }, []);

    return (
        <div className="admin-dashboard">
            <h3 className="dashboard-title">Admin Dashboard</h3>
            <Link to={'/addvideo'} className="btn btn-success sticky-add-video">
                <i className="bi bi-camera-video-fill me-2"></i> Add Video
            </Link>
            <table className="table table-hover mt-3" style={{ height: '100vh' }}>
                <thead className="sticky-top " style={{fontSize:'20px'}}>
                    <tr>
                        <th>Title</th>
                        <th>Preview</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Video.map(video => (
                        <tr key={video.VideoId}>
                            <td>{video.Title}</td>
                            <td>
                                <iframe src={video.Url} className="video-preview" frameBorder="0"></iframe>
                            </td>
                            <td>
                                <Link to={`/delete-video/${video.VideoId}`} title="Delete video" className="btn btn-danger me-3">
                                    <i className="bi bi-trash-fill" ></i>
                                </Link>
                                <Link to={`/edit-video/${video.VideoId}`} title="Edit video" className="btn btn-warning">
                                    <i className="bi bi-pen-fill" ></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
