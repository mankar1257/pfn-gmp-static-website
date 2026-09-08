import React from 'react';

/**
 * The house photo treatment (as on the DEOX hardware cards): bordered plate,
 * grayscale image under an emerald overlay, mono caption chip. One component
 * so every photograph on the site speaks with the same accent.
 */
const PhotoPlate: React.FC<{
  src: string;
  alt: string;
  label: string;
  height?: string;      // tailwind height class for the image area
  imgClassName?: string; // extra filters, e.g. "invert" for paper scans
}> = ({ src, alt, label, height = 'h-48', imgClassName = '' }) => (
  <figure className="group relative m-0 border border-emerald-900/50 overflow-hidden bg-black">
    <div className={`relative ${height} overflow-hidden`}>
      <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay z-10" aria-hidden="true" />
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover filter grayscale opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 ${imgClassName}`}
      />
    </div>
    <figcaption className="absolute bottom-3 left-3 z-10 px-2.5 py-1 bg-black/80 border border-emerald-500/30 font-mono text-[10px] tracking-widest text-emerald-500 uppercase">
      {label}
    </figcaption>
  </figure>
);

export default PhotoPlate;
