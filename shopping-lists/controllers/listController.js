import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listService from "../services/listService.js";
import { redirectTo, responseDetails } from "../utils/requestUtils.js";

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return redirectTo("/lists");
};

const deactivateList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listService.deactivate(urlParts[2]);
  return redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.findAllNonActiveLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

export { addList, deactivateList, viewLists };
