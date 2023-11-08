import Image from "next/image";
import Link from "next/link";
import { SiGoogleanalytics } from "react-icons/si";
import { useState } from "react";
import HeroGraphic from "../../../../public/hero-graphic-colored.svg";
import HeroBackground from "../../../../public/hero-background.svg";
import { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export default function Hero(props: Props) {
  const [buttonPressed, setButtonPressed] = useState<boolean>(false);

  return (
    <div className="min-h-fit lg:h-[80vh]">
      <Image
        alt="Hero Background"
        src={HeroBackground}
        quality={100}
        priority={true}
        fill={true}
        sizes="80vw"
        className="hero-bg-blob"
        style={{
          objectFit: "cover",
          zIndex: -10,
        }}
      />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-center h-full gap-10 lg:gap-12 xl:gap-40">
        <div className="flex flex-col w-full justify-center gap-8 font-semibold">
          <span className="text-4xl md:text-5xl lg:text-6xl text-center lg:text-start font-extrabold capitalize transition delay-200 ease-linear hover:text-primary">
            Your Compass in the Financial Markets.
          </span>

          <h3 className="text-base sm:text-lg md:text-xl text-center lg:text-start">
            Peek into <span className="text-gradient-primary font-bold">Pakistan&apos;s</span> mutual fund scene without
            the jargon.
          </h3>

          <Link
            href={props.session ? "/dashboard/mutual-funds" : "/login"}
            className="btn btn-outline btn-secondary font-bold w-52 mx-auto hover:scale-105 background-glow-secondary"
            onClick={() => setButtonPressed(true)}
          >
            {!buttonPressed ? <SiGoogleanalytics /> : <span className="loading loading-spinner"></span>} Start Analyzing
          </Link>
        </div>

        <div className="w-full background-glow-primary">
          <Image
            src={HeroGraphic}
            alt="Hero Graphic"
            quality={100}
            priority={true}
            className="mx-auto hover:scale-95 transition-transform delay-50 ease-linear border-2 border-primary rounded-full p-1"
          />
        </div>
      </div>
    </div>
  );
}
