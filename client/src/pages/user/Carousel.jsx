import React from 'react'
import { Link } from 'react-router-dom'

export const Carousel = () => {
  return (
    <div>
<h2 className="text-3xl font-bold text-center text-gray-900 my-6">
  Recommended for You
</h2>        
      <div className="carousel carousel-center space-x-4 p-4 rounded-box overflow-x-auto flex">
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
      alt="Item 1"
      className="w-64 h-40 object-cover rounded-md"
    />
    <p>Advanced JavaScript
    Deep dive into ES6+, async/await, and best coding practices.</p>
     <Link to="/cart" className="mt-4 inline-block text-blue-500 font-semibold hover:underline">
     Add to cart →
                </Link>
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
      alt="Item 2"
      className="w-64 h-40 object-cover rounded-md"
    />
    <p>UI/UX Mastery
    Learn wireframing, prototyping, and UX research with Figma.</p>
     <Link to="/cart" className="mt-4 inline-block text-blue-500 font-semibold hover:underline">
     Add to cart →
                </Link>
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
      alt="Item 3"
      className="w-64 h-40 object-cover rounded-md"
    />
    <p>AI & Machine Learning
    Master Python, neural networks, and deep learning concepts.</p>
    <Link to="/cart" className="mt-4 inline-block text-blue-500 font-semibold hover:underline">
    Add to cart →
            </Link>
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
      alt="Item 4"
      className="w-64 h-40 object-cover rounded-md"
    />
        <p>UI/UX Mastery
    Learn wireframing, prototyping, and UX research with Figma.</p>
     <Link to="/cart" className="mt-4 inline-block text-blue-500 font-semibold hover:underline">
                  Add to cart →
                </Link>
  </div>
  {/* <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
      alt="Item 5"
      className="w-64 h-40 object-cover rounded-md"
    />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
      alt="Item 6"
      className="w-64 h-40 object-cover rounded-md"
    />
  </div>
  <div className="carousel-item">
    <img
      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
      alt="Item 7"
      className="w-64 h-40 object-cover rounded-md"
    />
  </div> */}
</div>
    </div>
  )
}
