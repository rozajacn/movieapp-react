import axios from "axios";
import { apiRoutesForContext } from "../routes/react-api-route-paths";
import { Actor } from "../sdk/models/Actor";
import { BaseService } from "../services/BaseService";

const tmp = apiRoutesForContext();
export class ActorService extends BaseService {
    public authRoutes: typeof tmp;

    constructor() {
        super();
        this.authRoutes = tmp;
    }

    getActors(search: string): Promise<any> {
        return axios({
            method: "get",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json" },
            url: this.routes.app().getActors() + "?&search=" + search,
        })
    }
    getActorById(id: number): Promise<any> {
        return axios({
            method: "get",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json" },
            url: this.routes.app().getActorById() + "/" + id,
        })
    }
    addActor(data: Actor): Promise<any> {
        return axios({
            method: "post",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().addActor(),
            data: data
        })
    }
    deleteActor(id: number): Promise<any> {
        return axios({
            method: "delete",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().deleteActor() + "/" + id,
        })
    }
    editActor(data: Actor): Promise<any> {
        return axios({
            method: "put",
            baseURL: this.routes.server.root(),
            headers: { "Content-Type": "application/json", "Authorization": "Bearer ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" },
            url: this.routes.app().editActor(),
            data: data
        })
    }

}