document.addEventListener('DOMContentLoaded', function() {
    const LETTER_IDS_IN_ORDER = ['letter-A', 'letter-K', 'letter-H', 'letter-A2'];
    const FINAL_CARD_REVEAL_DELAY_MS = 500;

    const letters = document.querySelectorAll('.letter');
    const contentBoxes = document.querySelectorAll('.content-box');
    const anniversaryCard = document.getElementById('anniversary-card');

    let correctClicksCount = 0;
    let currentExpectedLetterIndex = 0;
    let canClickLetter = true;


    function highlightNextLetter() {
        letters.forEach(letter => letter.classList.remove('highlight'));

        if (currentExpectedLetterIndex < LETTER_IDS_IN_ORDER.length) {
            const nextLetterId = LETTER_IDS_IN_ORDER[currentExpectedLetterIndex];
            const nextLetterElement = document.getElementById(nextLetterId);
            if (nextLetterElement) {
                nextLetterElement.classList.add('highlight');
            } else {
                console.warn(`Letter element with ID "${nextLetterId}" not found.`);
            }
        }
    }

    function handleLetterClick(event) {
        const clickedLetter = event.currentTarget;

        if (!canClickLetter || clickedLetter.id !== LETTER_IDS_IN_ORDER[currentExpectedLetterIndex]) {
            console.log("Wrong letter clicked or click disallowed currently.");
            return;
        }

        canClickLetter = false;

        const contentId = clickedLetter.dataset.content;
        const selectedContent = document.getElementById(contentId);

        if (selectedContent) {
            contentBoxes.forEach(box => {
                if (box.id !== contentId) {
                    box.classList.remove('open');
                }
            });

            selectedContent.classList.add('open');
            correctClicksCount++;

            currentExpectedLetterIndex++;
            highlightNextLetter();

            if (correctClicksCount === letters.length && anniversaryCard) {
                setTimeout(() => {
                    anniversaryCard.classList.add('show');
                }, FINAL_CARD_REVEAL_DELAY_MS);
            }

             setTimeout(() => {
                 canClickLetter = true;
             }, 100);

        } else {
            console.warn(`Content box with ID "${contentId}" not found for letter ${clickedLetter.id}.`);
            canClickLetter = true;
        }
    }


    letters.forEach(letter => {
        letter.addEventListener('click', handleLetterClick);
    });

    highlightNextLetter();

});