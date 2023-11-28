 import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
 import SlimSelect from 'slim-select';
 import Notiflix from 'notiflix';

document.addEventListener("DOMContentLoaded", async () => {
  const breedSelect = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");

   const slim = new SlimSelect(breedSelect, {
    placeholder: "Select a breed", // Опціонально, додайте placeholder
  });
  
  loader.style.display = "block";


  try {
    const breeds = await fetchBreeds();

  
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.text = breed.name;
      breedSelect.appendChild(option);
    });

    loader.style.display = "none";

    breedSelect.addEventListener("change", async () => {
      const selectedBreedId = breedSelect.value;
      loader.style.display = "block";
      catInfo.innerHTML = "";
      error.style.display = "none";

      try {
        const catData = await fetchCatByBreed(selectedBreedId);

        const catInfoContainer = document.createElement("div");
        catInfoContainer.style.display = "flex";
        catInfoContainer.style.alignItems ="center";

        const catImage = document.createElement("img");
        catImage.src = catData[0].url;
        catImage.style.width = "400px";
        catImage.style.height = "auto";
        catImage.style.marginTop = "20px";
        catInfoContainer.appendChild(catImage);

        const catTextInfo = document.createElement("div");
        catTextInfo.style.marginLeft = "20px";
        catInfoContainer.appendChild(catTextInfo);

        const catBreed = document.createElement("p");
        catBreed.textContent = `Breed: ${catData[0].breeds[0].name}`;
        catBreed.style.fontWeight = "bold";
        catBreed.style.fontSize = "20px";
        catTextInfo.appendChild(catBreed);

        const catDescription = document.createElement("p");
        catDescription.textContent = `Description: ${catData[0].breeds[0].description}`;
        //catDescription.style.fontWeight = "bold"; 
        catTextInfo.appendChild(catDescription);
        catInfo.appendChild(catInfoContainer);


    
        loader.style.display = "none";

        catInfo.style.display = "block";
      } catch (error) {
        // error.style.display = "block";
        Notiflix.Report.failure('Error', 'Failed to load cat information', 'OK');
      }
    });
  } catch (error) {
    // error.style.display = "block";
    Notiflix.Report.failure('Error', 'Failed to load breed information', 'OK');
  }
});