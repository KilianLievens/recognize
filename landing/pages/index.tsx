import {
  ArrowUturnLeftIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentChartBarIcon,
  HeartIcon,
  InboxIcon,
  PencilSquareIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Header from "../components/header";
import Hero from "../components/hero";
import LogoCloud from "../components/logo-cloud";
import EuropeanCommissionLogo from "../components/logo-european-commission";
import PexipLogo from "../components/logo-pexip";
import RocketChatLogo from "../components/logo-rocket-chat";
import eurobarometer from "../public/eurobarometer.jpeg";

export default function Example() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />

        {/* Alternating Feature Sections */}
        <div className="relative overflow-hidden">
          <div className="mt-24">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-1 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    Only{" "}
                    <span className="text-emerald-600">
                      14% of key public service providers
                    </span>{" "}
                    across all Member States allow cross-border authentication
                    with{" "}
                    <span className="text-emerald-600">
                      an e-Identity system
                    </span>
                    .
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    For example to prove a person’s identity on the internet
                    without the need for a password.
                  </p>
                  <p className="mt-16 border-t border-gray-200 pt-4 text-gray-500">
                    Source:{" "}
                    <a
                      href="https://ec.europa.eu/info/strategy/priorities-2019-2024/europe-fit-digital-age/european-digital-identity_en"
                      target="_blank"
                    >
                      European Commission
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:col-start-2 lg:mt-0 flex items-center justify-center">
                <EuropeanCommissionLogo />
              </div>
            </div>
          </div>

          <div className="mt-24">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    <span className="text-emerald-600">Recognize</span> gives
                    the public service providers the power to use{" "}
                    <span className="text-emerald-600">
                      tools local to their administration
                    </span>
                    , so they can securely communicate with citizens through
                    their digital channels.
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    <span className="text-emerald-600">
                      Recognize is platform agnostic
                    </span>{" "}
                    and can easily be deployed as app in any existing tool, for
                    example Rocket.Chat.
                  </p>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0 flex items-center justify-center">
                <RocketChatLogo />
              </div>
            </div>
          </div>

          <div>
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-1 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    <span className="text-emerald-600">Recognize</span> gives
                    citizens the comfort of using the e-identity provider they
                    already know and allows for them to{" "}
                    <span className="text-emerald-600">
                      keep control over their own data.
                    </span>
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">
                    &ldquo;72% of users want to know how their data is processed
                    when they use social media accounts. 63% of EU citizens want
                    a secure single digital ID for all online services.&rdquo;
                  </p>
                  <p className="mt-16 border-t border-gray-200 pt-4 text-gray-500">
                    Source:{" "}
                    <a
                      href="https://ec.europa.eu/info/strategy/priorities-2019-2024/europe-fit-digital-age/european-digital-identity_en"
                      target="_blank"
                    >
                      Eurobarometer survey
                    </a>
                  </p>
                </div>
              </div>
              <div className="my-12 sm:mt-16 lg:col-start-2 lg:mt-0 flex items-center justify-center">
                <Image
                  src={eurobarometer}
                  className="w-96"
                  alt="Eurobarometer logo"
                />
              </div>
            </div>

            <div>
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
                  <div>
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                      For the tough cases, we provide a video call back
                      solution. By creating a{" "}
                      <span className="text-emerald-600">
                        high secure real-time video meeting,
                      </span>{" "}
                      service providers are able to confirm identity together
                      with the citizen.
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      <span className="text-emerald-600">Recognize</span>{" "}
                      embraces <span className="text-emerald-600">Pexip</span>{" "}
                      as its video partner of choice, because of their secure
                      meeting capabilities.
                    </p>
                  </div>
                </div>
                <div className="my-12 sm:mt-16 lg:col-start-1 lg:mt-0 flex items-center justify-center">
                  <PexipLogo />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-emerald-700">
            <div className="mx-auto max-w-4xl py-16 px-4 sm:px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                <span className="block text-white">Ready to get started?</span>
                <span className="-mb-1 block  text-white bg-clip-text pb-1">
                  Get in touch or create an account.
                </span>
              </h2>
              <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent text-white px-4 py-3 text-base font-medium  shadow-sm bg-emerald-900"
                >
                  Get started
                </a>
                <a
                  href="https://github.com/KilianLievens/recognize#installation-instructions"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-emerald-700 shadow-sm"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between ">
            <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
              &copy; {new Date().getFullYear()} Legends of the Puyenbroeck
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
