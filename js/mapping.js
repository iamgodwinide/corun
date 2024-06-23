let device;
let pre_add = 1;

const windowWidth = window.innerWidth;

if (windowWidth > 768) {
    device = "desktop"
} else {
    const areas = document.querySelectorAll(`area`);
    device = "mobile";
    pre_add = (areas.length / 2) + 1;
}

const styleBoxes = () => {
    Array(20).fill(0).slice(pre_add).forEach((_, i) => {
        const box = document.getElementById(`box${i + 1}`);

        const area = document.getElementById(`area${i + pre_add}`);

        if (area && box) {
            const coords = area.coords.split(",");
            box.style.width = (Math.abs(coords[0] - coords[2])) + "px"
            box.style.height = (Math.abs(coords[1] - coords[3])) + "px"
            box.style.left = Number(coords[0]) + "px"
            box.style.top = Number(coords[1]) + "px"
        }
    });
}


setInterval(() => {
    styleBoxes();
}, 2000)

