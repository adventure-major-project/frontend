import Image from "next/image";

export default function ExptSetupPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
        <div className="text-center">
            <h1 className="text-2xl md:text-5xl font-bold text-blacklooking md:text-blacklooking mb-2">
                Experimental Setup
            </h1>
            <Image src="/expt-setup.png" alt="Experimental Setup" width={800} height={600} />
        </div>
    </div>

  )
}