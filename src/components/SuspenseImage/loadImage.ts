import createResource, { Resource } from "./createResource";

// First we need a type of cache to avoid creating resources for images
// we have already fetched in the past
const cache = new Map<string, any>();

// then we create our loadImage function, this function receives the source
// of the image and returns a resource
export default function loadImage(source = ""): Resource<string> {
  // here we start getting the resource from the cache
  let resource = cache.get(source);
  // and if it's there we return it immediately
  if (resource) {
    return resource;
  }
  // but if it's not we create a new resource
  resource = createResource<string>(
    () =>
      // in our async function we create a promise
      new Promise((resolve) => {
        // then create a new image element
        const img = new window.Image();
        // set the src to our source
        img.src = source;
        // and start listening for the load event to resolve the promise
        img.addEventListener("load", () => resolve(source));
        // and also the error event to reject the promise
        img.addEventListener("error", () => resolve(""));
      })
  );
  // before finishing we save the new resource in the cache
  cache.set(source, resource);
  // and return return it
  return resource;
}
