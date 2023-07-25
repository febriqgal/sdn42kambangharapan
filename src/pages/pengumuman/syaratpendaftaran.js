/* eslint-disable @next/next/no-img-element */
import "dayjs/locale/id";
import Head from "next/head";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import penulis from "../../../public/penulis.svg";
import Layout from "@/components/layout";

export default function SyaratPendafataran() {
  return (
    <Layout>
      <Toaster />
      <Head>
        <title>Syarat Pendaftaran - SDN 42 Kambang Harapan</title>

        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="mx-0 mb-5 overflow-hidden bg-white rounded-b-xl lg:mx-5 ">
        <div className="relative px-5 py-5 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="absolute top-0 bottom-0 hidden w-screen lg:block bg-gray-50 left-3/4" />
          <div className="mx-auto text-base max-w-prose lg:grid lg:grid-cols-2 lg:gap-8 lg:max-w-none">
            <div className="flex flex-col gap-1 p-4 rounded-lg shadow-xl lg:flex-row lg:gap-0 lg:justify-evenly">
              <div className="flex items-center gap-2">
                <Image src={penulis} width={20} alt={"#"} />
                <h2 className="text-xs">Admin</h2>
              </div>
            </div>
          </div>
          <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="relative lg:row-start-1 lg:col-start-2">
              <svg
                className="absolute top-0 right-0 hidden -mt-20 -mr-20 lg:block"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="de316486-4a29-4312-bdfc-fbce2132a2c1"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)"
                />
              </svg>
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="mx-auto text-base max-w-prose lg:max-w-none">
                <p className="text-xl font-bold text-gray-500">
                  Syarat Pendaftaran
                </p>
              </div>
              <div className="mx-auto mt-5 prose text-gray-500 prose-indigo lg:max-w-none lg:row-start-1 lg:col-start-1">
                <ul class="list-disc ml-5">
                  <h1 className="text-justify">
                    Bebereapa Syarat pendaftaran:
                  </h1>
                  <li>Umur Minimal 7 Tahun</li>
                  <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                  </li>
                  <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                  </li>
                  <li>
                    Now this is a story all about how, my life got
                    flipped-turned upside down
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
