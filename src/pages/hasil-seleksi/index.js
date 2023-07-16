import Layout from "@/components/layout";
import Head from "next/head";
export default function HasilSeleksi() {
  return (
    <Layout>
      <Head>
        <title>Hasil Seleksi - SDN 42 Kambang Harapan</title>
      </Head>
      <div className="min-h-screen mx-5 mb-5 ">
        <table className="w-full text-sm bg-white divide-y-2 divide-gray-200 ">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-900 text-start">
                Nama
              </th>
              <th className="px-4 py-2 font-medium text-gray-900 text-start">
                Alamat
              </th>
              <th className="px-4 py-2 font-medium text-gray-900 text-start">
                Keterangan
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 font-medium text-gray-900 text-start">
                John Doe
              </td>
              <td className="px-4 py-2 text-gray-700 text-start">24/05/1995</td>
              <td className="px-4 py-2 text-gray-700 text-start">
                Web Developer
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium text-gray-900 text-start">
                Jane Doe
              </td>
              <td className="px-4 py-2 text-gray-700 text-start">04/11/1980</td>
              <td className="px-4 py-2 text-gray-700 text-start">
                Web Designer
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium text-gray-900 text-start">
                Gary Barlow
              </td>
              <td className="px-4 py-2 text-gray-700 text-start">24/05/1995</td>
              <td className="px-4 py-2 text-gray-700 text-start">Singer</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
