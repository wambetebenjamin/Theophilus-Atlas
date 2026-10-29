import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Light sign in for the saved shelf. No password store, no profile, no
 * analytics. The session only carries an email label so the saved list can be
 * titled per session.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret:
    process.env.AUTH_SECRET ??
    "theophilus-atlas-development-secret-replace-in-environment",
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  pages: { signIn: "/sign-in" },
  providers: [
    Credentials({
      name: "Light sign in",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
      },
      authorize: async (credentials) => {
        const email = String(credentials?.email ?? "")
          .normalize("NFKC")
          .trim()
          .toLowerCase()
          .slice(0, 160);
        if (!emailPattern.test(email)) return null;
        const typedName = String(credentials?.name ?? "").trim().slice(0, 80);
        const name = typedName || email.split("@")[0];
        return { id: email, email, name };
      },
    }),
  ],
});
