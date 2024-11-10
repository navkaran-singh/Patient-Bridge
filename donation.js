const organ = document.getElementById("organ");
const submit = document.querySelector(".submit");
const error = document.getElementById("error");

const userName = document.getElementById("name");
const parent = document.getElementById("parent-name");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const selectedOrgan = document.getElementById("organ");

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,8}$/;
const accountSection = document.querySelector(".account");

function showPopup(message, type = "error") {
  error.innerHTML = message;
  error.style.display = "block";
  error.style.backgroundColor = type === "error" ? "#f44336" : "#4CAF50"; // Red for error, Green for success

  // Hide after 3 seconds
  setTimeout(() => {
    error.style.display = "none";
  }, 3000);
}

window.onload = () => {
  console.log(decodeURIComponent(document.cookie));
  const cookies = decodeURIComponent(document.cookie);
  let cookie;
  if (cookies.includes("user")) {
    cookie = cookies.split("user=")[1];
    cookie = JSON.parse(cookie);
    showPopup(
      `<h3>Already Signed In</h3><p>Welcome ${cookie.name}</p>`,
      "success"
    );
    submit.disabled = true;

    // Replace the "my account" text with "Already Signed In Nihar Sandhu" (or cookie-based user name)
    accountSection.innerHTML = `Already Signed In ${cookie.name}`;
  }
};

function validateEmail(email) {
  return emailRegex.test(email);
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (userName.value === "") {
    return showPopup("<h1>Empty Name, Enter A Valid Name</h1>");
  } else if (parent.value === "") {
    return showPopup("<h1>Empty Parent Name, Enter A Valid Name</h1>");
  } else if (address.value === "") {
    return showPopup("<h1>Empty Address, Enter A Valid Address</h1>");
  } else if (city.value === "") {
    return showPopup("<h1>Empty City, Enter A Valid City</h1>");
  } else if (!validateEmail(email.value)) {
    return showPopup("<h1>Invalid Email</h1>");
  } else if (dob.value === "") {
    return showPopup("<h1>Empty Date, Select A Valid Date</h1>");
  } else if (selectedOrgan.value === "") {
    return showPopup("<h1>Please Select A Valid Organ</h1>");
  }

  const user = { name: userName.value, email: email.value };
  console.log(user);
  const now = new Date();
  const expire = new Date(now.getTime() + 20 * 60 * 1000).toUTCString();

  document.cookie = `user=${encodeURIComponent(
    JSON.stringify(user)
  )}; expires=${expire}; secure`;

  showPopup("<h1>Form Submitted Successfully</h1>", "success");
});

organ.addEventListener("change", (e) => {
  const imgElement = document.getElementById("organ-image");
  const organImages = {
    Kidney: "./img/kidney.png",
    Heart: "./img/heart.png",
    Lungs: "./img/lungs.png",
    Stomach: "./img/stomach.png",
    Kidney: "./img/kidney.png",
    Heart: "./img/heart.png",
    Lungs: "./img/lungs.png",
    Stomach: "./img/stomach.png",
  };
  imgElement.src = organImages[e.target.value];
  imgElement.style.display = "block";
});

