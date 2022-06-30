import { serve } from "https://deno.land/std@0.120.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listController from "./controllers/listController.js";
import * as mainController from "./controllers/mainController.js";
import * as itemController from "./controllers/itemController.js";
import * as tableService from "./services/tableService.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

await tableService.create();

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await mainController.viewMain(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname.includes("deactivate") && request.method === "POST") {
    return await listController.deactivateList(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await itemController.viewItems(request);
  } else if (url.pathname.endsWith("items") && request.method === "POST") {
    return await itemController.addItem(request);
  } else if (url.pathname.endsWith("collect") && request.method === "POST") {
    return await itemController.collectItem(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

let port = 7777;
if (Deno.args.length > 0) {
  const lastArgument = Deno.args[Deno.args.length - 1];
  port = Number(lastArgument);
}

serve(handleRequest, { port: port });
