"use strict"

const slider = document.querySelector('.slider__container');
const sliderNav = document.querySelector('.slider__nav');
const nextBtn = document.getElementById('nextButton');
const prevBtn = document.getElementById('prevButton');
const maximumWidth = 1440;
let currentIndex = 0;
let activeElement;
let bodyWidth;

function calculateCustomValue(percentage) {
    bodyWidth =  Math.min(window.innerWidth, maximumWidth);
    return bodyWidth * (percentage / 100);
}

function createSliderElement(index) {
    let listItem = document.createElement('li');
    listItem.className = 'list__item slider__img';
    listItem.id = `sliderImage_${index}`;

    let img = document.createElement('img');
    img.src = sliderContainer[index].url;
    img.alt = sliderContainer[index].alt;
    img.className = 'img';
    listItem.appendChild(img);
    return listItem;
}

function createSliderNavButton(index) {
    let listItem = document.createElement('li');
    listItem.classList.add('list__item');

    let button = document.createElement('button');
    button.classList.add('button', 'button_shape-round');
    button.id = `sliderNavButton_${index}`
    button.addEventListener('click', () => {
        removeActive();
        currentIndex = index;
        moveActive();
        updateSlider();
    });

    let span = document.createElement('span');
    span.classList.add('button__inner', 'button__circle');
    button.appendChild(span);
    listItem.appendChild(button);
    return listItem;
}

function createSliderInfo(object) {
    const sliderInfo = document.createElement('div');
    sliderInfo.classList.add('slider__info');

    const container = document.createElement('div');
    container.classList.add('info__container');

    const sliderContent = document.createElement('div');
    sliderContent.classList.add('slider__content');

    const subtitle = document.createElement('p');
    subtitle.classList.add('slider__subtitle');
    subtitle.textContent = object.subtitle;

    const title = document.createElement('h2');
    title.classList.add('slider__title');
    title.textContent = object.title;

    const button = document.createElement('button');
    button.classList.add('button', 'button_color-orange', 'figure__button');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-arrow-right', 'fa-lg');
    icon.style.color = '#fff';

    button.appendChild(icon);

    sliderContent.appendChild(subtitle);
    sliderContent.appendChild(title);

    container.appendChild(sliderContent);
    container.appendChild(button);

    sliderInfo.appendChild(container);
    return sliderInfo;
}

function updateSlider() {
    const translationValue = (window.innerWidth > 768)? calculateCustomValue(28) + 15 : calculateCustomValue(50);
    slider.style.transition = 'transform 0.5s ease';
    slider.style.transform = `translateX(${-currentIndex * translationValue}px)`;
}

function removeActive() {
    activeElement.classList.remove('slider__active');
    activeElement.removeChild(document.querySelector('.slider__info'))
    let activeButton = document.getElementById(`sliderNavButton_${currentIndex}`);
    activeButton.classList.remove('slider__nav-button_active');
    console.log(activeButton.classList);
}

function  moveActive() {
    activeElement = document.getElementById(`sliderImage_${currentIndex}`);
    const sliderInfo = createSliderInfo(sliderContainer[currentIndex]);
    activeElement.appendChild(sliderInfo);
    activeElement.classList.add('slider__active');
    const activeButton = document.getElementById(`sliderNavButton_${currentIndex}`);
    activeButton.classList.add('slider__nav-button_active');
}

class SliderImg {
    constructor(title, subtitle, url, alt) {
        this.title = title;
        this.subtitle = subtitle;
        this.url = url;
        this.alt = alt;
    }
}

const sliderImg1 = new SliderImg("01 - Bed Room","Over Peace", "./images/inner-peace.png", "bedroom" );
const sliderImg2 = new SliderImg("02 - Kitchen","Outer Peace", "./images/gallery-photo_christ.png", "kitchen");
const sliderImg3 = new SliderImg("03 - Bathroom","Inner Wreck", "./images/gallery-photo_messy.png", "bathroom");
const sliderContainer = [sliderImg1, sliderImg2, sliderImg3];
const sliderLength = sliderContainer.length;

window.addEventListener('load', ()=> {
    sliderContainer.forEach((element, index)=>{
        const sliderElement = createSliderElement(index);
        const sliderNavButton = createSliderNavButton(index);
        slider.appendChild(sliderElement);
        sliderNav.appendChild(sliderNavButton);
    });
    moveActive();
});

nextBtn.addEventListener('click', () => {
    removeActive();
    currentIndex = (currentIndex + 1 > sliderLength - 1)? 0 : ++currentIndex;
    updateSlider();
    moveActive();

});

prevBtn.addEventListener('click', () => {
    removeActive();
    currentIndex = (currentIndex - 1 < 0)? sliderLength - 1 : --currentIndex;
    updateSlider();
    moveActive();
});


