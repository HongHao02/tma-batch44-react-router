import { Image, async_findImageById, async_getAllImages } from "../images";

//Using APIs (loader, useLoaderData)
/**
 * 1. Create and export `loader` function in root module
 * 2. Hook it up to the route
 * 3. access and render the data
 */

export async function rootLoader(): Promise<{ images: Image[] }> {
  const images = await async_getAllImages();
  return { images };
}
export async function imageLoader({
  params,
}: {
  params: any;
}): Promise<{ image: Image }> {
  const image = await async_findImageById(params.id);
  if (!image) {
    throw new Response("", {
      status: 404,
      statusText: `Not found image ${params.id}`,
    });
  }
  return { image };
}
