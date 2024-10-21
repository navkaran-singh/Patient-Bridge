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

window.onload = () => {
  console.log(decodeURIComponent(document.cookie));
  const cookies = decodeURIComponent(document.cookie);
  let cookie;
  if (cookies.includes("user")) {
    cookie = cookies.split("user=")[1];
    cookie = JSON.parse(cookie);
    error.innerHTML = `
      <h3>Already Signed In</h3>
      <p>Welcome ${cookie.name}</p>
    `;
    submit.disabled = true;
  }
};

function validateEmail(email) {
  return emailRegex.test(email);
}

submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (userName.value === "") {
    return (error.innerHTML = "<h1>Empty Name, Enter A Valid Name</h1>");
  } else if (parent.value === "") {
    return (error.innerHTML = "<h1>Empty Parent Name, Enter A Valid Name</h1>");
  } else if (address.value === "") {
    return (error.innerHTML = "<h1>Empty Address, Enter A Valid Address</h1>");
  } else if (city.value === "") {
    return (error.innerHTML = "<h1>Empty City, Enter A Valid City</h1>");
  } else if (!validateEmail(email.value)) {
    return (error.innerHTML = "<h1>Invalid Email</h1>");
  } else if (dob.value === "") {
    return (error.innerHTML = "<h1>Empty Date, Select A Valid Date</h1>");
  } else if (selectedOrgan.value === "") {
    return (error.innerHTML = "<h1>Please Select A Valid Organ</h1>");
  }

  const user = { name: userName.value, email: email.value };
  console.log(user);
  const now = new Date();
  const expire = new Date(now.getTime() + 20 * 60 * 1000).toUTCString();

  document.cookie = `user=${encodeURIComponent(
    JSON.stringify(user)
  )}; expires=${expire}; secure`;
});

organ.addEventListener("change", (e) => {
  const imgElement = document.getElementById("organ-image");
  const organImages = {
    Kidney: "./img/kidney.png",
    Heart: "./img/heart.png",
    Lungs: "./img/lungs.png",
    Stomach: "./img/stomach.png",
  };
  imgElement.src = organImages[e.target.value];
  imgElement.style.display = "block";
});
