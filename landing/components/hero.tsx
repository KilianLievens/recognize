import background from "../public/hero.jpg";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
          <div className="absolute inset-0">
            <Image
              src={background}
              className="h-full w-full object-cover"
              alt=""
            />

            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-800 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-white">RECOGNIZE</span>
              <span className="block text-emerald-200">Get to know people</span>
            </h1>
            Get to know people
            <p className="mx-auto mt-6 max-w-lg text-center text-xl text-emerald-200 sm:max-w-3xl">
              A RocketGov Hackathon project by Legends of the Puyenbroeck
            </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <a
                  href="https://github.com/KilianLievens/recognize#installation-instructions"
                  target="_blank"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-emerald-700 shadow-sm sm:px-8"
                >
                  Get started
                </a>
                <a
                  href="https://rocketchat.dem.be"
                  target="_blank"
                  className="flex items-center justify-center rounded-md border border-transparent bg-emerald-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                >
                  Live demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
