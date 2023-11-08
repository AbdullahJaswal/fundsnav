import Link from "next/link";
import { usePathname } from "next/navigation";
import SideBarItems, { SidebarItemType } from "@/components/misc/sidebarItems";
import { useState } from "react";

const renderIcon = (icon: () => JSX.Element, classStyle: string) => {
  const Icon = icon as any;

  return <Icon className={classStyle} />;
};

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [sideBarSubItems, setSideBarSubItems] = useState<{
    title: string;
    icon: () => JSX.Element;
    subItems: SidebarItemType[];
  }>({
    title: "",
    icon: () => <></>,
    subItems: [],
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    index: -1,
    open: false,
  });

  return (
    <div className="flex flex-row min-h-full">
      <ul className="menu flex flex-col gap-2 w-24 bg-base-100 border-r border-base-300 lg:border-0 !overflow-auto">
        {SideBarItems.map((item, index) => {
          if (item.href) {
            const ItemIcon = item.icon ? item.icon : () => <></>;
            const is_item_selected = pathname.includes(item.href);
            const is_item_open = isSidebarOpen.open && isSidebarOpen.index === index;

            let selected_class = "";

            if (is_item_selected) {
              selected_class = "!text-primary bg-primary/20";
            } else if (is_item_open) {
              selected_class = "bg-primary/10";
            }

            if (item.subitems) {
              return (
                <li key={index}>
                  <div
                    onClick={() => {
                      if (!isSidebarOpen.open) {
                        setIsSidebarOpen({
                          index: index,
                          open: !isSidebarOpen.open,
                        });
                        setSideBarSubItems({
                          title: item.name,
                          icon: item.icon,
                          subItems: item.subitems ?? [],
                        });
                      } else {
                        if (isSidebarOpen.index === index) {
                          setIsSidebarOpen({
                            index: -1,
                            open: !isSidebarOpen.open,
                          });
                          setSideBarSubItems({
                            title: "",
                            icon: () => <></>,
                            subItems: [],
                          });
                        } else {
                          setIsSidebarOpen({
                            index: index,
                            open: isSidebarOpen.open,
                          });
                          setSideBarSubItems({
                            title: item.name,
                            icon: item.icon,
                            subItems: item.subitems ?? [],
                          });
                        }
                      }
                    }}
                    className={`${selected_class} flex flex-col hover:bg-primary/10 text-muted`}
                  >
                    <ItemIcon className="sidebar-item-icon" />

                    <span className="text-[0.5rem] font-bold text-center underline leading-3">{item.name}</span>
                  </div>
                </li>
              );
            }

            return (
              <li key={index}>
                <Link
                  href={item.href as string}
                  className={`${
                    is_item_selected && "!text-primary bg-primary/20"
                  } flex flex-col hover:bg-primary/10 text-muted`}
                >
                  <ItemIcon className="sidebar-item-icon" />

                  <span className="text-[0.5rem] font-bold text-center leading-3">{item.name}</span>
                </Link>
              </li>
            );
          }
        })}
      </ul>

      {isSidebarOpen.open && sideBarSubItems.subItems.length > 0 && (
        <ul className="menu flex flex-col gap-2 w-64 bg-base-100 border-x border-base-300 lg:border-r-0 !overflow-auto">
          <span className="flex flex-row justify-center gap-2 p-1 text-base font-bold text-primary text-center">
            {renderIcon(sideBarSubItems.icon, "sidebar-subitem-icon")}
            {sideBarSubItems.title}
          </span>

          <div className="divider !my-0 !h-0" />

          {sideBarSubItems.subItems.map((item, index) => {
            const ItemIcon = item.icon ? item.icon : () => <></>;
            const is_item_selected = pathname.includes(item.href);

            return (
              <li key={index}>
                <Link
                  href={item.href as string}
                  className={`${
                    is_item_selected && "!text-primary bg-primary/20"
                  } text-xs text-muted hover:bg-primary/10`}
                >
                  <ItemIcon className={`sidebar-subitem-icon ${!is_item_selected && "text-primary"}`} /> {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
