import Image from "next/image";

export default function Signup() {
  return (
    <div className="hero min-h-[80vh]">
      <div className="hero-content flex-col lg:flex-row justify-evenly gap-10 lg:gap-40 w-full">
        <figure className="mx-auto max-w-fit background-glow-primary">
          <Image
            src={"/logo.webp"}
            alt="FundsNav Logo"
            width={400}
            height={400}
            quality={50}
            priority={true}
          />
          <h1 className="text-7xl text-primary font-bold text-center mt-6">
            FundsNav
          </h1>
        </figure>

        <div className="card flex-shrink-0 w-full max-w-sm mx-auto border border-base-300">
          <div className="card-title text-center text-secondary mx-auto mt-4">
            Create New Account
          </div>

          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Email <span className="text-accent">*</span>
                </span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Username <span className="text-accent">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
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
                className="input input-bordered"
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
                placeholder="confirm password"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control mt-4 background-glow-secondary">
              <button className="btn btn-outline btn-secondary">Signup</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
