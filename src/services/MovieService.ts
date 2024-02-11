import axios from "axios";
import { BaseService } from "../services/BaseService";
import { apiRoutesForContext } from "../routes/react-api-route-paths";
import { Movie, MovieActor, MovieRating } from "../sdk/models";

const tmp = apiRoutesForContext();
export class MovieService extends BaseService {
    public authRoutes: typeof tmp;

    constructor() {
        super();
        this.authRoutes = tmp;
    }

    getMovies(search: string): Promise<any> {
        return axios({
            method: "get",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json" },
            url: this.routes.app().getMovies() + "?&search=" + search,
        })
    }
    getMovieById(id: number): Promise<any> {
        return axios({
            method: "get",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json" },
            url: this.routes.app().getMovieById() + "/" + id,
        })
    }
    addMovie(data: Movie): Promise<any> {
        return axios({
            method: "post",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().addMovie(),
            data: data
        })
    }
    deleteMovie(id: number): Promise<any> {
        return axios({
            method: "delete",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().deleteMovie() + "/" + id,
        })
    }
    editMovie(data: Movie): Promise<any> {
        return axios({
            method: "put",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().editMovie(),
            data: data
        })
    }
    
    addMovieRating(data: MovieRating): Promise<any> {
        return axios({
            method: "post",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().addMovieRating(),
            data: data
        })
    }

    addMovieActor(data: MovieActor): Promise<any> {
        return axios({
            method: "post",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().addMovieActor(),
            data: data
        })
    }
}