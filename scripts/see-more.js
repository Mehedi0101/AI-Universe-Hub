const seeMoreBtn = document.getElementById('see-more-btn');

seeMoreBtn.addEventListener('click', () => {
    seeMoreBtn.classList.add('hidden');
    displayContent(false);
})