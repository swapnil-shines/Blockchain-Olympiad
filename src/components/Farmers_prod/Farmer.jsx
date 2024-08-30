import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToDB } from '../../utilities/localDB';
import Swal from 'sweetalert2';
import Slider from "react-slick";
import ProdData from '../data/ProdData'
import { FaAngleLeft, FaAngleRight, FaHeart } from 'react-icons/fa';
import '../../App.css';
import Navbar from '../Navbar/Navbar'
import '../TopProducts/TopProducts'



const Farmer = () => {
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
            `You Have Added ${product.name}!`,
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

    const buttonStyle = {
        position: 'relative',
        color: '#fff',
        background: 'linear-gradient(to right, #0f7404, #5cb917)',
        zIndex: 1,
        overflow: 'hidden',
        border: '0.2rem solid #fff',
        borderRadius: '3.5rem',
        textTransform: 'uppercase',
        padding: '1rem 3.5rem',
        fontWeight: 600,
        fontSize: '1.8rem',
        marginTop: '1.5rem',
        letterSpacing: '0.2rem',
        transition: 'background 0.3s, color 0.3s, border 0.3s',
    };

    const buttonHoverStyle = {
        background: '#fff',
        color: '#5cb917',
        border: '0.2rem solid #5cb917',
    };

    return (
        <div><Navbar/>
        <section  className="bg-gray-100">
            <div className="container mx-auto px-4 py-6 col-lg-4">
                <h1 className="text-3xl font-bold underline ml-[500px] text-green-800 italic ">Farmers' Prodcuts</h1>
                
                <div className="flex">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                            {ProdData.slice(21,26).map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-2 mt-[40px]"
                                >
                                    <Link
                                        to={`/product/${product.id}`}
                                        onClick={() => window.scrollTo(0, 0)}
                                        className="block"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-48 object-cover transform transition-transform duration-200 hover:scale-105"
                                        />
                                    </Link>
                                    <div className="p-2">
                                        <h5 className="text-lg font-semibold">{product.name}</h5>
                                        <p className='text-lg font-bold mb-9'>Price: ৳{product.price} Taka</p>
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
                </div>
            </div>
        </section>
        </div>
    );
};

export default Farmer;