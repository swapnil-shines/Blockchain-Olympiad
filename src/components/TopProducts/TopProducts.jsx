import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { addToDB } from '../../utilities/localDB';
import Swal from 'sweetalert2';
import { FaStar, FaHeart } from "react-icons/fa";
import img28 from '../../images/spices/Basmati Rice.jpg';
import img13 from '../../images/spices/potato.jpg';
import img15 from '../../images/spices/Cauliflower.jpg';
import img18 from '../../images/spices/Garlic.jpg';
import ProdData from '../data/ProdData'
import './TopProducts.css'



const TopProducts = ({ handleOrderPopup }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDB(product.id);
    Swal.fire(
      'Successful!',
      `You Have Added ${product.title}!`,
      'success'
    );
  };

  const toggleWishlist = (product) => {
    let newWishlist;
    if (wishlist.includes(product.id)) {
      newWishlist = wishlist.filter((id) => id !== product.id);
    } else {
      newWishlist = [...wishlist, product.id];
    }
    setWishlist(newWishlist);
  };

  const isWishlisted = (product) => wishlist.includes(product.id);


  return (
    <div>
      <div className=" bg-primary/40 ">
        {/* Header section */}
        <div className="text-left mb-16 underline ">

          <h1 className="text-2xl font-bold">
            Direct from Farmers: Fresh and Authentic
          </h1>
        </div>
        {/* Body section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 place-items-center">
          {ProdData.slice(7, 11).map((product) => (
            <div
              key={product.id}

              className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group w-full max-w-[350px]"
            >
              {/* Image section */}
              <div className="h-[200px] flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[260px] w-[300px] object-contain max-w-[440px] block mx-auto transform group-hover:scale-105 duration-300 drop-shadow-md"
                />
              </div>

              {/* Details section */}
              <div className="p-4 text-center">
                <h1 className="text-xl font-bold">{product.name}</h1>

                <div className="flex gap-1 justify-center mt-2">
                  <button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      navigate(`/product/${product.id}`);
                    }}
                    className="bg-green-700 text-white py-1 px-4  hover:bg-white hover:border-2 hover:border-black hover:text-white rounded-full custom-font-size"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-custom_gradient  custom-font-size py-1 px-2  hover:bg-white hover:border-2  hover:text-black "
                  >
                    Add to Cart
                  </button>

                  <button
            onClick={() => toggleWishlist(product)}
            className={`text-xl py-1 px-1 rounded-full mt-4 bg-transparent transition-colors duration-300 ${
              isWishlisted(product) ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <FaHeart
              className={`text-xl ${
                isWishlisted(product) ? 'text-red-500' : 'text-gray-400'
              }`}
            />
            </button>

                </div>

              </div>
            </div>
          ))}
        </div>




        {/* View More Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/farmerproducts')}
            className=" mt-0 bg-custom_gradient hover:scale-105   px-6 py-2 border-2 border-black rounded-full  custom-font-size "
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
