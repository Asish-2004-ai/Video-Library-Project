import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/addvideo.css'

export function Addvideo() {
    const [categories, setcategories] = useState([{ CategoryId: 0, CategoryName: '' }]);

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: { VideoId: 0, Title: '', Url: '', Description: '', Views: 0, Likes: 0, Dislikes: 0, CategoryId: 0 },
        onSubmit: (video => {
            axios.post('http://127.0.0.1:3030/add-video', video)
                .then(() => {
                    alert('Video added successfully');
                    navigate('/admin-dashbord');
                })
        })
    });

    function Loadcategories() {
        axios.get('http://127.0.0.1:3030/get-categories')
            .then(response => {
                response.data.unshift({ CategoryId: '-1', CategoryName: 'Select Category' });
                setcategories(response.data);
            })
    }

    useEffect(() => {
        Loadcategories();
    }, []);

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Add New Video</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={formik.handleSubmit}>
                        <dl className="row">
                            <dt className="col-3">Video ID</dt>
                            <dd className="col-9">
                                <input className="form-control" onChange={formik.handleChange} type="number" name="VideoId" value={formik.values.VideoId} />
                            </dd>
                            <dt className="col-3">Title</dt>
                            <dd className="col-9">
                                <input className="form-control" onChange={formik.handleChange} type="text" name="Title" value={formik.values.Title} />
                            </dd>
                            <dt className="col-3">URL</dt>
                            <dd className="col-9">
                                <input className="form-control" onChange={formik.handleChange} type="text" name="Url" value={formik.values.Url} />
                            </dd>
                            <dt className="col-3">Description</dt>
                            <dd className="col-9">
                                <textarea className="form-control" onChange={formik.handleChange} name="Description" rows="4" cols="40" value={formik.values.Description}></textarea>
                            </dd>
                            <dt className="col-3">Views</dt>
                            <dd className="col-9">
                                <input className="form-control" onChange={formik.handleChange} type="number" name="Views" value={formik.values.Views} />
                            </dd>
                            <dt className="col-3">Likes</dt>
                            <dd className="col-9">
                                <input className="form-control" onChange={formik.handleChange} type="number" name="Likes" value={formik.values.Likes} />
                            </dd>
                            <dt className="col-3">Dislikes</dt>
                            <dd className="col-9">
                                <input className="form-control" onChange={formik.handleChange} type="number" name="Dislikes" value={formik.values.Dislikes} />
                            </dd>
                            <dt className="col-3">Category</dt>
                            <dd className="col-9">
                                <select className="form-select" name="CategoryId" onChange={formik.handleChange} value={formik.values.CategoryId}>
                                    {
                                        categories.map(category => <option key={category.CategoryId} value={category.CategoryId}>{category.CategoryName}</option>)
                                    }
                                </select>
                            </dd>
                        </dl>
                        <div className="text-center">
                            <button type="submit" className="btn btn-success me-3">Add Video</button>
                            <Link to={'/admin-dashbord'} className="btn btn-danger">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
