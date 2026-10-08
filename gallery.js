/*jslint browser */
"use strict";

const mobileQuery = window.matchMedia("(max-width: 600px)");
let page = 0;

function perView() {
    return (mobileQuery.matches)
        ? 1
        : 3;
}

function pageCount(total) {
    return Math.ceil(total / perView());
}

function render() {
    const track = document.getElementById("track");
    const dots = document.querySelectorAll("#pager .dot");
    const total = track.children.length;
    const count = pageCount(total);
    const start = Math.min(page * perView(), total - perView());

    track.style.transform = "translateX(" + (-start * 100 / perView()) + "%)";

    dots.forEach(function (dot, index) {
        if (index === page) {
            dot.classList.add("active");
            dot.setAttribute("aria-current", "true");
        } else {
            dot.classList.remove("active");
            dot.removeAttribute("aria-current");
        }
    });

    document.getElementById("counter").textContent = "Страница " + (page + 1) + " из " + count;
}

function goTo(newPage) {
    const total = document.getElementById("track").children.length;
    const count = pageCount(total);

    page = (newPage + count) % count;
    render();
}

function buildPager() {
    const pager = document.getElementById("pager");
    const total = document.getElementById("track").children.length;
    const count = pageCount(total);
    let index = 0;

    pager.textContent = "";

    function addDot(number) {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", "Страница " + (number + 1));
        dot.addEventListener("click", function () {
            goTo(number);
        });
        pager.appendChild(dot);
    }

    while (index < count) {
        addDot(index);
        index += 1;
    }
}

function onBreakpointChange() {
    page = 0;
    buildPager();
    render();
}

function init() {
    document.getElementById("prev").addEventListener("click", function () {
        goTo(page - 1);
    });
    document.getElementById("next").addEventListener("click", function () {
        goTo(page + 1);
    });
    mobileQuery.addEventListener("change", onBreakpointChange);
    buildPager();
    render();
}

document.addEventListener("DOMContentLoaded", init);
