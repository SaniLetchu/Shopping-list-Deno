import * as itemService from "../services/itemService.js";
import * as listService from "../services/listService.js";
import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import { redirectTo, responseDetails } from "../utils/requestUtils.js";

const addItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const formData = await request.formData();
  const name = formData.get("name");

  await itemService.create(urlParts[2], name);

  return redirectTo(`/lists/${urlParts[2]}`);
};

const collectItem = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await itemService.collect(urlParts[4]);

  return redirectTo(`/lists/${urlParts[2]}`);
};

const viewItems = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    collected: await itemService.findAllCollected(urlParts[2]),
    uncollected: await itemService.findAllNonCollected(urlParts[2]),
  };

  return new Response(await renderFile("items.eta", data), responseDetails);
};

export { addItem, collectItem, viewItems };
