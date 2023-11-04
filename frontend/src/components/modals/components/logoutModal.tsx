import { useState } from "react";
import { signOut } from "next-auth/react";
import { TbLogout } from "react-icons/tb";

export default function LogoutModal() {
  const [loading, setLoading] = useState(false);

  return (
    <dialog id="logout_modal" className="modal">
      <div className="modal-box border border-accent background-glow-accent">
        <h3 className="font-bold text-lg">Are you sure you want to sign out?</h3>

        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn btn-outline btn-accent"
              onClick={async (e) => {
                e.preventDefault();

                setLoading(true);
                await signOut();
                setLoading(false);
              }}
            >
              {loading ? <span className="loading loading-spinner"></span> : <TbLogout className="w-5 h-5" />} Logout
            </button>
          </form>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
