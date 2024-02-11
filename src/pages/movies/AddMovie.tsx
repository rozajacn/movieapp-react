import { Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import { MovieService } from "../../services/MovieService";

const service = new MovieService();
const AddMovie = () => {
    const navigate = useNavigate();

    document.title = "Add Movie | MoviesApp";
    return (
        <div>
            <React.Fragment>
                <div className="container-fluid p-5">
                    <h1 className="text-center">Add Movie</h1>
                    <div className="d-flex justify-content-center">
                        <Formik
                            initialValues={{ title: '', director: '', writers: '', genre: '', rating: 0, releaseYear: 0, description: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    service.addMovie(values)
                                        .then(function (response: any) {
                                            navigate('/');
                                            toast.success(`You have create new movie ${values.title}!`);
                                        })
                                        .catch(function (error: any) {
                                        })
                                    setSubmitting(false);
                                }, 1000);

                            }}
                            validationSchema={Yup.object({
                                title: Yup.string()
                                    .required('Title is required*'),
                                director: Yup.string()
                                    .required('Director is required*'),
                                writers: Yup.string()
                                    .required('Writers is required*'),
                                genre: Yup.string()
                                    .required('Genre is required*'),
                                rating: Yup.string()
                                    .required('Rating is required*'),
                                releaseYear: Yup.string()
                                    .required('Release Year is required*'),
                                description: Yup.string()
                                    .required('Description is required*'),
                            })}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form className="w-50" >
                                    <div className="form-group py-2">
                                        <label htmlFor="title">Title: </label>
                                        <Field
                                            id="title"
                                            name="title"
                                            className="form-control mt-1"
                                            type="text" />
                                        {touched.title && errors.title && <div className="text-danger">{errors.title}</div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="director">Director: </label>
                                        <Field
                                            id="director"
                                            name="director"
                                            className="form-control mt-1"
                                            type="text" />
                                        {touched.director && errors.director && <div className="text-danger">{errors.director}</div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="writers">Writers: </label>
                                        <Field
                                            id="writers"
                                            name="writers"
                                            className="form-control mt-1"
                                            type="text" />
                                        {touched.writers && errors.writers && <div className="text-danger">{errors.writers}</div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="genre">Genre: </label>
                                        <Field
                                            id="genre"
                                            name="genre"
                                            className="form-control mt-1"
                                            type="text" />
                                        {touched.genre && errors.genre && <div className="text-danger">{errors.genre}</div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="rating">Rating: </label>
                                        <Field
                                            id="rating"
                                            name="rating"
                                            className="form-control mt-1"
                                            type="number" />
                                        {touched.rating && errors.rating && <div className="text-danger">{errors.rating}</div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="releaseYear">Release Year: </label>
                                        <Field
                                            id="releaseYear"
                                            name="releaseYear"
                                            className="form-control mt-1"
                                            type="number" />
                                        {touched.releaseYear && errors.releaseYear && <div className="text-danger">{errors.releaseYear}</div>}
                                    </div>
                                    <div className="form-group py-2">
                                        <label htmlFor="description">Description:</label>
                                        <Field
                                            id="description"
                                            name="description"
                                            className="form-control mt-1"
                                            as="textarea" />
                                        {touched.description && errors.description && <div className="text-danger">{errors.description}</div>}
                                    </div>

                                    <div className="d-flex flex-row-reverse py-3">
                                        <div className="p-1">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={isSubmitting}>
                                                {isSubmitting ? "Please wait..." : "Save"}
                                            </button>
                                        </div>
                                        <div className="p-1">
                                            <Link
                                                className="btn btn-secondary btn-block"
                                                to="/"
                                            >
                                                Cancel
                                            </Link>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                </div>
            </React.Fragment>
        </div>
    );
};

export default AddMovie;
