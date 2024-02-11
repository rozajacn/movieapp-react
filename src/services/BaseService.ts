import axios, { AxiosInstance } from "axios";
import { apiRoutesForContext } from "../routes/react-api-route-paths";

export class BaseService {
    public manager: AxiosInstance;
    protected routes = apiRoutesForContext();
    constructor() {
        this.manager = axios.create({
            headers: {
                Accept: "application/json",
                ProcessData: false,
                UseCookieAuth: true
            },
            baseURL: this.routes.server.root(),
        });
    }
}
