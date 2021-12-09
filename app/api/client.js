import { create } from 'apisauce';
import settings from "../config/settings";

const apiClient = create({
    baseURL: settings.BackendUrl
})

export default apiClient;