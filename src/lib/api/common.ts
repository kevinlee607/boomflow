import { z } from "zod";
export async function fetchDataUnknown<T = any>(url: string): Promise<T> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorText || response.statusText}`,
      );
    }

    // 直接将结果断言为 any
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch unknown data:", error);
    throw error;
  }
}

export async function fetchDataWithZod(
  apiUrl: string,
  schema: z.Schema,
): Promise<any> {
  const data = await fetchDataUnknown(apiUrl);
  try {
    const parsedData = schema.parse(data);
    return parsedData;
  } catch (error) {
    console.error("Data validation error:", error);
    throw new Error("Invalid data format");
  }
}
