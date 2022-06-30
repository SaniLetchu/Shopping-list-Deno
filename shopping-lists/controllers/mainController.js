import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import { redirectTo, responseDetails } from "../utils/requestUtils.js";
import * as itemService from "../services/itemService.js";
import * as listService from "../services/listService.js";

const viewMain = async (request) => {
  const data = {
    lists: await listService.countLists(),
    items: await itemService.countItems(),
  };
  return new Response(await renderFile("main.eta", data), responseDetails);
};

export { viewMain };
