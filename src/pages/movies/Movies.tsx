import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ListItemComponent } from "../../component";
import { Movie } from "../../sdk";
import { MovieService } from "../../services/MovieService";

const service = new MovieService();
const Movies = () => {
    const navigate = useNavigate();

    const [moviesData, setMoviesData] = useState<Movie[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        service.getMovies(search)
            .then(function (response: any) {
                setMoviesData(response.data.data)

            })
            .catch(function (error: any) {
            })
    }, []);

    const showDetailsMovie = (movieId: number) => {
        navigate("details-movie", { state: movieId });
    }

    const onDeleteMovie = (movieId: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result: any) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your movie has been deleted.',
                    'success'
                )
                service.deleteMovie(movieId)
                    .then(function (response) {
                        setMoviesData([
                            ...moviesData.filter((element) => {
                                return element.id !== movieId
                            }),
                        ]);
                    })
                    .catch(function (error) {
                    });
            }
        })
    }
    document.title = "Home | MoviesApp";
    return (
        <div>
            <React.Fragment>
                <div className="container-fluid p-5">
                    <h1 className="text-center">Movies</h1>
                    <div className="d-flex mb-5 mt-5">
                        <Formik
                            initialValues={{
                                search: '',
                            }}
                            onSubmit={(values) => {
                                service.getMovies(values.search)
                                    .then(function (response: any) {
                                        setMoviesData(response.data.data)
                                    })
                                    .catch(function (error: any) {
                                    })
                            }}
                        >
                            {({ }) => (
                                <div className="d-flex mb-5 mt-5">
                                    <div className="me-auto ">
                                        <Form >
                                            <div className="form-group m-0">
                                                <div className="input-group">
                                                    <Field
                                                        name="search"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Search by movie title ..." />
                                                    <button
                                                        className="btn btn-primary rounded-0 rounded-end bi bi-search"
                                                        type="submit"
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            )}
                        </Formik>

                        <div style={{ alignSelf: 'center', flex: 'auto' }} className="d-flex flex-row-reverse">
                            <Link
                                className="btn btn-primary btn-block"
                                to="/add-movie"         >
                                Add Movie
                            </Link>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div>
                            {moviesData.map((element: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <ListItemComponent
                                            name={element.title}
                                            description={element.description}
                                            id={element.id as number}
                                            showDetails={showDetailsMovie}
                                            onDelete={onDeleteMovie}
                                            check={true}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        </div>
    );
};

export default Movies;
