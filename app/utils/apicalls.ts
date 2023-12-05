import { headers } from "next/headers"

export const getAllBooks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/books", {
      method: "GET",
      headers: Object.fromEntries(headers())
      });
      return res.json();

    } catch (error) {
      console.log("Failed to get books", error)
    }
  }

// export const deleteBook = async () => {
//   try {
//     const res = await fetch("https://localhost:3000/api/books", {
//       method: "DELETE",
//       headers: Object.fromEntries(headers())
//     })
//     return res.json()
//   } catch (error) {
//     console.log(error)
//   }
// }