function justifyGallery() {

  const galleries = document.querySelectorAll(".room-gallery");

  galleries.forEach(function(gallery) {

    if (!gallery.originalImages) {
      gallery.originalImages =
        Array.from(gallery.querySelectorAll("img"));
    }

    const images = gallery.originalImages;
    const gap = 5;
    const galleryWidth = gallery.clientWidth;
    const total = images.length;

    let rowSizes = [];


    /* -------------------------
       MOBILE
       one image per row
    ------------------------- */

    if (window.innerWidth <= 700) {

      rowSizes = Array(total).fill(1);

    }


    /* -------------------------
       TABLET
       two or three per row
    ------------------------- */

    else if (window.innerWidth <= 1100) {

      let remaining = total;

      // If odd, start with 3 so we don't end with 1.
      if (remaining % 2 !== 0 && remaining >= 3) {
        rowSizes.push(3);
        remaining -= 3;
      }

      while (remaining > 0) {
        rowSizes.push(2);
        remaining -= 2;
      }

    }


    /* -------------------------
       DESKTOP
       three or four per row
    ------------------------- */

    else {

      let remaining = total;

      while (remaining > 0) {

        if (remaining === 3) {
          rowSizes.push(3);
          remaining = 0;
        }

        else if (remaining === 4) {
          rowSizes.push(4);
          remaining = 0;
        }

        else if (remaining === 6) {
          rowSizes.push(3, 3);
          remaining = 0;
        }

        else if (remaining === 7) {
          rowSizes.push(3, 4);
          remaining = 0;
        }

        else if (remaining === 8) {
          rowSizes.push(4, 4);
          remaining = 0;
        }

        else if (remaining === 9) {
          rowSizes.push(3, 3, 3);
          remaining = 0;
        }

        else if (remaining === 10) {
          rowSizes.push(3, 3, 4);
          remaining = 0;
        }

        else if (remaining === 11) {
          rowSizes.push(4, 4, 3);
          remaining = 0;
        }

        else if (remaining === 12) {
          rowSizes.push(4, 4, 4);
          remaining = 0;
        }

        else {
          rowSizes.push(4);
          remaining -= 4;
        }

      }

    }


    /* -------------------------
       BUILD THE ROWS
    ------------------------- */

    gallery.innerHTML = "";

    let imageIndex = 0;

    rowSizes.forEach(function(rowSize) {

      const row = document.createElement("div");
      row.className = "gallery-row";

      const rowImages =
        images.slice(imageIndex, imageIndex + rowSize);

      let ratioSum = 0;

      rowImages.forEach(function(img) {
        ratioSum +=
          img.naturalWidth / img.naturalHeight;
      });

      const totalGap =
        gap * (rowImages.length - 1);

      const rowHeight =
        (galleryWidth - totalGap) / ratioSum;


      rowImages.forEach(function(img) {

        const ratio =
          img.naturalWidth / img.naturalHeight;

        img.style.width =
          (rowHeight * ratio) + "px";

        img.style.height =
          rowHeight + "px";

        row.appendChild(img);

      });

      gallery.appendChild(row);

      imageIndex += rowSize;

    });

  });

}

/* Run gallery after images have loaded */

window.addEventListener("load", justifyGallery);
window.addEventListener("resize", justifyGallery);



/* -------------------------
   LIGHTBOX
------------------------- */

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightbox-image");

const prevButton =
  document.getElementById("lightbox-prev");

const nextButton =
  document.getElementById("lightbox-next");

const galleryImages = Array.from(
  document.querySelectorAll(".room-gallery img")
);

let currentImage = 0;



function showImage(index) {

  if (index < 0) {
    index = galleryImages.length - 1;
  }

  if (index >= galleryImages.length) {
    index = 0;
  }

  currentImage = index;

  lightboxImage.src =
    galleryImages[currentImage].src;
}



galleryImages.forEach(function(img, index) {

  img.addEventListener("click", function() {

    currentImage = index;

    showImage(currentImage);

    lightbox.classList.add("active");

  });

});



nextButton.addEventListener("click", function(event) {

  event.stopPropagation();

  showImage(currentImage + 1);

});



prevButton.addEventListener("click", function(event) {

  event.stopPropagation();

  showImage(currentImage - 1);

});



lightbox.addEventListener("click", function() {

  lightbox.classList.remove("active");

});



lightboxImage.addEventListener("click", function(event) {

  event.stopPropagation();

});



document.addEventListener("keydown", function(event) {

  if (!lightbox.classList.contains("active")) {
    return;
  }

  if (event.key === "ArrowRight") {
    showImage(currentImage + 1);
  }

  if (event.key === "ArrowLeft") {
    showImage(currentImage - 1);
  }

  if (event.key === "Escape") {
    lightbox.classList.remove("active");
  }

});

