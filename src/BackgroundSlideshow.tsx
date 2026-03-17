import { useState, useEffect } from 'react';

const IMAGES = [
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1434725039720-abb26e22fed8?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1453728013993-6d03f9dbb59e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1475924156734-496f6cac6bd1?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1433086966358-54859d0ee716?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1441834115160-2546820c74cf?auto=format&fit=crop&w=1920&q=80',
];

export default function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 15000); // Change image every 15 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-black">
      {IMAGES.map((url, index) => (
        <div
          key={url}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[3000ms] ease-in-out`}
          style={{
            backgroundImage: `url(${url})`,
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/60" /> {/* Dark overlay */}
    </div>
  );
}
