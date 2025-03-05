export default function AboutUs() {
  return (
    <div id="about" className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
          About Us
        </h1>
        <hr className="w-16 border-gray-400 mt-2 mx-auto" />
      </div>

      {/* Content Section */}
      <div className="max-w-5xl w-full text-gray-700 mt-6">
        
        {/* Who We Are */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-6">
          Who We Are
        </h2>
        <p className="mt-2 text-base sm:text-lg leading-relaxed">
          We are a passionate team of three Computer Engineering students from Pulchowk Campus, united by our vision to revolutionize digital advertising with AI. With expertise spanning AI/ML, Data Science, UI/UX, Frontend, and Backend Development, we combine cutting-edge technology with creative design to deliver intelligent ad generation solutions.
        </p>
        <p className="mt-2 text-base sm:text-lg leading-relaxed">
          <strong>Darpan Kattel</strong> – Expert in Backend, Frontend, and AI/ML<br />
          <strong>Bibek Sunar</strong> – Specialist in UI/UX and Frontend Development <br />
          <strong>Bishnu Datt Badu</strong> – Skilled in Data Analysis, AI/ML, and Data Science
        </p>

        {/* How We Work */}
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-6">
          How We Work
        </h2>
        <p className="mt-2 text-base sm:text-lg leading-relaxed">
          We build AI-powered solutions that simplify advertisement creation. Our platform leverages machine learning and automation to generate high-quality, engaging ads tailored to your needs. Whether you&apos;re a small business or a large enterprise, our technology ensures you create stunning, effective, and data-driven advertisements in seconds.
        </p>

      </div>
    </div>
  );
}
