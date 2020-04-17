import Request from "@/utils/request";

import { Service } from "vue-project-plugin";

let { services, ApiPlugin } = new Service(Request);

export const $services = services;
export const ApiServicePlugin = ApiPlugin;
