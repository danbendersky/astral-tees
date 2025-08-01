import { useEffect, useRef, useState } from 'react';

function TransparentImage({ src, threshold = 250, style = {}, ...props }) {
  const canvasRef = useRef(null);
  const [processedSrc, setProcessedSrc] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Required for CORS images
    console.log("Processing image:", src);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const isWhite = r >= threshold && g >= threshold && b >= threshold;
        if (isWhite) data[i + 3] = 0; // Set alpha to 0
      }

      ctx.putImageData(imgData, 0, 0);
      setProcessedSrc(canvas.toDataURL());
    };

    img.onerror = () => {
      console.error("Image failed to load:", src);
    };

    img.src = src;
  }, [src, threshold]);

  return (
    <>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {processedSrc ? (
        <img src={processedSrc} alt="Filtered" style={style} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default TransparentImage;