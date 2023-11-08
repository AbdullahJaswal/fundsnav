import Image from "next/image";
import Link from "next/link";
import { ClientSafeProvider, LiteralUnion, getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa6";
import { BuiltInProviderType } from "next-auth/providers/index";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

type Props = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | never[];
};

const PROVIDER_ASSETS: any = {
  Google: {
    icon: FaGoogle,
    color: "#DB4437",
    textColor: "text-[#DB4437]",
    borderColor: "border-[#DB4437]",
  },
  Facebook: {
    icon: FaFacebook,
    color: "#4267B2",
    textColor: "text-[#4267B2]",
    borderColor: "border-[#4267B2]",
  },
};

export default function Login({ providers }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [respData, setRespData] = useState<any>(null);

  const email = useRef("");
  const password = useRef("");

  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row justify-evenly gap-10 lg:gap-40 w-full">
        <figure className="mx-auto max-w-fit background-glow-primary">
          <Image src={"/logo.webp"} alt="FundsNav Logo" width={400} height={400} quality={50} priority={true} />
          <h1 className="text-7xl text-primary font-bold text-center mt-6">FundsNav</h1>
        </figure>

        <div className="card flex-shrink-0 w-full max-w-sm mx-auto border border-base-300">
          <div className="card-title text-center text-primary mx-auto mt-4">Login</div>

          <div className="card-body">
            <div className="flex flex-col gap-4">
              {Object.values(providers).map((provider) => {
                if (["Google", "Facebook"].includes(provider.name)) {
                  const color = PROVIDER_ASSETS[provider.name].textColor;
                  const borderColor = PROVIDER_ASSETS[provider.name].borderColor;
                  const Icon = PROVIDER_ASSETS[provider.name].icon;

                  return (
                    <div key={provider.name}>
                      <button
                        onClick={() => signIn(provider.id, { redirect: false })}
                        className={`btn btn-outline btn-block ${borderColor} font-extrabold flex items-center justify-between p-3 border-2`}
                      >
                        <Icon className={`mr-2 ${color}`} />
                        <span className="font-bold text-xxs sm:text-xs md:text-sm">Continue with {provider.name}</span>
                      </button>
                    </div>
                  );
                }
              })}
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                setLoading(true);

                await signIn("credentials", {
                  email: email.current,
                  password: password.current,
                  redirect: false,
                }).then((res) => {
                  if (res?.ok) {
                    router.push("/dashboard/mutual-funds");
                  } else {
                    setRespData(res?.error);
                  }
                });

                setLoading(false);
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Email <span className="text-accent">*</span>
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className={`input input-bordered lowercase ${respData ? "input-error" : ""}`}
                  onChange={(e) => (email.current = e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Password <span className="text-accent">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className={`input input-bordered ${respData ? "input-error" : ""}`}
                  onChange={(e) => (password.current = e.target.value)}
                  autoComplete="current-password"
                  required
                />
                {/* <label className="label">
                  <Link href={"/forgot-password"} className="label-text-alt link link-hover text-secondary">
                    Forgot password?
                  </Link>
                </label> */}

                {respData ? (
                  <label className="label">
                    <span className="label-text text-error">Email or Password is incorrect</span>
                  </label>
                ) : null}
              </div>

              <div className="form-control mt-4 background-glow-primary">
                <button type="submit" className="btn btn-outline btn-primary">
                  {loading && <span className="loading loading-spinner"></span>}
                  Login
                </button>
              </div>
            </form>

            <div className="form-control mt-2 background-glow-secondary">
              <Link href={"/signup"} className="btn btn-outline btn-secondary">
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
