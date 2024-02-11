import React, { useState } from "react";
import Actors from "../actors/Actors";
import Movies from "../movies/Movies";

export const Home = () => {
    const [activeTab, setactiveTab] = useState("1");

    const toggle = (tab: any) => {
        if (activeTab !== tab) {
            setactiveTab(tab);
        }
    };

    document.title = "Home | MovieApp";
    return (
        <React.Fragment>
            <div className="container-fluid p-5">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-movies" type="button" role="tab" aria-controls="nav-movies" aria-selected="true">Movies</button>
                        <button className="nav-link" id="nav-actors-tab" data-bs-toggle="tab" data-bs-target="#nav-actors" type="button" role="tab" aria-controls="nav-actors" aria-selected="false">Actors</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-movies" role="tabpanel" aria-labelledby="nav-movies-tab" tabIndex={0}><Movies /></div>
                    <div className="tab-pane fade" id="nav-actors" role="tabpanel" aria-labelledby="nav-actors-tab" tabIndex={0}><Actors /></div>
                </div>
            </div>
        </React.Fragment>
    );
}

