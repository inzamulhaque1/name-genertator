import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { LoginButton } from "./LoginButton";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="card text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign In</h1>
        <p className="text-slate-500 mb-6">
          Save your generated identities and access them from any device.
        </p>
        <LoginButton />
        <p className="text-xs text-slate-400 mt-4">
          By signing in, you agree to our Terms of Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
