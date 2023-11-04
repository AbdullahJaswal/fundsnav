import * as React from "react";
import { SVGProps } from "react";

const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" {...props}>
    <defs>
      <clipPath id="a">
        <path d="M341 131h12v238.578h-12Zm0 0" />
      </clipPath>
      <clipPath id="b">
        <path d="M184 205h11v164.578h-11Zm0 0" />
      </clipPath>
      <clipPath id="c">
        <path d="M20 270h11v99.578H20Zm0 0" />
      </clipPath>
      <clipPath id="d">
        <path d="M15.504 5.078h344.25V364H15.504Zm0 0" />
      </clipPath>
      <clipPath id="e">
        <path d="M320 5.078h39V43h-39Zm0 0" />
      </clipPath>
    </defs>
    <g clipPath="url(#a)">
      <path
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M63.6 25.5v44.9"
        transform="matrix(5.18627 0 0 5.17756 17 5.079)"
      />
    </g>
    <g clipPath="url(#b)">
      <path
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M33.3 70.4V39.7"
        transform="matrix(5.18627 0 0 5.17756 17 5.079)"
      />
    </g>
    <g clipPath="url(#c)">
      <path
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M1.6 70.4V52.2"
        transform="matrix(5.18627 0 0 5.17756 17 5.079)"
      />
    </g>
    <g clipPath="url(#d)">
      <path
        fill="none"
        stroke="#000"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="m.7 40.9 20.4-20.3 12.1 12L62.7 3.1"
        transform="matrix(5.18627 0 0 5.17756 17 5.079)"
      />
    </g>
    <g clipPath="url(#e)">
      <path d="m320.914 5.078 37.344 37.277V5.078Zm0 0" />
    </g>
  </svg>
);

export default LogoIcon;
