const incrementButton = document.getElementById('incrementButton');
const counterElement = document.getElementById('counter');

let count= 0;
export function updateCounter() {
    counterElement.textContent = count;
}
incrementButton.addEventListener('click', function() {
    count++;
    updateCounter();
});
updateCounter();