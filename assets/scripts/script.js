/* 30Pay Landing Scripts by: mohamad-sh.ir */

// MARK: article nav generate
$('.lp-article-wrap').each(function(_, wrap) {
    const list = $('.lp-article-nav', wrap);
    const headers = $('.lp-article :header', wrap);

    list.each(function(_, navWrap) {
        let items = '';

        headers.each(function(i, headerItem) {
            const id = `articleNav_${headerItem.tagName}_${i}`;
            const text = headerItem.innerText.trim();

            headerItem.id = id;
            items += `<li class="lp-article-nav-item"><a href="#${id}">${text}</a></li>`;
        });

        if (items) navWrap.innerHTML = items;
    });
});

!function() { // coin cards swiper
    var swiper = new Swiper('.lp-coin-cards-wrap', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            960: {
                slidesPerView: 3,
            },
        }
    });
}();

// MARK: faq
$('.lp-faq-question').on('click', function() {
    const item = $(this).closest('.lp-faq-item');
    const anwser = $('.lp-faq-anwser', item);
    
    item.siblings().removeClass('active');
    item.toggleClass('active');
});

// MARK: audio player
$('.lp-audio-wrap').each(function(_, wrap) {
    const audio = $('.lp-audio-tag', wrap);
    const playPauseBtn = $('.lp-audio-play-pause-btn', wrap);
    const progressBar = $('.lp-audio-progress-bar', wrap);
    const progress = $('.lp-audio-progress-bar-fill', wrap);
    const timeDisplay = $('.lp-audio-time', wrap);
    const muteBtn = $('.lp-audio-mute', wrap);

    playPauseBtn.on('click', function() {
        if (audio[0].paused) {
            audio[0].play();
            $('.lp-audio-play').hide();
            $('.lp-audio-pause').show();
        } else {
            audio[0].pause();
            $('.lp-audio-play').show();
            $('.lp-audio-pause').hide();
        }
    });

    muteBtn.on('click', function(ev) {
        ev.preventDefault();

        if (audio[0].muted) {
            audio[0].muted = false;
            $('.lp-audio-mute-on').show();
            $('.lp-audio-mute-off').hide();
        } else {
            audio[0].muted = true;
            $('.lp-audio-mute-on').hide();
            $('.lp-audio-mute-off').show();
        }
    });

    audio.on('timeupdate', function() {
        const currentTime = formatTime(audio[0].currentTime);
        const duration = formatTime(audio[0].duration);
        timeDisplay.text(`${currentTime} / ${duration}`);

        const progressPercent = (audio[0].currentTime / audio[0].duration) * 100;
        progress.css('width', `${progressPercent}%`);
    });
    
    progressBar.on('click', function(e) {
        const clickX = e.offsetX;
        const width = progressBar.width();
        const newTime = (clickX / width) * audio[0].duration;
        audio[0].currentTime = newTime;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
    }
});