import DashboardBreadCrumbs from "@/components/breadcrumbs/dashboardBreadcrumbs";
import LinksList from "@/components/misc/linksList";

type Props = {
  title: string;
  subtitle: string;
  showBreadcrumbs?: boolean;
  showLinks?: boolean;
  appendPages?: {
    name: string;
    href: string;
  }[];
};

export default function DashboardHeader({
  title,
  subtitle,
  showBreadcrumbs = true,
  showLinks = false,
  appendPages = [],
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      {showBreadcrumbs && <DashboardBreadCrumbs appendPages={appendPages} />}

      <div className="flex flex-col gap-1">
        <h1 className="text-4xl md:text-5xl font-bold text-center lg:text-start text-gradient-primary">{title}</h1>
        <p className="ml-1 text-sm text-center lg:text-start text-muted">{subtitle}</p>
      </div>

      {showLinks && <LinksList />}
    </div>
  );
}
