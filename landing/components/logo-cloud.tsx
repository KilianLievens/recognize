export default function LogoCloud() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base font-semibold text-gray-500">
          Supported service providers, many more to come
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              className="h-12"
              src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
              alt="Itsme"
            />
          </div>

          <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
            <img
              className="h-12"
              src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
              alt="Pexip"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
