/* global */

// import slick from 'slick';

// const SELECTORS = {
//     carousel: '.carousel',
//     btn: '.btn',
//     btnPrev: '.btn-prev',
//     btnNext: '.btn-next',
//     video: '.pillar-bg__video',
// };

// const CSS_CLASS = {
//     disabled: 'is-disabled'
// };

// const $component = $(SELECTORS.carousel);

// class SlickySlick {

//     constructor($sandbox, index) {
//         this.$sandbox = $sandbox;

//         this.current = 0;
//         this.index = index;

//         this.init();
//     }

//     setNavigationState() {
//         const current = this.$carousel.slick('slickCurrentSlide');

//         this.$btn.removeClass(CSS_CLASS.disabled);

//         if (current === 0) {
//             this.$btnPrev.addClass(CSS_CLASS.disabled);
//         } else if (current === this.carouselItemsLength - 1) {
//             this.$btnNext.addClass(CSS_CLASS.disabled);
//         }
//     }

//     initVideo() {
//         this.$video.each((index, item) => {
//             const player = videojs(item);

//             player.ready(function () {
//                 console.log('video ready', item);
//             });
//         });
//     }

//     initCarousel() {
//         const self = this;
//         const options = {
//             adaptiveHeight: true,
//             infinite: false,
//         };

//         if (this.$sandbox.is('.carousel-pillars')) {
//             options.arrows = false;
//             options.draggable = false;
//             options.fade = true;
//             options.swipe = false;
//             options.touchMove = false;
//         }

//         if (this.$sandbox.is('.carousel-content')) {
//             options.dots = true;
//             options.draggable = false;
//             options.fade = true;
//         }

//         if (this.$sandbox.is('.carousel-panorama')) {
//             options.dots = true;
//         }

//         if (this.$sandbox.is('.carousel-models')) {
//         }

//         this.$sandbox.slick(options);

//         this.$sandbox.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
//             console.log('progress.move(nextSlide)', currentSlide);

//             const $vid = $('#vid' + nextSlide);

//             $vid.show();
//             self.$btn.hide();
//         });

//         this.$sandbox.on('afterChange', (event, slick, currentSlide, nextSlide) => {
//             console.log('after change', currentSlide);
//             // this.progress.move(nextSlide);

//             const vid = $('#vid' + currentSlide)[0];

//             if (vid) {

//                 const player = videojs(vid);

//                 player.on('ended', () => {
//                     console.log(currentSlide, 'ended');

//                     player.off('ended');
//                     player.currentTime(0);
//                     $(vid).hide();

//                     self.$btn.show();
//                 });

//                 console.log('play');
//                 player.play();
//             } else {
//                 self.$btn.show();    
//             }

//         });

//         // this.setNavigationState();
//     }

//     onClickNavPrevious() {
//         console.log('prev');
//         const current = this.$sandbox.slick('slickCurrentSlide');
//         const goTo = current - 1;

//         this.$sandbox.slick('slickGoTo', goTo);
//     }

//     onClickNavNext() {
//         console.log('next');
//         const current = this.$sandbox.slick('slickCurrentSlide');
//         const goTo = current + 1;

//         this.$sandbox.slick('slickGoTo', goTo);
//     }

//     setInternals() {
//         this.$btnPrev = this.$sandbox.siblings(SELECTORS.btnPrev);
//         this.$btnNext = this.$sandbox.siblings(SELECTORS.btnNext);
//         this.$btn = this.$sandbox.siblings(SELECTORS.btn);
//         this.$video = this.$sandbox.find(SELECTORS.video);
//     }

//     initEvents() {
//         this.$btnPrev.on('click', this.onClickNavPrevious.bind(this));
//         this.$btnNext.on('click', this.onClickNavNext.bind(this));
//     }

//     init() {
//         this.setInternals();

//         this.initVideo();

//         this.initCarousel();

//         this.initEvents();
//     }
// }
// 
const getPrev = (currentIndex, len) => {
    let nextIndex = currentIndex - 1;

    if (currentIndex <= 0) {
        nextIndex = len - 1;
    }

    return nextIndex;
};

const getNext = (currentIndex, len) => {
    let nextIndex = currentIndex + 1;

    if (currentIndex >= len - 1) {
        nextIndex = 0;
    }

    return nextIndex;
};

const onInit = (event, slick) => {
    const currentIndex = slick.currentSlide;
    const len = slick.$slides.length;

    slick.$slides.each((i, el) => {
        const prevIndex = getPrev(i, len);
        const nextIndex = getNext(i, len);

        $(slick.$slides[prevIndex].querySelector('.img-foreground')).clone().addClass('p').appendTo($(el));
        $(slick.$slides[nextIndex].querySelector('.img-foreground')).clone().addClass('n').appendTo($(el));
    });
};

// const onAfter = (event, slick) => {
//     console.log(slick);

//     const currentIndex = slick.currentSlide;
//     const len = slick.$slides.length;
//     const prevIndex = getPrev(currentIndex, len);
//     const nextIndex = getNext(currentIndex, len);

//     console.log(prevIndex, currentIndex, nextIndex);

//     slick.$slides[prevIndex].classList.add('p');
//     slick.$slides[nextIndex].classList.add('n');
// };

const init = () => {

    const $slider = $('.slider');

    $slider.on('init', onInit.bind(this));

    // $slider.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
    //     console.log(currentSlide);

    //     // slick.$slides.removeClass('p n');
    // });

    // $slider.on('afterChange', onAfter.bind(this));

    $slider.slick({
        arrows: true,
        dots: true,
        fade: true,
        focusOnSelect: true,
        infinite: true,
        speed: 1500,
    });

    // if ($component.length) {

    //     $component.each((index, elem) => {
    //         const $elem = $(elem);

    //         const instance = new SlickySlick($elem, index);

    //         $elem.data('carousel', instance);
    //     });
    // }
    // 
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});
