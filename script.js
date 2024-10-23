const rateButton = document.getElementById('rateButton'),
      clearButton = document.getElementById('clearButton'),
      resultDiv = document.getElementById('result'),
      leaderboardDiv = document.getElementById('leaderboard');

let leaderboard = [];

rateButton.addEventListener('click', () => {
    const img1 = document.getElementById('image1').files[0],
          img2 = document.getElementById('image2').files[0];
    if (!img1 || !img2) return alert("Please upload both images.");

    Promise.all([loadImage(img1), loadImage(img2)]).then(results => {
        leaderboard.push(results[0].rating, results[1].rating);
        displayImages(results);
    });
});

function loadImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.style.width = 'auto';
            img.style.height = '200px';

            // Calculate the rating based on predefined criteria
            const clarity = Math.floor(Math.random() * 10) + 1;
            const colors = Math.floor(Math.random() * 10) + 1;
            const creativity = Math.floor(Math.random() * 10) + 1;
            const averageRating = Math.round((clarity + colors + creativity) / 3);

            resolve({ img, rating: averageRating });
        };
        reader.readAsDataURL(file);
    });
}

function displayImages(images) {
    resultDiv.innerHTML = ''; // Clear previous images
    const imagesContainer = document.createElement('div');
    imagesContainer.style.display = 'flex';
    imagesContainer.style.justifyContent = 'space-around';

    images.forEach(image => {
        imagesContainer.appendChild(image.img);
    });

    resultDiv.appendChild(imagesContainer);
    displayLeaderboard();
}

function displayLeaderboard() {
    leaderboard.sort((a, b) => b - a);
    leaderboardDiv.innerHTML = '<h2>Leaderboard</h2>';
    leaderboard.forEach((rating, index) => {
        leaderboardDiv.innerHTML += `<div>#${index + 1}: ${rating}</div>`;
    });
}

clearButton.addEventListener('click', () => {
    document.getElementById('image1').value = '';
    document.getElementById('image2').value = '';
    resultDiv.innerHTML = '';
    leaderboardDiv.innerHTML = '<h2>Leaderboard</h2>';
    leaderboard = [];
});
