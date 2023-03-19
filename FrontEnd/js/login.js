document
  .querySelector("#loginForm")
  .addEventListener("submit", function (event) {
    event.stopPropagation();
    event.preventDefault();

    document.getElementById("emailLabel").style.color = "black";
    document.getElementById("passwordLabel").style.color = "black";
    document.getElementById("email").style.border = "1.5px solid transparent";
    document.getElementById("password").style.border =
      "1.5px solid transparent";
    document.getElementById("errorText").style.display = "none";

    const fields = [
      document.getElementById("email").value,
      document.getElementById("password").value,
    ];

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: fields[0], password: fields[1] }),
    })
      .then((response) => {
        if (response.status === 404 || response.status === 401) {
          document.getElementById("emailLabel").style.color = "red";
          document.getElementById("passwordLabel").style.color = "red";
          document.getElementById("email").style.border = "1.5px solid red";
          document.getElementById("password").style.border = "1.5px solid red";
          document.getElementById("errorText").style.display = "block";
        } else if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        sessionStorage.setItem("token", data.token);
        window.location = "/frontend";
      });
  });
