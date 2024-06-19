import axios from "axios";
import { users } from "@/model/modelUser";

async function listUser(): Promise<users[]> {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.table(response.data);

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data;
    } else {
      console.log("No data available from the endpoint.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export { listUser };
