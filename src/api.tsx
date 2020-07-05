export async function fetchData<T>(url: string): Promise<T | undefined> {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
