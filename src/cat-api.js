import axios from "axios";

axios.defaults.headers.common["x-api-key"] = 
"live_1av0VQraKSLedNBVpxi4UDgmYlf5Bnu8L4Es5kwD1EzS7g56uau6u92xaVHbWGHz";


export const fetchBreeds = () => {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching breeds:", error);
      throw error;
    });
};


export const fetchCatByBreed = (breedId) => {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching cat by breed:", error);
      throw error;
    });
};