let utils = {
    Distance: function (a, b) {
        const dx = (a.x - b.x);
        const dy = (a.y - b.y);
        return Math.sqrt(dx * dx + dy * dy);
    },

    // 0 deg when b is above from a
    // 90 deg when b to the right from a
    Angle: function (a, b) {
        return Math.atan2(b.y - a.y, b.x - a.x) * (180.0 / Math.PI) + 90;
    },

    Rotate: function (v, angle) {
        const a = angle / 180 * Math.PI;
        const s = Math.sin(a);
        const c = Math.cos(a);

        const x2 = c * v.x - s * v.y;
        const y2 = s * v.x + c * v.y;

        return {x: x2, y: y2};
    }
};

