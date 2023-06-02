import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";

export default function Layout({children}) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="bg-white-900 flex w-screen h-screen items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn("google")} className="btn-primary">
            Login with Google
          </button>
        </div>
      </main>
    );
  }
  return (
    <div className="bg-indigo-900 min-h-screen flex">
      <Nav />
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        <div className="lg:w-11/12 lg:mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
