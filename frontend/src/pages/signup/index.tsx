import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import classNames from "classnames";
import Link from "next/link";
import Head from "next/head";

const createUserRegistration = (url: string, { arg }: any) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: arg.first_name,
      last_name: arg.last_name,
      phone_number: arg.phone_number,
      email: arg.email,
      password: arg.password,
      confirmPassword: arg.confirmPassword,
    }),
  });

export default function Signup() {
  const toggleModal = useRef<any>(false);

  const { data, trigger, isMutating, error }: any = useSWRMutation("/api/auth/signup", createUserRegistration, {
    revalidate: false,
  });

  useEffect(() => {
    if (data?.ok === true) {
      toggleModal.current.className = "modal modal-open";
    }
  }, [data]);

  const [respData, setRespData] = useState<any>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await trigger({
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    })
      .then((resp: any) => {
        return resp.json();
      })
      .then((data: any) => {
        setRespData(data);
      });
  };

  return (
    <>
      <Head>
        <title>Signup - FundsNav</title>
        <meta
          name="description"
          content="FundsNav is a platform that helps you track your mutual fund investments and provides you with insights to help you make better investment decisions."
        />
        <meta
          name="keywords"
          content="mutual funds, mutual fund, mutual fund investments, mutual fund investment, mutual fund returns, mutual fund investment returns, mutual fund investment returns calculator, mutual fund investment returns calculator india, mutual fund investment returns calculator excel, mutual fund investment returns calculator excel india, mutual fund investment returns calculator excel sheet, mutual fund investment returns calculator excel sheet india, mutual fund investment returns calculator excel sheet download, mutual fund investment returns calculator excel sheet free download, mutual fund investment returns calculator excel sheet with sip, mutual fund investment returns calculator excel sheet with sip india, mutual fund investment returns calculator excel sheet with sip download, mutual fund investment returns calculator excel sheet with sip free download"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero min-h-[80vh]">
        <div className="hero-content flex-col lg:flex-row justify-evenly gap-10 lg:gap-40 w-full">
          <figure className="mx-auto max-w-fit background-glow-primary">
            <Image src={"/logo.webp"} alt="FundsNav Logo" width={400} height={400} quality={50} priority={true} />
            <h1 className="text-7xl text-primary font-bold text-center mt-6">FundsNav</h1>
          </figure>

          <div className="card flex-shrink-0 w-full max-w-sm mx-auto border border-base-300">
            <div className="card-title text-center text-secondary mx-auto mt-4">Create New Account</div>

            <div className="card-body">
              <form
                method="post"
                action="/login"
                onSubmit={async (e) => {
                  await handleSubmit(e);
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
                    placeholder="Email"
                    className={classNames("input", "input-bordered", "lowercase", {
                      "input-error": respData?.email,
                    })}
                    id="email"
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  {respData?.email ? (
                    <label className="label">
                      <span className="label-text text-error">{respData.email[0]}</span>
                    </label>
                  ) : null}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Password <span className="text-accent">*</span>
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className={classNames("input", "input-bordered", {
                      "input-error": respData?.non_field_errors,
                    })}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Confirm Password <span className="text-accent">*</span>
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    className={classNames("input", "input-bordered", {
                      "input-error": respData?.non_field_errors,
                    })}
                    onChange={(e) => handleInputChange(e)}
                    required
                  />
                  {respData?.non_field_errors ? (
                    <label className="label">
                      <span className="label-text text-error">{respData.non_field_errors[0]}</span>
                    </label>
                  ) : null}
                </div>

                <div className="form-control mt-4 background-glow-secondary">
                  <button
                    type="submit"
                    disabled={!email || !password || !confirmPassword}
                    className="btn btn-outline btn-secondary"
                  >
                    {isMutating && <span className="loading loading-spinner"></span>}
                    Signup
                  </button>
                </div>
              </form>

              <div className="divider mb-1">OR</div>

              <div>
                <span>Already have an account? </span>
                <Link href="/login" className="link link-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Successful Signup Modal*/}
      <div className="modal" id="success-signup" ref={toggleModal}>
        <div className="modal-box border border-primary background-glow-low-primary">
          <h3 className="font-bold text-lg">Congratulations on Your Successful Registration!</h3>
          <div className="modal-action">
            <Link className="btn btn-primary" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
