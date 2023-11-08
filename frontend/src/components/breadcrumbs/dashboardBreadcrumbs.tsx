import Link from "next/link";
import SideBarItems, { SidebarItemType } from "@/components/misc/sidebarItems";
import { usePathname } from "next/navigation";

function findItemsByPath(path: string, items: SidebarItemType[]): SidebarItemType[] {
  for (const item of items) {
    if (path.includes(item.href as string)) {
      return [{ name: item.name, href: item.href }];
    }
  }

  return [];
}

type Props = {
  appendPages: {
    name: string;
    href: string;
  }[];
};

export default function DashboardBreadCrumbs(props: Props) {
  const pathname = usePathname();

  const pathItemsHierarchy = findItemsByPath(pathname, SideBarItems);

  return (
    <div className="text-sm breadcrumbs font-bold">
      <ul>
        <li>
          <Link href={"/"} className={`${pathname === "/" && "text-gradient-primary"}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href={"/dashboard"} className={`${pathname === "/dashboard" && "text-gradient-primary"}`}>
            Dashboard
          </Link>
        </li>
        {pathItemsHierarchy.map((item, index) => (
          <li key={index}>
            <Link href={item.href as string} className={`${pathname === item.href && "text-gradient-primary"}`}>
              {item.name}
            </Link>
          </li>
        ))}
        {props.appendPages.map((item, index) => (
          <li key={`ap-${index}`}>
            <Link href={item.href as string} className={`${pathname === item.href && "text-gradient-primary"}`}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
