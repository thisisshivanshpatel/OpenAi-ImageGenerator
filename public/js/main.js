function onSubmit(e) {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";
  document.querySelector("#download").href = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt === "") {
    alert("Please enter some text in prompt");
    return;
  }

  generateImageRequest(prompt, size);
}

/** makes a request for generating a image */
async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch("/openai/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error("image generation failed");
    }

    const data = await response.json();
    const imageUrl = data.data;

    document.querySelector("#image").src = imageUrl;
    document.querySelector("#download").href = imageUrl;

    showDownloadButton();
    removeSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
}

/** used for displaying a spinner */
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

/** used for removing spinner */
function removeSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

/** used for displaying download button */
function showDownloadButton() {
  document.querySelector(".btn-style").classList.add("show");
}

document.querySelector("#image-form").addEventListener("submit", onSubmit);
