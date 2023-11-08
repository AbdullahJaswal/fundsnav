import StocksIcon from "@/components/icons/StocksIcon";
import MutualFundsIcon from "@/components/icons/MutualFundsIcon";
import PortfolioIcon from "@/components/icons/PortfolioIcon";
import { useState } from "react";

const MenuOptions = {
  /* 1: {
    graphic: <StocksIcon className="fill-primary w-full" />,
    menu_graphic: <StocksIcon className="fill-primary w-6 mr-1" />,
    title: "Daily Stock Trends",
    menu_title: "Stock Trends",
    descrition:
      "Stay updated with the latest market movements. Capture the pulse of the stock market and identify potential opportunities.",
    button_text: "Explore Trends",
    btn_color: "btn-primary",
    bg_glow: "background-glow-primary",
  }, */
  2: {
    graphic: <MutualFundsIcon className="fill-secondary w-full" />,
    menu_graphic: <MutualFundsIcon className="fill-secondary w-6 mr-1" />,
    title: "Mutual Funds Analyzer",
    menu_title: "Fund Analyzer",
    descrition: "Gain insights into mutual fund performances. Compare, analyze, and make decisions with clarity.",
    button_text: "Analyze Now",
    btn_color: "btn-secondary",
    bg_glow: "background-glow-secondary",
  },
  /* 3: {
    graphic: <PortfolioIcon className="fill-accent w-full" />,
    menu_graphic: <PortfolioIcon className="fill-accent w-6 mr-1" />,
    title: "Custom Portfolio Tracker",
    menu_title: "Portfolio Tracker",
    descrition: "Monitor all your investments in one place. Track performance, set alerts, and manage seamlessly.",
    button_text: "Start Tracking",
    btn_color: "btn-accent",
    bg_glow: "background-glow-accent",
  }, */
};

export default function Section1() {
  // const [selectedOption, setSelectedOption] = useState<1 | 2 | 3>(1);
  const [selectedOption, setSelectedOption] = useState<2>(2);

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">Tailored Tools for Informed Choices</h1>
        <p className="text-center text-muted mx-auto text-sm lg:text-base sm:w-3/4 md:w-2/3">
          Equip yourself with our range of analysis tools. From daily trends in stocks to mutual fund performance, we
          offer a comprehensive view to help you make strategic decisions.
        </p>
      </div>

      {/* <div className="mx-auto">
        <ul className="menu border border-base-300 menu-horizontal rounded-box">
          <li>
            <a
              className={`${selectedOption === 1 && "active !bg-primary/20"} hover:bg-primary/10`}
              onClick={() => setSelectedOption(1)}
            >
              {MenuOptions[1].menu_graphic}
              <span className="hidden sm:flex">{MenuOptions[1].menu_title}</span>
            </a>
          </li>

          <div className="divider divider-horizontal h-8 my-auto m-0" />

          <li>
            <a
              className={`${selectedOption === 2 && "active !bg-secondary/20"} hover:bg-secondary/10`}
              onClick={() => setSelectedOption(2)}
            >
              {MenuOptions[2].menu_graphic}
              <span className="hidden sm:flex">{MenuOptions[2].menu_title}</span>
            </a>
          </li>

          <div className="divider divider-horizontal h-8 my-auto m-0" />

          <li>
            <a
              className={`${selectedOption === 3 && "active !bg-accent/20"} hover:bg-accent/10`}
              onClick={() => setSelectedOption(3)}
            >
              {MenuOptions[3].menu_graphic}
              <span className="hidden sm:flex">{MenuOptions[3].menu_title}</span>
            </a>
          </li>
        </ul>
      </div> */}

      <div className="card sm:card-side standard-card gap-6 mx-2 md:mx-10 p-10 md:p-20">
        <figure className={`basis-1/2 mx-auto max-w-fit ${MenuOptions[selectedOption].bg_glow}`}>
          {MenuOptions[selectedOption].graphic}
        </figure>

        <div className="card-body basis-1/2 p-2 gap-2">
          <h2 className="card-title text-xl md:text-2xl lg:text-4xl font-bold mx-auto sm:mx-0">
            {MenuOptions[selectedOption].title}
          </h2>
          <p className="text-sm md:text-base text-center sm:text-start">{MenuOptions[selectedOption].descrition}</p>

          <div className="card-actions justify-end mt-2 mx-auto sm:mx-0">
            {/* <button
              className={`btn btn-outline w-56 ${MenuOptions[selectedOption].btn_color} ${MenuOptions[selectedOption].bg_glow}`}
            >
              {MenuOptions[selectedOption].button_text}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
