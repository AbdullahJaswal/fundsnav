import Link from "next/link";

type Props = {
  menuItems: { path: string; label: string }[];
  pathname: string;
  isAuthenticated: boolean;
};

export default function NavbarButtons(props: Props) {
  return (
    <>
      {props.menuItems.map((item, index) => {
        if (index === 0 && !props.isAuthenticated) return null;

        return (
          <li key={item.path}>
            <Link
              className={`nav-btn hover:bg-primary/10 hover:scale-105 ${
                props.pathname.startsWith(item.path) && "!text-primary"
              }`}
              href={item.path}
            >
              <span className="inline-block items-center my-auto">{item.label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
}
