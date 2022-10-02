const galleryEl = document.querySelector('.gallery');
const importBtnEl = document.querySelector('.import-button');
const exportBtnEl = document.querySelector('.export-button');

const selection = new Set();

function createImageEl(image) {
  const imgEl = document.createElement('img');
    imgEl.dataset.path = image;
    imgEl.src = image;
    galleryEl.append(imgEl);
}

async function loadImages() {
  galleryEl.innerHTML = '';

  const images = await gallery.getImages();

  for (const image of images) {
    createImageEl(image)
  }
}

galleryEl.addEventListener('click', (event) => {
  if (event.target instanceof HTMLImageElement) {
    if (event.target.classList.contains('active')) {
      event.target.classList.remove('active');
      selection.delete(event.target.dataset.path);
    } else {
      event.target.classList.add('active');
      selection.add(event.target.dataset.path);
    }

    exportBtnEl.disabled = !selection.size;
  }
});

importBtnEl.addEventListener('click', async () => {
  const images = await gallery.importImages();
  for (const image of images) {
    createImageEl(image);
  }
});

exportBtnEl.addEventListener('click', () => {
  gallery.exportImages([...selection]);
});

loadImages();
