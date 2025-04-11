"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <main className="p-8 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign In</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const email = form.email.value;
          const password = form.password.value;
          await signIn("credentials", { email, password, callbackUrl: "/" });
        }}
        className="flex flex-col gap-4"
      >
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border"
        />
        <button type="submit" className="bg-black text-white p-2">
          Sign In
        </button>
      </form>
    </main>
  );
}
