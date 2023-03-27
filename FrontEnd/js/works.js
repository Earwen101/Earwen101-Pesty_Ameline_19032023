const createNewWork = (name, imgUrl, id, edit = false, workId = 0) => {
  // get work div
  const workBox = document.getElementById(id);

  // create html elements
  const figure = document.createElement("figure");
  const figcaption = document.createElement("figcaption");
  const img = document.createElement("img");
  // const binDiv = document.createElement("div");
  // binDiv.classList.add("bin");

  // assign data in html elements
  img.setAttribute("src", imgUrl);
  img.setAttribute("crossorigin", "anonymous");
  figcaption.innerHTML = edit ? "éditer" : name;

  // if edit mode, add click action
  if (edit) {
    figure.addEventListener("click", function () {
      fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    });
  }

  // add html elements in parent element
  figure.appendChild(img);
  figure.appendChild(figcaption);
  // figure.appendChild(binDiv);

  // add created figure in work div
  workBox.appendChild(figure);
};

document.querySelector("#filters li").addEventListener("click", function (e) {
  document.querySelectorAll("#filters li").forEach((elm) => {
    elm.classList.remove("active");
  });
  e.target.classList.add("active");
  fetchProjects(parseInt(e.target.getAttribute("catId")));
});

const createCategories = (id, name, parent, child) => {
  // get list
  const liste = document.getElementById(parent);

  // create html elements
  const listELm = document.createElement(child);

  // assign data in html elements
  listELm.setAttribute("catId", id);
  listELm.setAttribute("value", id);
  listELm.innerHTML = name;

  // add event listener
  listELm.addEventListener("click", function (e) {
    document.querySelectorAll("#filters li").forEach((elm) => {
      elm.classList.remove("active");
    });
    e.target.classList.add("active");
    fetchProjects(parseInt(e.target.getAttribute("catId")));
  });

  // add created list element in list
  liste.appendChild(listELm);
};

// fetch projects
const fetchProjects = (id = 0) => {
  fetch("http://localhost:5678/api/works", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("gallery").innerHTML = "";
      data.forEach((elm) => {
        if (id !== 0) {
          if (elm.categoryId === id) {
            createNewWork(
              elm.title,
              elm.imageUrl,
              "gallery-modal",
              true,
              elm.id
            );
            createNewWork(elm.title, elm.imageUrl, "gallery");
          }
        } else {
          createNewWork(elm.title, elm.imageUrl, "gallery-modal", true, elm.id);
          createNewWork(elm.title, elm.imageUrl, "gallery");
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

fetch("http://localhost:5678/api/categories", {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((elm) => {
      createCategories(elm.id, elm.name, "filters", "li");
      createCategories(elm.id, elm.name, "select-photo", "option");
    });
  })
  .catch((error) => {
    console.log(error);
  });

fetchProjects();

document.getElementById("file").addEventListener("change", (e) => {
  document
    .getElementById("image")
    .setAttribute("src", URL.createObjectURL(e.target.files[0]));
  document.getElementById("label").style.display = "none";
  document.getElementById("file").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("add-photos").style.padding = "0";
  document.getElementById("image").classList.add("preview");
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  event.stopPropagation();

  let formData = new FormData();

  formData.append("title", event.target[1].value);
  formData.append("category", event.target[2].value);
  formData.append("image", event.target[0].files[0]);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {})
    .catch((error) => {
      console.log(error);
    });
});
