export async function get (url) {
  try {
    const resp = await fetch(url)
    const data = await resp.json()
    return data
  } catch (error) {
    return error
  }
}
