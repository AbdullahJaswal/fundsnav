import SideBarItems from "@/components/misc/sidebarItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinksList() {
  const pathname = usePathname();

  return (
    <ul className="list list-disc list-inside flex flex-col gap-2 font-bold">
      {SideBarItems.map((item, index) => {
        return (
          <>
            {item.subitems?.map((subitem, subindex) => {
              if (subitem.href?.startsWith(pathname)) {
                return (
                  <li key={`si-${index}-${subindex}`}>
                    <Link href={subitem.href as string} className="link">
                      {subitem.name}
                    </Link>
                  </li>
                );
              }
            })}
          </>
        );
      })}
    </ul>
  );
}
