"use strict"
const imageList = document.querySelector('.slider__img-container')
const slider = document.querySelector('.slider__container');
const nextBtn = document.getElementById('nextButton');
let currentIndex = 0;
let activeElement = imageList.firstChild;

function addSliderElem(index) {
    let listItem = document.createElement('li');
    listItem.className = 'list__item slider__img';
    let img = document.createElement('img');
    img.src = sliderContainer[index].imgUrl;
    img.alt = '';
    img.id = `sliderImage_${index}`;
    img.className = 'img';
    listItem.appendChild(img);
    imageList.appendChild(listItem);
}

const maximumWidth = 1440;
let bodyWidth = Math.min(window.innerWidth, maximumWidth);
function calculateCustomValue(percentage) {
    return bodyWidth * (percentage / 100);
}

class SliderImg {
    constructor(title, subtitle, url) {
        this.title = title;
        this.subtitle = subtitle;
        this.imgUrl = url;
    }
}

const sliderImg1 = new SliderImg("01 - Bed Room","Inner Peace", "./images/inner-peace.png")
const sliderImg2 = new SliderImg("02 - Bed Room","Outer Peace", "./images/gallery-photo_christ.png")
const sliderImg3 = new SliderImg("03 - Bed Room","Inner Wreck", "./images/gallery-photo_messy.png")

const sliderContainer = [sliderImg1, sliderImg2, sliderImg3];

nextBtn.addEventListener('click', () => {
    currentIndex += 1;
    updateSlider();
});

function updateSlider() {
    slider.style.transition = 'transform 0.5s ease';
    slider.style.transform = `translateX(${-currentIndex * (calculateCustomValue(28)+15)}px)`;
}

function swapActiveElement() {
    let nextElement = activeElement.nextElementSibling;
    activeElement = nextElement;
}

slider.addEventListener('transitionend', () => {
    let imgIndex = (currentIndex - 1 + sliderContainer.length) % sliderContainer.length;
    addSliderElem(imgIndex);
    swapActiveElement()
});


function createAndUpdateFigcaption(object) {
    const sliderInfo = document.createElement('div');
    sliderInfo.classList.add('slider__info');

    const container = document.createElement('div');
    container.classList.add('figcaption__container');

    // Create the slider content
    const sliderContent = document.createElement('div');
    sliderContent.classList.add('slider__content');

    // Create the text paragraph
    const text = document.createElement('p');
    text.classList.add('text');
    text.textContent = object.text;

    // Create the title heading
    const title = document.createElement('h2');
    title.classList.add('slider__title');
    title.textContent = object.title;

    // Create the button
    const button = document.createElement('button');
    button.classList.add('button', 'button_color-orange', 'figure__button');

    // Create the icon
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-arrow-right', 'fa-lg');
    icon.style.color = '#fff';

    // Append icon to the button
    button.appendChild(icon);

    // Append text and title to the slider content
    sliderContent.appendChild(text);
    sliderContent.appendChild(title);

    // Append slider content and button to the container
    container.appendChild(sliderContent);
    container.appendChild(button);

    // Append container to the figcaption
    figcaption.appendChild(container);

    // Append figcaption to the desired parent element
    const parentElement = document.getElementById('parentElementId');
    parentElement.appendChild(figcaption);

    // Animate the height
    figcaption.style.height = '0px'; // Start with height 0
    figcaption.style.transition = 'height 0.5s'; // Add transition
    figcaption.offsetHeight; // Trigger reflow to apply transition
    figcaption.style.height = 'auto'; // Set height to auto to expand
}
