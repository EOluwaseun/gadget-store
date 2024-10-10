import image1 from '../assest/banner/img1.webp';
import image2 from '../assest/banner/img2.webp';
import image3 from '../assest/banner/img3.jpg';
import image4 from '../assest/banner/img4.jpg';
import image5 from '../assest/banner/img5.webp';
import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

function BannerProduct() {
  const [currentImage, setCurrentImage] = useState(0);

  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };
  const prevImage = () => {
    if (currentImage != 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-60 md:h-72 w-full bg-slate-200 overflow-hidden">
        <div className="flex h-full w-full relative">
          <div className="absolute z-10 w-full h-full md:flex justifty-center items-center hidden">
            <div className="flex justify-between w-full text-3xl">
              <button
                onClick={prevImage}
                className="text-grey-200 p-2 shadow-md rounded-full bg-white"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextImage}
                className="text-grey-200 p-2 shadow-md rounded-full bg-white"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="w-full h-full hidden md:flex overflow-hidden">
            {desktopImages.map((imageUrl, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full min-h-full min-w-full transition-all translate"
                  style={{
                    transform: `translateX(-${currentImage * 100}%)`,
                    //   backgroundColor: 'red',
                  }}
                >
                  <img src={imageUrl} className="w-full h-full" />
                </div>
              );
            })}
          </div>

          <div className="w-full h-full flex md:hidden overflow-hidden">
            {mobileImages.map((imageUrl, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-full min-h-full min-w-full transition-all translate"
                  style={{
                    transform: `translateX(-${currentImage * 100}%)`,
                    //   backgroundColor: 'red',
                  }}
                >
                  <img src={imageUrl} className="w-full h-full object-cover" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerProduct;
