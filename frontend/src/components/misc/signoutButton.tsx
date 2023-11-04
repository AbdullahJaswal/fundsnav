import { TbLogout } from "react-icons/tb";

export default function SignOutButton() {
  return (
    <button
      className="btn btn-outline btn-sm btn-accent font-bold text-sm hover:scale-105"
      onClick={async (e) => {
        e.preventDefault();

        const modal: any = document.getElementById("logout_modal");

        if (modal) {
          await modal.showModal();
        }
      }}
    >
      <TbLogout className="w-5 h-5" />
    </button>
  );
}
