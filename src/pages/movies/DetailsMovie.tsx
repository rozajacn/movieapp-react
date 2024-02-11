import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Movie, MovieActor, MovieRating, getMovieInitialValue } from "../../sdk";
import { MovieService } from "../../services/MovieService";
import { Actor, getActorInitialValue } from "../../sdk/models/Actor";
import { toast } from "react-toastify";
import { ActorService } from "../../services/ActorService";

const service = new MovieService();
const actorService = new ActorService();

const DetailsMovie = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState<Movie>(getMovieInitialValue);
    const [actors, setActors] = useState<Actor[]>([]);
    const [allActors, setAllActors] = useState<Actor[]>([]);
    const [ratings, setRatings] = useState<MovieRating[]>([]);
    const [newRating, setNewRating] = useState(0.0);
    const [selectedActor, setSelectedActor] = useState<Actor>(getActorInitialValue);

    useEffect(() => {
        service.getMovieById(location.state)
            .then(function (response: any) {
                setData(response.data.movieItem)
                setActors(response.data.actors);
                setRatings(response.data.movieRatings);
            })
            .catch(function (error: any) {
            })

            actorService.getActors("")
            .then(function (response: any) {
                setAllActors(response.data.data);
            })
            .catch(function (error: any) {
            })
    }, []);

    document.title = "Movie Details | MoviesApp";
    return (
        <div>
            <React.Fragment>
                <div className="container-fluid p-5">
                    <h1 className="text-center">{data.title}</h1>
                    <div className="py-5 ">
                        <div className="d-flex justify-content-center py-3">
                            <div className="px-2">
                                <Link
                                    className="btn btn-secondary btn-block"
                                    to="/" >
                                    Back
                                </Link>
                            </div>
                            <div >
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/edit-movie", { state: data })}>
                                    Edit Movie
                                </button>
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className="row">
                            <div className="col-6">
                                <dl className="row">
                                    <dt className="col-2">Title: </dt>
                                    <dd className="col-10">{data.title}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-2">Director: </dt>
                                    <dd className="col-10">{data.director}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-2">Writers: </dt>
                                    <dd className="col-10">{data.writers}</dd>
                                </dl>
                            </div>
                            <div className="col-6">
                                <dl className="row">
                                    <dt className="col-4">Genre: </dt>
                                    <dd className="col-8">{data.genre}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-4">Release Year: </dt>
                                    <dd className="col-8">{data.releaseYear}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-4">Rating: </dt>
                                    <dd className="col-8">{data.rating}</dd>
                                </dl>
                            </div>
                        </div>
                        <dl className="row">
                            <dt className="col-2">Description: </dt>
                            <dd className="col-10">{data.description}</dd>
                        </dl>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-6">
                            <h3 className="text-left">Actors</h3>
                            <div className="row">
                                <h5 className="text-left">Add new actor:</h5>
                                <div className="col-8">
                                <select
                                    id="field"
                                    name="field"
                                    className="form-control"
                                    onChange={(e) => {
                                        let item = allActors.find(i => i.id === parseInt(e.target.value));
                                        item ? setSelectedActor(item) : setSelectedActor(getActorInitialValue);
                                    }}
                                >
                                    <option value="" hidden>Select</option>
                                    {allActors.map((field, i) => {
                                        return (
                                            <option key={field.id} value={field.id} style={{ fontSize: "120%" }}>
                                                {field.firstName + " " + field.lastName}
                                            </option>
                                        );
                                    })}
                                </select>
                                </div>
                                <div className="col-4">
                                    <button 
                                        type="button" 
                                        onClick={() => { 
                                            let movieActorItem: MovieActor = {
                                                movieId: data.id,
                                                actorId: selectedActor.id
                                            }
                                            service.addMovieActor(movieActorItem)
                                                .then(function (response) {
                                                    toast.success("Actor added successfully!");
                                                    setActors(prevRatings => [...prevRatings, selectedActor]);
                                                })
                                                .catch(function (error) {
                                                    toast.error(error.message);
                                                });
                                        }} 
                                        className="btn btn-primary">
                                        Add
                                    </button>
                                </div>
                            </div>
                            <hr/>
                            <h5 className="text-left">Actors list:</h5>
                            <div>
                                {actors.map((element: any, index: any) => {
                                    return (
                                        <div key={index}>
                                            <h6>{element.firstName} {element.lastName}</h6>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-6">
                            <h3 className="text-left">Ratings</h3>
                            <div className="row">
                                <h5 className="text-left">Add new rating:</h5>
                                <div className="col-8">
                                    <input
                                        id="daysBack"
                                        name="value"
                                        defaultValue={0.0}
                                        onChange={(e) => {setNewRating(parseFloat(e.target.value))}}
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter number of days"
                                    />
                                </div>
                                <div className="col-4">
                                    <button 
                                        type="button" 
                                        onClick={() => { 
                                            let ratingItem: MovieRating = {
                                                movieId: data.id,
                                                rating: newRating
                                            }
                                            service.addMovieRating(ratingItem)
                                                .then(function (response) {
                                                    toast.success("Rating added successfully!");
                                                    setRatings(prevRatings => [...prevRatings, ratingItem]);
                                                })
                                                .catch(function (error) {
                                                    toast.error(error);
                                                });
                                        }} 
                                        className="btn btn-primary">
                                        Add
                                    </button>
                                </div>
                            </div>
                            
                            <hr/>
                            <h5 className="text-left">Ratings list:</h5>
                            {ratings.map((element: any, index: any) => {
                                return (
                                    <div key={index}>
                                        <h6>{element.rating}</h6>
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

export default DetailsMovie;
