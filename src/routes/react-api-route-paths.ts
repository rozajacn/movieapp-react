import config from "../config";

export function apiRoutesForContext(
) {
    return {
        server: {
            root: () => config.apiBaseUrl,
        },
        app: () => {
            return {
                getMovies: () => "/Movies",
                getMovieById: () => "/Movies",
                addMovie: () => "/Movies",
                deleteMovie: () => "/Movies",
                editMovie: () => "/Movies",
                addMovieRating: () => "/MovieRating",
                addMovieActor: () => "/Movies/assignactor",
                getActors: () => "/Actors",
                getActorById: () => "/Actors",
                addActor: () => "/Actors",
                deleteActor: () => "/Actors",
                editActor: () => "/Actors",
            };
        },
    };
}
