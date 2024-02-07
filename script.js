"use strict"
const imageList = document.querySelector('.slider__img-container')
const slider = document.querySelector('.slider__container');
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
    button.classList.add('button', 'button_shape-round', 'active');
    // button.id = `sliderButton_${index}`
    button.addEventListener('click', () => {
        currentIndex = index;
        removeActive();
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
    slider.style.transition = 'transform 0.5s ease';
    slider.style.transform = `translateX(${-currentIndex * (calculateCustomValue(28)+15)}px)`;
}

function removeActive() {
    activeElement.classList.remove('slider__active');
    activeElement.removeChild(document.querySelector('.slider__info'))
}

function assignActive() {
    activeElement.classList.add('slider__active');
}

function  moveActive() {
    console.log(currentIndex);
    activeElement = document.getElementById(`sliderImage_${currentIndex}`);
    const sliderInfo = createSliderInfo(sliderContainer[currentIndex]);
    activeElement.appendChild(sliderInfo);
    assignActive();
}

class SliderImg {
    constructor(id, title, subtitle, url, alt) {
        this.id = id;
        this.title = title;
        this.subtitle = subtitle;
        this.url = url;
        this.alt = alt;
    }
}

const sliderImg1 = new SliderImg(0, "01 - Bed Room","Over Peace", "./images/inner-peace.png", "bedroom" );
const sliderImg2 = new SliderImg(1, "02 - Kitchen","Outer Peace", "./images/gallery-photo_christ.png", "kitchen");
const sliderImg3 = new SliderImg(2, "03 - Bathroom","Inner Wreck", "./images/gallery-photo_messy.png", "bathroom");
const sliderContainer = [sliderImg1, sliderImg2, sliderImg3];
const sliderLength = sliderContainer.length;

window.addEventListener('load', ()=> {
    sliderContainer.forEach((element, index)=>{
        const sliderElement = createSliderElement(index);
        imageList.appendChild(sliderElement);
        createSliderNavButton(index);
    });
    activeElement = imageList.firstElementChild;
    const sliderInfo = createSliderInfo(sliderContainer[0]);
    activeElement.appendChild(sliderInfo);
    assignActive();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1 > sliderLength - 1)? 0 : ++currentIndex;
    removeActive();
    updateSlider();
    moveActive();

});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 < 0)? sliderLength - 1 : --currentIndex;
    removeActive();
    updateSlider();
    moveActive();
});


