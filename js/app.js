(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelectorAll(".check").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (document.querySelector(".game")) {
        if (+sessionStorage.getItem("money") >= 50) sessionStorage.setItem("current-bet", 50); else sessionStorage.setItem("current-bet", 0);
        document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function remove_class(block, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1500);
    }
    function no_money(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        let money = +sessionStorage.getItem("money") + count;
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function get_random_animate() {
        let number = get_random(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = get_random(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        get_random_animate();
    }), 1e4);
    const config_shop = {
        price_2: 7e3,
        price_3: 14e3
    };
    function create_mark() {
        let item = document.createElement("div");
        item.classList.add("shop__mark");
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/mark.png");
        image.setAttribute("alt", "Image");
        item.append(image);
        return item;
    }
    function write_prices() {
        document.querySelectorAll(".shop__price")[0].textContent = config_shop.price_2;
        document.querySelectorAll(".shop__price")[1].textContent = config_shop.price_3;
    }
    function check_bought_cleo() {
        if (sessionStorage.getItem("cleo-2")) {
            document.querySelector(".shop__price-box_2").remove();
            let mark = create_mark();
            document.querySelectorAll(".shop__info-box")[1].prepend(mark);
        }
        if (sessionStorage.getItem("cleo-3")) {
            document.querySelector(".shop__price-box_3").remove();
            let mark = create_mark();
            document.querySelectorAll(".shop__info-box")[2].prepend(mark);
        }
    }
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".main").classList.add("_active");
        write_prices();
        check_bought_cleo();
        if (sessionStorage.getItem("level-2")) document.querySelector(".levels__level_2").classList.remove("_hide");
        if (sessionStorage.getItem("level-3")) document.querySelector(".levels__level_3").classList.remove("_hide");
    }
    if (document.querySelector(".main") && sessionStorage.getItem("show-levels")) {
        document.querySelector(".main").classList.add("_level");
        setTimeout((() => {
            sessionStorage.removeItem("show-levels", true);
        }), 100);
    }
    if (document.querySelector(".main") && sessionStorage.getItem("current-cleo")) {
        let num = +sessionStorage.getItem("current-cleo");
        document.querySelectorAll(".shop__item")[num - 1].classList.add("_active");
    } else if (document.querySelector(".main") && !sessionStorage.getItem("current-cleo")) {
        sessionStorage.setItem("current-cleo", 1);
        let num = +sessionStorage.getItem("current-cleo");
        document.querySelectorAll(".shop__item")[num - 1].classList.add("_active");
    }
    const config_game = {
        numbers_cubs: [],
        current_win: 0,
        sum_cubs: 0,
        cub_1_top: 0,
        cub_1_left: 0,
        cub_2_top: 0,
        cub_2_left: 0,
        cub_3_top: 0,
        cub_3_left: 0,
        cub_4_top: 0,
        cub_4_left: 0,
        cub_5_top: 0,
        cub_5_left: 0
    };
    if (document.querySelector(".game")) {
        create_block_numbers();
        check_active_cleo();
        document.querySelector(".game").classList.add(`game_${sessionStorage.getItem("current-level")}`);
        create_cubs();
    }
    function create_block_numbers() {
        let item_1 = document.createElement("div");
        let item_2 = document.createElement("div");
        let item_3 = document.createElement("div");
        let item_4 = document.createElement("div");
        let item_5 = document.createElement("div");
        item_1.classList.add("numbers__item");
        item_2.classList.add("numbers__item");
        item_3.classList.add("numbers__item");
        item_4.classList.add("numbers__item");
        item_5.classList.add("numbers__item");
        let text_1 = document.createElement("p");
        let text_2 = document.createElement("p");
        let text_3 = document.createElement("p");
        let text_4 = document.createElement("p");
        let text_5 = document.createElement("p");
        item_1.append(text_1);
        item_2.append(text_2);
        item_3.append(text_3);
        item_4.append(text_4);
        item_5.append(text_5);
        item_1.setAttribute("data-active", 1);
        item_2.setAttribute("data-active", 2);
        item_3.setAttribute("data-active", 3);
        item_4.setAttribute("data-active", 4);
        item_5.setAttribute("data-active", 5);
        item_1.setAttribute("style", "--i:1");
        item_2.setAttribute("style", "--i:2");
        item_3.setAttribute("style", "--i:3");
        item_4.setAttribute("style", "--i:4");
        item_5.setAttribute("style", "--i:5");
        if (1 == +sessionStorage.getItem("current-level")) {
            text_1.textContent = "3 - 8";
            text_2.textContent = "9 - 13";
            text_3.textContent = "14 - 18";
            document.querySelector(".numbers__body").append(item_1, item_2, item_3);
        } else if (2 == +sessionStorage.getItem("current-level")) {
            text_1.textContent = "3 - 8";
            text_2.textContent = "9 - 13";
            text_3.textContent = "14 - 18";
            text_4.textContent = "19 - 24";
            document.querySelector(".numbers__body").append(item_1, item_2, item_3, item_4);
        } else if (3 == +sessionStorage.getItem("current-level")) {
            text_1.textContent = "3 - 8";
            text_2.textContent = "9 - 13";
            text_3.textContent = "14 - 18";
            text_4.textContent = "19 - 24";
            text_5.textContent = "25 - 30";
            document.querySelector(".numbers__body").append(item_1, item_2, item_3, item_4, item_5);
        }
    }
    function check_active_cleo() {
        if (1 == +sessionStorage.getItem("current-cleo")) {
            document.querySelector(".actions__name").textContent = "Queen Mes";
            document.querySelector(".actions__coeff").textContent = "x1.0";
        } else if (2 == +sessionStorage.getItem("current-cleo")) {
            document.querySelector(".actions__name").textContent = "Queen Kleo";
            document.querySelector(".actions__coeff").textContent = "x2.0";
            document.querySelector(".game__cleo").classList.add("_cleo-2");
        } else if (3 == +sessionStorage.getItem("current-cleo")) {
            document.querySelector(".actions__name").textContent = "Queen Fire";
            document.querySelector(".actions__coeff").textContent = "x3.0";
            document.querySelector(".game__cleo").classList.add("_cleo-3");
        }
        document.querySelector(".game__cleo img").setAttribute("src", `img/gif/cleo_${+sessionStorage.getItem("current-cleo")}.gif`);
    }
    function create_cubs() {
        if (1 == +sessionStorage.getItem("current-level")) {
            let cub_1 = create_cub(1);
            let cub_2 = create_cub(2);
            let cub_3 = create_cub(3);
            document.querySelector(".field__cubs").append(cub_1, cub_2, cub_3);
        } else if (2 == +sessionStorage.getItem("current-level")) {
            let cub_1 = create_cub(1);
            let cub_2 = create_cub(2);
            let cub_3 = create_cub(3);
            let cub_4 = create_cub(4);
            document.querySelector(".field__cubs").append(cub_1, cub_2, cub_3, cub_4);
        } else if (3 == +sessionStorage.getItem("current-level")) {
            let cub_1 = create_cub(1);
            let cub_2 = create_cub(2);
            let cub_3 = create_cub(3);
            let cub_4 = create_cub(4);
            let cub_5 = create_cub(5);
            document.querySelector(".field__cubs").append(cub_1, cub_2, cub_3, cub_4, cub_5);
        }
    }
    function create_cub(num) {
        let cub = document.createElement("div");
        cub.classList.add("field__cub");
        cub.classList.add(`field__cub_${num}`);
        let image = document.createElement("img");
        image.setAttribute("src", `img/icons/cub-${num}.png`);
        image.setAttribute("alt", `Image`);
        cub.append(image);
        return cub;
    }
    function start_game() {
        get_audio_cubs();
        check_level_get_random_numbers();
        delete_money(+sessionStorage.getItem("current-bet"), ".check");
        document.querySelector(".numbers__body").classList.add("_hold");
        generate_coord_cubs();
        move_cubs_to_coordinate();
        write_value_cubs();
        setTimeout((() => {
            check_win();
        }), 1e3);
    }
    function check_level_get_random_numbers() {
        let random_arr = [];
        if (1 == +sessionStorage.getItem("current-level")) random_arr = [ get_random(1, 7), get_random(1, 7), get_random(1, 7) ]; else if (2 == +sessionStorage.getItem("current-level")) random_arr = [ get_random(1, 7), get_random(1, 7), get_random(1, 7), get_random(1, 7) ]; else if (3 == +sessionStorage.getItem("current-level")) random_arr = [ get_random(1, 7), get_random(1, 7), get_random(1, 7), get_random(1, 7), get_random(1, 7) ];
        config_game.numbers_cubs = random_arr;
    }
    function generate_coord_cubs() {
        config_game.cub_1_top = `${get_random(50, 64)}%`;
        config_game.cub_1_left = `${get_random(36, 70)}%`;
        config_game.cub_2_top = `${get_random(33, 43)}%`;
        config_game.cub_2_left = `${get_random(20, 55)}%`;
        config_game.cub_3_top = `${get_random(13, 20)}%`;
        config_game.cub_3_left = `${get_random(0, 30)}%`;
        if (2 == +sessionStorage.getItem("current-level")) {
            config_game.cub_2_top = `${get_random(33, 43)}%`;
            config_game.cub_2_left = `${get_random(0, 35)}%`;
            config_game.cub_4_top = `${get_random(33, 40)}%`;
            config_game.cub_4_left = `${get_random(36, 70)}%`;
        } else if (3 == +sessionStorage.getItem("current-level")) {
            config_game.cub_2_top = `${get_random(33, 40)}%`;
            config_game.cub_2_left = `${get_random(0, 30)}%`;
            config_game.cub_4_top = `${get_random(33, 40)}%`;
            config_game.cub_4_left = `${get_random(40, 70)}%`;
            config_game.cub_5_top = `${get_random(13, 20)}%`;
            config_game.cub_5_left = `${get_random(40, 70)}%`;
        }
    }
    function move_cubs_to_coordinate() {
        document.querySelector(".field__cub_1").style.top = config_game.cub_1_top;
        document.querySelector(".field__cub_1").style.left = config_game.cub_1_left;
        setTimeout((() => {
            document.querySelector(".field__cub_2").style.top = config_game.cub_2_top;
            document.querySelector(".field__cub_2").style.left = config_game.cub_2_left;
        }), 20);
        setTimeout((() => {
            document.querySelector(".field__cub_3").style.top = config_game.cub_3_top;
            document.querySelector(".field__cub_3").style.left = config_game.cub_3_left;
        }), 40);
        if (2 == +sessionStorage.getItem("current-level")) setTimeout((() => {
            document.querySelector(".field__cub_4").style.top = config_game.cub_4_top;
            document.querySelector(".field__cub_4").style.left = config_game.cub_4_left;
        }), 60); else if (3 == +sessionStorage.getItem("current-level")) {
            setTimeout((() => {
                document.querySelector(".field__cub_4").style.top = config_game.cub_4_top;
                document.querySelector(".field__cub_4").style.left = config_game.cub_4_left;
            }), 60);
            setTimeout((() => {
                document.querySelector(".field__cub_5").style.top = config_game.cub_5_top;
                document.querySelector(".field__cub_5").style.left = config_game.cub_5_left;
            }), 80);
        }
        document.querySelectorAll(".field__cub").forEach((el => {
            let random_transform = get_random(330, 370);
            el.style.transform = `rotate(${random_transform}deg)`;
        }));
    }
    function move_cubs_to_start_coordinate() {
        document.querySelector(".field__cub_1").style.top = "0%";
        document.querySelector(".field__cub_1").style.left = "0%";
        document.querySelector(".field__cub_2").style.top = "0%";
        document.querySelector(".field__cub_2").style.left = "50px";
        document.querySelector(".field__cub_3").style.top = "0%";
        document.querySelector(".field__cub_3").style.left = "100px";
        if (2 == +sessionStorage.getItem("current-level")) {
            document.querySelector(".field__cub_4").style.top = "0%";
            document.querySelector(".field__cub_4").style.left = "150px";
        } else if (3 == +sessionStorage.getItem("current-level")) {
            document.querySelector(".field__cub_4").style.top = "0%";
            document.querySelector(".field__cub_4").style.left = "150px";
            document.querySelector(".field__cub_5").style.top = "0%";
            document.querySelector(".field__cub_5").style.left = "200px";
        }
        document.querySelectorAll(".field__cub").forEach((el => {
            el.style.transform = "rotate(-360deg)";
        }));
    }
    function write_value_cubs() {
        setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelectorAll(".field__cub img")[0].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[0]}.webp`);
                document.querySelectorAll(".field__cub img")[1].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[1]}.webp`);
                document.querySelectorAll(".field__cub img")[2].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[2]}.webp`);
            } else {
                document.querySelectorAll(".field__cub img")[0].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[0]}.png`);
                document.querySelectorAll(".field__cub img")[1].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[1]}.png`);
                document.querySelectorAll(".field__cub img")[2].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[2]}.png`);
            }
        }), 100);
        if (2 == +sessionStorage.getItem("current-level")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) document.querySelectorAll(".field__cub img")[3].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[3]}.webp`); else document.querySelectorAll(".field__cub img")[3].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[3]}.png`);
        }), 100); else if (3 == +sessionStorage.getItem("current-level")) setTimeout((() => {
            if (document.documentElement.classList.contains("webp")) {
                document.querySelectorAll(".field__cub img")[3].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[3]}.webp`);
                document.querySelectorAll(".field__cub img")[4].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[4]}.webp`);
            } else {
                document.querySelectorAll(".field__cub img")[3].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[3]}.png`);
                document.querySelectorAll(".field__cub img")[4].setAttribute("src", `img/icons/cub-${config_game.numbers_cubs[4]}.png`);
            }
        }), 100);
    }
    function get_audio_cubs() {
        const audio_main = new Audio;
        audio_main.preload = "auto";
        audio_main.src = "files/dice_2.wav";
        audio_main.volume = .5;
        audio_main.play();
    }
    function check_win() {
        config_game.sum_cubs = config_game.numbers_cubs.reduce(((a, b) => a + b));
        let bet = +sessionStorage.getItem("current-select");
        if (1 == bet && config_game.sum_cubs >= 3 && config_game.sum_cubs <= 8) {
            if (1 == +sessionStorage.getItem("current-level")) check_count_win(3); else if (2 == +sessionStorage.getItem("current-level")) check_count_win(4); else if (3 == +sessionStorage.getItem("current-level")) check_count_win(5);
            check_levels();
        } else if (2 == bet && config_game.sum_cubs >= 9 && config_game.sum_cubs <= 13) {
            if (1 == +sessionStorage.getItem("current-level")) check_count_win(2); else if (2 == +sessionStorage.getItem("current-level")) check_count_win(2); else if (3 == +sessionStorage.getItem("current-level")) check_count_win(3);
            check_levels();
        } else if (3 == bet && config_game.sum_cubs >= 14 && config_game.sum_cubs <= 18) {
            if (1 == +sessionStorage.getItem("current-level")) check_count_win(2); else if (2 == +sessionStorage.getItem("current-level")) check_count_win(2); else if (3 == +sessionStorage.getItem("current-level")) check_count_win(2);
            check_levels();
        } else if (4 == bet && config_game.sum_cubs >= 19 && config_game.sum_cubs <= 24) {
            if (1 == +sessionStorage.getItem("current-level")) check_count_win(2); else if (2 == +sessionStorage.getItem("current-level")) check_count_win(2); else if (3 == +sessionStorage.getItem("current-level")) check_count_win(3);
            check_levels();
        } else if (5 == bet && config_game.sum_cubs >= 25 && config_game.sum_cubs <= 30) {
            if (1 == +sessionStorage.getItem("current-level")) check_count_win(3); else if (2 == +sessionStorage.getItem("current-level")) check_count_win(4); else if (3 == +sessionStorage.getItem("current-level")) check_count_win(5);
            check_levels();
        } else {
            document.querySelector(".win__sub-text").textContent = "You loose";
            document.querySelector(".win__count").textContent = ` ${config_game.sum_cubs}`;
            document.querySelector(".win__text").classList.add("_hide");
            document.querySelector(".win__button_levels").classList.add("_hide");
        }
        document.querySelector(".win").classList.add("_active");
    }
    function check_levels() {
        if (!sessionStorage.getItem("level-2")) sessionStorage.setItem("level-2", true); else if (!sessionStorage.getItem("level-3")) sessionStorage.setItem("level-3", true); else if (sessionStorage.getItem("level-2") && sessionStorage.getItem("level-3")) document.querySelector(".win__button_levels").classList.add("_hide");
    }
    function check_count_win(count) {
        config_game.current_win = +sessionStorage.getItem("current-bet") * +sessionStorage.getItem("current-cleo") * count;
        document.querySelector(".win__text").textContent = config_game.current_win;
        document.querySelector(".win__count").textContent = ` ${config_game.sum_cubs}`;
        add_money(config_game.current_win, ".check", 1e3, 2e3);
    }
    function reset_game() {
        config_game.numbers_cubs = [];
        config_game.sum_cubs = 0;
        move_cubs_to_start_coordinate();
        document.querySelector(".actions__buttons-start").classList.remove("_hide");
        document.querySelector(".numbers__body").classList.remove("_hold");
        document.querySelector(".win__text").classList.remove("_hide");
        document.querySelector(".win__button_levels").classList.remove("_hide");
        document.querySelector(".win__sub-text").textContent = "You win";
    }
    if (document.querySelector(".main") || document.querySelector(".game")) {
        const audio_main = new Audio;
        audio_main.preload = "auto";
        audio_main.src = "files/bg_audio.wav";
        audio_main.loop = [ true ];
        audio_main.volume = .3;
        document.addEventListener("click", (e => {
            let targetElement = e.target;
            if (targetElement.closest(".volume")) {
                if (targetElement.closest(".volume") && !targetElement.closest(".volume").classList.contains("_hide")) audio_main.volume = 0; else if (targetElement.closest(".volume") && targetElement.closest(".volume").classList.contains("_hide")) {
                    audio_main.volume = .3;
                    audio_main.play();
                }
                targetElement.closest(".volume").classList.toggle("_hide");
            }
        }));
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        let current_bet = +sessionStorage.getItem("current-bet");
        let bank = +sessionStorage.getItem("money");
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main").classList.add("_active");
        }
        if (targetElement.closest(".main__button_play")) document.querySelector(".main").classList.add("_level");
        if (targetElement.closest(".main__button_shop")) document.querySelector(".main").classList.add("_shop");
        if (targetElement.closest(".header__button-home_main")) if (document.querySelector(".main") && document.querySelector(".main").classList.contains("_level")) document.querySelector(".main").classList.remove("_level"); else if (document.querySelector(".main") && document.querySelector(".main").classList.contains("_shop")) document.querySelector(".main").classList.remove("_shop");
        if (targetElement.closest(".header__button-home_game") || targetElement.closest(".header__button-levels")) sessionStorage.removeItem("current-select");
        if (targetElement.closest(".shop__price-box_2")) if (bank > config_shop.price_2) {
            delete_money(config_shop.price_2, ".check");
            sessionStorage.setItem("cleo-2", true);
            document.querySelector(".shop__price-box_2").classList.add("_hide");
            setTimeout((() => {
                document.querySelector(".shop__price-box_2").remove();
            }), 1e3);
            let mark = create_mark();
            setTimeout((() => {
                document.querySelectorAll(".shop__info-box")[1].prepend(mark);
            }), 1e3);
        } else no_money(".check");
        if (targetElement.closest(".shop__price-box_3")) if (bank > config_shop.price_3) {
            delete_money(config_shop.price_3, ".check");
            sessionStorage.setItem("cleo-3", true);
            document.querySelector(".shop__price-box_3").classList.add("_hide");
            setTimeout((() => {
                document.querySelector(".shop__price-box_3").remove();
            }), 1e3);
            let mark = create_mark();
            setTimeout((() => {
                document.querySelectorAll(".shop__info-box")[2].prepend(mark);
            }), 1e3);
        } else no_money(".check");
        if (targetElement.closest(".header__button-levels")) sessionStorage.setItem("show-levels", true);
        if (targetElement.closest(".levels__level_1")) sessionStorage.setItem("current-level", 1);
        if (targetElement.closest(".levels__level_2")) sessionStorage.setItem("current-level", 2);
        if (targetElement.closest(".levels__level_3")) sessionStorage.setItem("current-level", 3);
        if (targetElement.closest(".shop__item_1")) {
            remove_class(".shop__item", "_active");
            targetElement.closest(".shop__item_1").classList.add("_active");
            sessionStorage.setItem("current-cleo", 1);
        }
        if (targetElement.closest(".shop__item_2") && sessionStorage.getItem("cleo-2")) {
            remove_class(".shop__item", "_active");
            targetElement.closest(".shop__item_2").classList.add("_active");
            sessionStorage.setItem("current-cleo", 2);
        }
        if (targetElement.closest(".shop__item_3") && sessionStorage.getItem("cleo-3")) {
            remove_class(".shop__item", "_active");
            targetElement.closest(".shop__item_3").classList.add("_active");
            sessionStorage.setItem("current-cleo", 3);
        }
        if (targetElement.closest(".block-bet__minus")) if (current_bet > 50) {
            sessionStorage.setItem("current-bet", current_bet - 50);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
        if (targetElement.closest(".block-bet__plus")) if (bank - 49 > current_bet) {
            sessionStorage.setItem("current-bet", current_bet + 50);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        } else no_money(".check");
        if (targetElement.closest(".numbers__item")) {
            remove_class(".numbers__item", "_active");
            targetElement.closest(".numbers__item").classList.add("_active");
            let count_choice = targetElement.closest(".numbers__item").dataset.active;
            sessionStorage.setItem("current-select", count_choice);
        }
        if (targetElement.closest(".actions__buttons-start")) if (!sessionStorage.getItem("current-select")) {
            document.querySelectorAll(".numbers__item").forEach((el => {
                el.classList.add("_anim");
            }));
            setTimeout((() => {
                remove_class(".numbers__item", "_anim");
            }), 1e3);
        } else if (bank > current_bet) {
            start_game();
            document.querySelector(".actions__buttons-start").classList.add("_hide");
        } else if (bank < current_bet) no_money(".check");
        if (targetElement.closest(".win__button_levels")) sessionStorage.setItem("show-levels", true);
        if (targetElement.closest(".win__button_play")) {
            document.querySelector(".win").classList.remove("_active");
            reset_game();
        }
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();