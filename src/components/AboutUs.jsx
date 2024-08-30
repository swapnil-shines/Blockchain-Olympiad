import React from 'react';
import Navbar from './Navbar/Navbar'
const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
        <Navbar/>
      {/* Hero Section */}
      <section className="bg-custom_gradient text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">About HarvestHope Network</h1>
        <p className="text-lg text-white">Transforming the agricultural supply chain in Bangladesh through blockchain technology.</p>
      </section>

      {/* Our Mission and Vision Section */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-lg mb-6">
            Our mission is to ensure fairness of prices throughout the supply chain, manage price hiking and overstocking issues,
            enhance transparency, traceability, and trust in the supply chain, improve product quality, and reduce inefficiencies and corruption.
          </p>
          <h2 className="text-3xl font-bold text-center mb-8">Our Vision</h2>
          <p className="text-lg">
            Our vision is to create a blockchain-powered ecosystem that transforms the agricultural supply chain into a transparent,
            efficient, and fair network. By leveraging blockchain technology, we aim to enhance the overall economic sustainability
            and trustworthiness of the agriculture sector.
          </p>
        </div>
      </section>

      {/* Problem Statement and Solution Section */}
      <section className="bg-white py-12 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">The Problem</h2>
          <p className="text-lg mb-6">
            Food is a fundamental necessity, provided mainly by farmers. However, without ensuring the rights of farmers, they
            will continue to lead miserable lives, and unethical wholesalers will exploit both farmers and consumers. The traditional
            system is primarily physical, lacking documentation, which leads to:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Artificial Price Hiking, Overstocking, and Unfair Practices</li>
            <li>Product Quality Assurance Issues</li>
            <li>Unfair Pricing for Farmers</li>
            <li>Lack of Digitalization and Automation</li>
            <li>Lack of Transparency and Accountability</li>
          </ul>
          <h2 className="text-3xl font-bold text-center mb-8">Our Solution</h2>
          <p className="text-lg">
            The "HarvestHope Network" aims to revolutionize the agricultural supply chain in Bangladesh by leveraging blockchain
            technology. Our system will address these issues through:
          </p>
          <ul className="list-disc pl-6">
            <li>Smart Contracts for Fair Pricing and Stock Management</li>
            <li>Immutable Quality Assurance Records</li>
            <li>Fair Pricing Mechanism for Farmers</li>
            <li>Digitalization and Automation of Information Sharing</li>
            <li>Enhanced Transparency and Accountability</li>
          </ul>
        </div>
      </section>

    
      {/* Footer Section */}
      <footer className="bg-custom_gradient text-white py-4 text-center">
        <p>&copy; 2024 HarvestHope Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
