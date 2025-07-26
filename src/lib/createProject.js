const formData = new FormData();

formData.append("title", "My Portfolio Website");
formData.append("description", "A personal portfolio site showcasing my projects and skills.");
formData.append("githubLink", "https://github.com/username/portfolio");
formData.append("liveDemo", "https://myportfolio.com");

// Assume you have a file input and user selected an image
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

formData.append("imageName", file.name);
formData.append("imageType", file.type);
formData.append("imageData", file); // send the actual file (Blob), not base64

// Optionally: createdAt (usually set server-side)
formData.append("createdAt", new Date().toISOString());

// Then send with fetch or axios
fetch("/api/projects", {
  method: "POST",
  body: formData,
});
