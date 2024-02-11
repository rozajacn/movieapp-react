export interface Movie {
    id?: number;
    title: string;
    description: string;
    director: string;
    writers: string;
    releaseYear: number;
    rating: number;
    genre: string;
}

export const getMovieInitialValue =
    (): Movie => {
        return {
            id: 0,
            title: "",
            description: "",
            director: "",
            writers: "",
            releaseYear: 0,
            rating: 0,
            genre: "",
        };
    };

    export interface MovieRating {
        id?: number;
        movieId?: number;
        rating: number;
        ratedAt?: Date;
    }
    
    export interface MovieActor {
        movieId?: number;
        actorId?: number;
    }
