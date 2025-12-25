import axios from "axios";

export async function getTodos() {
  const res = await axios.get("https://dummyjson.com/todos?limit=5");
  return res;
}
