const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#messageOne');
const p2 = document.querySelector('#messageTwo');

console.log(p1, p2);

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    p1.textContent = `Loading...`;
    p2.textContent = ``;

    const request = async() => {
        try {
            let response = await fetch(`/weather?address=${location}`);
            let json = await response.json();
            p1.textContent = `${json.location}`;
            p2.textContent = `${json.forecast}`; 
         } catch (error) {
            p1.textContent =`Error:`;
            p2.textContent = `Unable to find location. Please try another search.`
        }
    }
    request();
});





