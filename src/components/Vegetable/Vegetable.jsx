import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToDB } from '../../utilities/localDB';
import Swal from 'sweetalert2';
import Slider from "react-slick";
import { FaAngleLeft, FaAngleRight, FaHeart } from 'react-icons/fa';
import '../TopProducts/TopProducts'
import img7 from '../../images/hero/whole.jpg';
import ProdData from '../data/ProdData';

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        >
            <FaAngleLeft />
        </button>
    );
};

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button
            onClick={onClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 z-10"
        >
            <FaAngleRight />
        </button>
    );
};

const Vegetable = () => {
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




    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 400,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "ease-in-out",
        pauseOnHover: true,
        pauseOnFocus: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };

    return (
        <section className="bg-primary/40">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold underline decoration-slice">
                    Wholesale Deals: Bulk Savings for You

                </h1>
                <div className="flex mt-4">
                    <div className="w-1/3 pr-4">
                        <img
                            src={img7}
                            alt="Spice Cover"
                            className="w-200 h-80 object-cover rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105"
                        />
                    </div>
                    <div className="w-2/3">
                        <Slider {...settings}>
                            {ProdData.slice(0, 10).map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden p-2"
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
                                        <p className="text-gray-600">Price: ৳{product.price} Taka</p>
                                        <div className="flex gap-3 mt-2">
                                            <button
                                                onClick={() => {
                                                    window.scrollTo(0, 0);
                                                    navigate(`/product/${product.id}`);
                                                }}
                                                className="bg-green-700 text-white py-0 px-0 hover:bg-white hover:border-2 hover:border-black hover:text-white rounded-full custom-font-size"
                                            >
                                                Details
                                            </button>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-custom_gradient ml-[2px] custom-font-size py-2 px-1  hover:bg-white hover:border-2  hover:text-black "
                                            >
                                                Add to Cart
                                            </button>
                                            <button
                                                onClick={() => toggleWishlist(product)}
                                                className={`text-xl py-1 px-1 rounded-full mt-4 bg-transparent transition-colors  ${isWishlisted(product) ? 'text-red-500' : 'text-gray-400'
                                                    }`}
                                            >
                                                <FaHeart
                                                    className={`text-xl ${isWishlisted(product) ? 'text-red-500' : 'text-gray-400'
                                                        }`}
                                                />
                                            </button>



                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <div className="mt-4 text-center">
                            <button
                                onClick={() => navigate('/WholeSale')}
                                className="mt-0 bg-custom_gradient hover:scale-105   px-6 py-2 border-2 border-black rounded-full  custom-font-size"
                            >
                                View More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Vegetable;
