import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBarItems, { SidebarItemType } from "@/components/misc/sidebarItems";

function hasPath(item: SidebarItemType, path: string): boolean {
  // Check the item's href first
  if (path === item.href) return true;

  // If the item has subitems, check each one recursively
  if (item.subitems) {
    for (const subitem of item.subitems) {
      if (hasPath(subitem, path)) return true;
    }
  }

  // If we haven't returned by now, the path isn't present
  return false;
}

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <ul className="menu flex flex-col h-full gap-2 p-4 w-80 bg-base-100 border-r border-base-300 lg:border-0 !overflow-auto">
      {SideBarItems.map((item, index) => {
        const ItemIcon = item.icon ? item.icon : () => <></>;
        const item_selected = hasPath(item, pathname);

        if (item.href) {
          return (
            <li key={index}>
              <Link
                href={item.href as string}
                className={`${
                  item_selected && "bg-primary text-primary-content"
                } py-5 font-bold hover:text-primary hover:bg-primary/10`}
              >
                <ItemIcon className={`sidebar-item-icon ${!item_selected && "text-primary"}`} /> {item.name}
              </Link>
            </li>
          );
        } else {
          return (
            <div
              key={index}
              tabIndex={index}
              className={
                item_selected
                  ? "collapse collapse-plus collapse-open bg-primary/20 rounded-lg"
                  : "collapse collapse-plus hover:text-primary hover:bg-primary/10 rounded-lg"
              }
            >
              <input type="checkbox" />

              <div className="collapse-title font-bold">
                <span className="flex flex-row">
                  <ItemIcon className={`sidebar-item-icon mr-2 text-primary`} />
                  <span className="flex items-center mt-1">{item.name}</span>
                </span>
              </div>

              <div className="collapse-content text-xs">
                {item.subitems?.map((subItem, subIndex) => {
                  const SubItemIcon = subItem.icon ? subItem.icon : () => <></>;
                  const sub_item_selected = hasPath(subItem, pathname);

                  return (
                    <li key={subIndex} tabIndex={subIndex}>
                      <Link
                        href={subItem.href as string}
                        className={`${
                          sub_item_selected && "bg-primary !text-primary-content"
                        } font-bold text-base-content hover:!text-primary hover:bg-primary/10`}
                      >
                        <SubItemIcon className={`sidebar-subitem-icon ${!sub_item_selected && "text-primary"}`} />{" "}
                        {subItem.name}
                      </Link>
                    </li>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </ul>
  );
}
