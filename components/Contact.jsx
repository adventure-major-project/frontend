import React from "react";

const Contact = () => {
    const developers = [
        {
          name: "Bibek Sunar",
          email: "077bct097.bibek@pcampus.edu.np",
          image: "bibek.jpg",
        },
        {
          name: "Bishnu Datt Badu",
          email: "077bct098.bishnu@pcampus.edu.np",
          image: "Bishnu.jpg",
        },
        {
          name: "Darpan Kattel",
          email: "077bct099.darpan@pcampus.edu.np",
          image: "Darpan.jpg",
        },
      ];
  return (
    <div id="contact" className="min-h-screen bg-blacklooking text-white flex flex-col items-center justify-center p-6">
    <h1 className="text-6xl font-bold mb-6">Contact Our Team</h1>
    <p className="text-xl text-gray-300 mb-8">Reach out to our developers for any queries.</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {developers.map((dev, index) => (
        <div key={index} className="bg-gray-500 p-6 rounded-2xl shadow-lg text-center">
          <img src={dev.image} alt={dev.name} className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" />
          <h2 className="text-2xl font-semibold ">{dev.name}</h2>
          <p className="text-gray-300">{dev.email}</p>
          <a
            href={`mailto:${dev.email}`}
            className="inline-block mt-4 px-4 py-2 bg-blacklooking text-cream font-bold rounded-lg hover:bg-gray-700 hover:text-white transition"
          >
            Contact
          </a>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Contact;
