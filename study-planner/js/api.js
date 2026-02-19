const GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes?q=";
const DICTIONARY_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// Google Books
export async function searchBooks(query) {
  try {
    const response = await fetch(GOOGLE_BOOKS_URL + query);
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Books API error:", error);
    return [];
  }
}

// Dictionary API
export async function searchDefinition(word) {
  try {
    const response = await fetch(DICTIONARY_URL + word);
    const data = await response.json();
    return data[0] || null;
  } catch (error) {
    console.error("Dictionary API error:", error);
    return null;
  }
}
