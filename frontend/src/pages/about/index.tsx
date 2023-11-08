import Head from "next/head";
import Link from "next/link";
import { FaCode, FaLinkedin } from "react-icons/fa6";

export default function About() {
  return (
    <>
      <Head>
        <title>About - FundsNav</title>
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

      <div className="hero mt-20 text-primary">
        <div className="hero-content flex-col lg:flex-row gap-20 content-center">
          <FaCode className="w-40 h-40" />

          <div>
            <h1 className="text-5xl font-bold">Made by</h1>

            <p className="py-6">
              <Link
                href="https://www.linkedin.com/in/abdullah-jaswal/"
                className="text-2xl text-sky-400"
                target="_blank"
              >
                <span className="flex flex-row items-center">
                  <FaLinkedin className="w-10 h-10 mr-2" /> Abdullah Abid Jaswal
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
