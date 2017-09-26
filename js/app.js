/* global */

// import slick from 'slick';

const SELECTORS = {
    carousel: '.carousel',
    btn: '.btn',
    btnPrev: '.btn-prev',
    btnNext: '.btn-next',
    video: '.pillar-bg__video',
};

const CSS_CLASS = {
    disabled: 'is-disabled'
};

const $component = $(SELECTORS.carousel);

class SlickySlick {

    constructor($sandbox, index) {
        this.$sandbox = $sandbox;

        this.current = 0;
        this.index = index;

        this.init();
    }

    setNavigationState() {
        const current = this.$carousel.slick('slickCurrentSlide');

        this.$btn.removeClass(CSS_CLASS.disabled);

        if (current === 0) {
            this.$btnPrev.addClass(CSS_CLASS.disabled);
        } else if (current === this.carouselItemsLength - 1) {
            this.$btnNext.addClass(CSS_CLASS.disabled);
        }
    }

    initVideo() {
        this.$video.each((index, item) => {
            const player = videojs(item);

            player.ready(function () {
                console.log('video ready', item);
            });
        });
    }

    initCarousel() {
        const self = this;
        const options = {
            adaptiveHeight: true,
            infinite: false,
        };

        if (this.$sandbox.is('.carousel-pillars')) {
            options.arrows = false;
            options.draggable = false;
            options.fade = true;
            options.swipe = false;
            options.touchMove = false;
        }

        if (this.$sandbox.is('.carousel-content')) {
            options.dots = true;
            options.draggable = false;
            options.fade = true;
        }

        if (this.$sandbox.is('.carousel-panorama')) {
            options.dots = true;
        }

        if (this.$sandbox.is('.carousel-models')) {
        }

        this.$sandbox.slick(options);

        this.$sandbox.on('beforeChange', (event, slick, currentSlide, nextSlide) => {
            console.log('progress.move(nextSlide)', currentSlide);

            const $vid = $('#vid' + nextSlide);

            $vid.show();
            self.$btn.hide();
        });

        this.$sandbox.on('afterChange', (event, slick, currentSlide, nextSlide) => {
            console.log('after change', currentSlide);
            // this.progress.move(nextSlide);

            const vid = $('#vid' + currentSlide)[0];

            if (vid) {

                const player = videojs(vid);

                player.on('ended', () => {
                    console.log(currentSlide, 'ended');

                    player.off('ended');
                    player.currentTime(0);
                    $(vid).hide();

                    self.$btn.show();
                });

                console.log('play');
                player.play();
            } else {
                self.$btn.show();    
            }

        });

        // this.setNavigationState();
    }

    onClickNavPrevious() {
        console.log('prev');
        const current = this.$sandbox.slick('slickCurrentSlide');
        const goTo = current - 1;

        this.$sandbox.slick('slickGoTo', goTo);
    }

    onClickNavNext() {
        console.log('next');
        const current = this.$sandbox.slick('slickCurrentSlide');
        const goTo = current + 1;

        this.$sandbox.slick('slickGoTo', goTo);
    }

    setInternals() {
        this.$btnPrev = this.$sandbox.siblings(SELECTORS.btnPrev);
        this.$btnNext = this.$sandbox.siblings(SELECTORS.btnNext);
        this.$btn = this.$sandbox.siblings(SELECTORS.btn);
        this.$video = this.$sandbox.find(SELECTORS.video);
    }

    initEvents() {
        this.$btnPrev.on('click', this.onClickNavPrevious.bind(this));
        this.$btnNext.on('click', this.onClickNavNext.bind(this));
    }

    init() {
        this.setInternals();

        this.initVideo();

        this.initCarousel();

        this.initEvents();
    }
}

const init = () => {

    if ($component.length) {

        $component.each((index, elem) => {
            const $elem = $(elem);

            const instance = new SlickySlick($elem, index);

            $elem.data('carousel', instance);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    init();
});
