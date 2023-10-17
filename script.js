const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const crossIcon = document.querySelector(".cross-icon");
const galleryContainer = document.querySelector(".gallery-container");

const clientId = "LNl3PqlPHmIIJM75SbnqHbDPiVw6hEqgFdznmKMfJZI";

async function loadImages(key) {
  key = key.trim();
  const url = `https://api.unsplash.com/photos/random?query=${key}&count=15&client_id=${clientId}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.length) {
      showData(data);
    } else {
      alert("No results found for your query");
    }
  } catch (error) {
    console.error("ERROR", error.message);
  }
}

const showData = (data) => {
  while (galleryContainer.firstChild) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }
  for (const img of data) {
    const image = document.createElement("div");
    image.style.backgroundImage = `url(${img.urls.regular})`;
    image.classList.add("image");
    galleryContainer.appendChild(image);
    image.addEventListener("click", () => {
      window.open(img.urls.regular, "_blank");
    });
  }
};

const loadUserImages = () => {
  const keyWord = searchInput.value;
  loadImages(keyWord);
};

const toggleInputIcon = () => {
  toggleDisplayNone(searchIcon);
  toggleDisplayNone(crossIcon);
};

const toggleDisplayNone = (element) => {
  element.classList.toggle("display-none");
};

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && searchInput.value) {
    toggleInputIcon();
    loadUserImages();
  }
});

searchIcon.addEventListener("click", () => {
  if (searchInput.value) {
    toggleInputIcon();
    loadUserImages();
  }
});

crossIcon.addEventListener("click", () => {
  toggleInputIcon();
  searchInput.value = "";
});

window.onload = () => {
  loadImages("coffee");
  searchInput.focus();
};
