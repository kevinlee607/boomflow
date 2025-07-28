const listApiUrl = "http://localhost:8090/list";
import { fetchDataWithZod } from "$lib/api/common";
import { flowListSchema, type flowList } from "$lib/api/flow/schema/list";

const resp = await fetchDataWithZod(listApiUrl, flowListSchema);

export function getList(): flowList {
  return resp;
}
