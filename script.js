async function loadAndScaleLogo() {
    try {
        const response = await fetch('assets/logo.txt');
        if (!response.ok) throw new Error('Failed to load logo');
        const text = await response.text();
        const logoElement = document.getElementById('ascii-logo');
        logoElement.textContent = text;

        // Force an initial font size to meaningful value for measurement
        // 10px is fine as a base
        logoElement.style.fontSize = '10px';

        // Initial scale
        resizeLogo();
        window.addEventListener('resize', resizeLogo);

    } catch (error) {
        console.error(error);
        document.getElementById('ascii-logo').textContent = "Error loading logo.";
    }
}

function resizeLogo() {
    const logoElement = document.getElementById('ascii-logo');

    // 1. Reset transform to just centering to measure natural size
    logoElement.style.transform = 'translate(-50%, -50%) scale(1)';

    // 2. Measure
    const width = logoElement.offsetWidth;
    const height = logoElement.offsetHeight;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (width === 0 || height === 0) return;

    // 3. Calculate scale
    // We want the validation box (width/height) to fit in vw/vh
    const scaleX = vw / width;
    const scaleY = vh / height;

    // Use the smaller scale to fit both dimensions (contain)
    // Multiply by 0.98 for safe margin
    const scale = Math.min(scaleX, scaleY) * 0.98;

    // 4. Apply scale
    // Note: translate(-50%, -50%) must be preserved to keep it centered
    logoElement.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

document.addEventListener('DOMContentLoaded', loadAndScaleLogo);