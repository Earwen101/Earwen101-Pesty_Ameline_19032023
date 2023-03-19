const modal = document.querySelector("#modal");
const modalAdd = document.querySelector("#modal-Add");
const fond = document.querySelector(".fond");
const btnModifier = document.querySelector("#global");
const btnAddPhoto = document.querySelector("#addphoto");
const btnDelete = document.querySelector("#deletegallery");
const gallery = document.querySelector(".gallery");
const arrow = document.querySelector(".arrow");
const cross = document.querySelectorAll(".cross");
const imgCrossArrow = document.querySelector(".img-crossandarrow");

if (sessionStorage.getItem("token") !== null) {
  document.getElementById("log").innerHTML = "logout";
  document.getElementById("log").addEventListener("click", () => {
    sessionStorage.clear();
    location.reload();
  });
  document.querySelectorAll(".admin").forEach((elm) => {
    elm.style.display = "flex";
    document.querySelectorAll("#filters").forEach((elm) => {
      elm.style.display = "none";
    });
    document.querySelectorAll("#global").forEach((elm) => {
      elm.style.marginBottom = "90px";
    });
  });
} else {
  document.querySelectorAll(".admin").forEach((elm) => {
    elm.style.display = "none";
  });
}

btnModifier.addEventListener("click", () => {
  if (getComputedStyle(modal).display !== "none") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
});

btnAddPhoto.addEventListener("click", () => {
  modal.style.display = "none";
  modalAdd.style.display = "flex";
});

btnDelete.addEventListener("click", () => {
  if (getComputedStyle(modal).display !== "none") {
    modal.style.display = "none";
  } else {
    modal.style.display = "flex";
  }
});

const closeModal = () => {
  cross.forEach((elm) => {
    elm.addEventListener("click", () => {
      if (imgCrossArrow.style.display !== "none") {
        modal.style.display = "none";
        modalAdd.style.display = "none";
      } else {
        modal.style.display = "flex";
        modalAdd.style.display = "flex";
      }
    });
  });
};

closeModal();

arrow.addEventListener("click", () => {
  if (imgCrossArrow.style.display !== "none") {
    modalAdd.style.display = "none";
    modal.style.display = "flex";
  } else {
    modalAdd.style.display = "flex";
  }
});

fond.addEventListener("click", () => {
  if (fond.style.display !== "none") {
    modalAdd.style.display = "none";
  } else {
    modalAdd.style.display = "flex";
  }
});

// fond.addEventListener("click", () => {
//   if (fond.style.display !== "none") {
//     modalAdd.style.display = "none";
//     modal.style.display = "none";
//   } else {
//     modalAdd.style.display = "flex";
//     modal.style.display = "flex";
//   }
// });
