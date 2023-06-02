import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Inter } from "next/font/google";

import Layout from "@/components/Layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="flex items-center">
        <h2 className="mr-4">
          Hello, <strong>{session?.user?.name}</strong>
        </h2>
        <div>
          <img className="rounded-full" src={session?.user?.image} width={30} height={30} alt={session?.user?.name} />
        </div>
        <button className="btn-primary ml-4" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    </Layout>
  );
}
