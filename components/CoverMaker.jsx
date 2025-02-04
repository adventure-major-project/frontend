export default function CoverMaker() {
    return (
    //    Advertisment posters
      <div id="demo" className="flex flex-col items-center justify-center min-h-screen bg-cream ">
        <div className="flex flex-col md:flex-row items-center bg-cream p-6 md:p-10 rounded-lg  max-w-6xl space-y-6 md:space-y-0 md:space-x-6 my-10">
          {/* Left Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-blacklooking md:text-blacklooking">
              Advertisement Posters
            </h1>
            <p className="mt-4 text-black">
            Your advertisement is the face of your brand.  Elevate your marketing with
            Elevate your marketing with AI-powered ad creation! Our intelligent ad generator crafts stunning and engaging designs in seconds. 
            Choose from thousands of templates, customize text, images, fonts, and colors effortlessly, and generate high-converting ads for social media and beyond.
             Let AI handle the design while you focus on growing your business.
            </p>
            <button className="mt-6 px-4 py-2 bg-cream text-blacklooking font-bold rounded-lg shadow hover:bg-gray-400 hover:text-white transition">
            Make an Advertisement poster
            </button>
          </div>
  
          {/* Right Section */}
          <div className="relative flex-1 w-full max-w-md">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
             
              <div className="flex items-center px-4 py-2 bg-gray-300">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
  
             
              <img
                src="/poster1.jpg" 
                alt=""
                className="w-full h-32 md:h-48 object-scale-down"
              />
  
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Offer Cover */}
        <div className="flex flex-col md:flex-row items-center bg-blacklooking p-6 md:p-10 rounded-lg shadow-lg max-w-6xl space-y-6 md:space-y-0 md:space-x-6">
          {/* Left Section */}
          <div className="relative flex-1 w-full max-w-md">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
             
              <div className="flex items-center px-4 py-2 bg-gray-300">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
  
             
              <img
                src="/poster2.jpg" 
                alt="Facebook Cover Example"
                className="w-full h-32 md:h-48 object-scale-down"
              />
  
             
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-cream md:text-cream">
            Offer Posters
            </h1>
            <p className="mt-4 text-white">
              Your Offer Cover is the face of your business. Elevate your
              <span className="text-blue-500"> Offer covers </span> by crafting a distinctive design using our Offer cover maker. 
              With thousands of templates at your disposal, creating a Facebook cover you'll adore has never been simpler. 
              Customize the images, layout, fonts, and colors – then share your creation with the world.
            </p>
            <button className="mt-6 px-4 py-2 bg-cream text-blacklooking font-bold rounded-lg shadow hover:bg-gray-400 hover:text-white transition">
              Make a Offer Cover
            </button>
          </div>
  
        </div>
        
        <div className="flex flex-col md:flex-row items-center bg-cream p-6 md:p-10 rounded-lg  max-w-6xl space-y-6 md:space-y-0 md:space-x-6 my-10">
          {/* Left Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-blacklooking md:text-blacklooking">
              Menu Posters
            </h1>
            <p className="mt-4 text-black">
              Your Menu cover is the face of your business. Elevate your
              <span className="text-blue-500"> Menu covers </span> by crafting a distinctive design using our Menu cover maker. 
              With thousands of templates at your disposal, creating a Menu cover you'll adore has never been simpler. 
              Customize the images, layout, fonts, and colors – then share your creation with the world.
            </p>
            <button className="mt-6 px-4 py-2 bg-cream text-blacklooking font-bold rounded-lg shadow hover:bg-gray-400 hover:text-white transition">
              Make a Menu
            </button>
          </div>
          {/* Right Section */}
          <div className="relative flex-1 w-full max-w-md">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-md">
             
              <div className="flex items-center px-4 py-2 bg-gray-300">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
  
        
              <img
                src="/poster3.jpg" 
                alt="Facebook Cover Example"
                className="w-full h-32 md:h-48 object-scale-down"
              />
  
             
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    );
  }
  