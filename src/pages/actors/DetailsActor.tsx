import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ListItemComponent } from "../../component/ListItemComponent";
import { Movie } from "../../sdk";
import { Actor, getActorInitialValue } from "../../sdk/models/Actor";
import { ActorService } from "../../services/ActorService";

const service = new ActorService();
const DetailsActor = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [data, setData] = useState<Actor>(getActorInitialValue);
    const [moviesData, setMoviesData] = useState<Movie[]>([]);

    useEffect(() => {
        service.getActorById(location.state)
            .then(function (response: any) {
                setData(response.data.actorItem);
                setMoviesData(response.data.movies);
            })
            .catch(function (error: any) {
            })
    }, []);
    const showDetailsMovie = (movieId: number) => {
        navigate("/details-movie", { state: movieId });
    }

    document.title = "Actor Details | MoviesApp";
    return (
        <div>
            <React.Fragment>
                <div className="container-fluid p-5">
                    <h1 className="text-center">{data.firstName} {data.lastName}</h1>
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
                                    onClick={() => navigate("/edit-actor", { state: data })}>
                                    Edit Actor
                                </button>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className="row">
                            <div className="col-6">
                                <dl className="row">
                                    <dt className="col-4">First Name: </dt>
                                    <dd className="col-8">{data.firstName}</dd>
                                </dl>
                                <dl className="row">
                                    <dt className="col-4">Last Name: </dt>
                                    <dd className="col-8">{data.lastName}</dd>
                                </dl>
                            </div>
                            <div className="col-6">
                                <dl className="row">
                                    <dt className="col-4">Data Of Birth : </dt>
                                    <dd className="col-8">{moment(data.dateOfBirth.toString()).format('MM-DD-YYYY')}</dd>
                                </dl>
                            </div>
                        </div>
                        <dl className="row">
                            <dt className="col-2">Biography: </dt>
                            <dd className="col-10">{data.biography}</dd>
                        </dl>
                    </div>

                    <div className="border-top border-2 my-5 py-5">
                        <h2>List of movies:</h2>

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
                                                check={false}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </React.Fragment>
        </div>
    );
};

export default DetailsActor;
