import chroma from "./chroma.mjs"

// Preset palette definitions
const PALETTES = {
    cyberpunk: {
        background: '#000000',
        colors: ['#E0AA24', '#E02466', '#23E032', '#2457E0']
    },
    earthy: {
        background: '#313715',
        colors: ['#313715', '#D16014', '#939F5C', '#BBCE8A', '#E2F9B8']
    }
};

class Palette {
    constructor() {
        this.background = chroma('#FFFFFF');
        this.colors = [];
    }

    // Set custom palette
    setCustom(hexColors, bgColor = '#FFFFFF') {
        this.background = chroma(bgColor);
        this.colors = hexColors.map(hex => chroma(hex));
        return this;
    }

    // Random harmonious palette generator
    setRandomHarmonious(numColors = 5, scheme = 'auto') {
        // Pick a random base hue
        const baseHue = Math.random() * 360;

        // Random background: either very dark or very light
        const darkBg = Math.random() > 0.5;
        this.background = darkBg
            ? chroma.hsl(baseHue, 0.2, 0.1)  // dark, slightly tinted
            : chroma.hsl(baseHue, 0.1, 0.95); // light, slightly tinted

        // Auto-select scheme if needed
        if (scheme === 'auto') {
            const schemes = ['analogous', 'complementary', 'triadic', 'tetradic', 'monochromatic'];
            scheme = schemes[Math.floor(Math.random() * schemes.length)];
        }

        // Generate colors based on color theory
        let hues = [];
        switch(scheme) {
            case 'analogous':
                // Colors adjacent on the wheel (within 60 degrees)
                const spread = 60;
                for (let i = 0; i < numColors; i++) {
                    hues.push((baseHue + (i * spread / (numColors - 1)) - spread/2) % 360);
                }
                break;

            case 'complementary':
                // Base color + opposite side of wheel
                for (let i = 0; i < numColors; i++) {
                    hues.push(i % 2 === 0 ? baseHue : (baseHue + 180) % 360);
                }
                break;

            case 'triadic':
                // Evenly spaced around the wheel (120 degrees)
                for (let i = 0; i < numColors; i++) {
                    hues.push((baseHue + (i % 3) * 120) % 360);
                }
                break;

            case 'tetradic':
                // Rectangle on the wheel (90 degrees)
                for (let i = 0; i < numColors; i++) {
                    hues.push((baseHue + (i % 4) * 90) % 360);
                }
                break;

            case 'monochromatic':
                // All same hue, varying saturation/lightness
                hues = Array(numColors).fill(baseHue);
                break;
        }

        // Convert hues to colors with varied saturation and lightness
        // Adjust for dark vs light background
        this.colors = hues.map((hue, i) => {
            let sat, light;

            if (scheme === 'monochromatic') {
                // Vary saturation and lightness more dramatically
                sat = 0.4 + (i / numColors) * 0.5;
                light = darkBg
                    ? 0.5 + (i / numColors) * 0.4
                    : 0.3 + (i / numColors) * 0.4;
            } else {
                // Normal variation
                sat = 0.5 + Math.random() * 0.4;  // 0.5-0.9
                light = darkBg
                    ? 0.5 + Math.random() * 0.3   // 0.5-0.8 for dark bg
                    : 0.3 + Math.random() * 0.4;  // 0.3-0.7 for light bg
            }

            return chroma.hsl(hue, sat, light);
        });

        return this;
    }

    randomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    getBackground() {
        return this.background;
    }

    // Get all colors as hex strings
    getColorsHex() {
        return this.colors.map(c => c.hex());
    }

    // Get background as hex string
    getBackgroundHex() {
        return this.background.hex();
    }
}

export { chroma, Palette, PALETTES };
export default chroma;
