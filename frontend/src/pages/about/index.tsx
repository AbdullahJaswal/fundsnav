import Link from "next/link";
import { FaCode, FaLinkedin } from "react-icons/fa6";

export default function About() {
  return (
    <div className="hero mt-20 text-primary">
      <div className="hero-content flex-col lg:flex-row gap-20 content-center">
        <FaCode className="w-40 h-40" />

        <div>
          <h1 className="text-5xl font-bold">Made by</h1>

          <p className="py-6">
            <Link href="https://www.linkedin.com/in/abdullah-jaswal/" className="text-2xl text-sky-400" target="_blank">
              <span className="flex flex-row items-center">
                <FaLinkedin className="w-10 h-10 mr-2" /> Abdullah Abid Jaswal
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
