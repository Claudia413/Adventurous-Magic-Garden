export default function (doc) {
  // Return the path depending on Prismic Document's type
  // If it is a Single Custom Type with the API ID of "home"
  if (doc.type === "about") {
    return "/about";
  }

  if (doc.type === "blogpost") {
    return "/blog/" + doc.uid;
  }

  // Default to the root
  return "/";
}
