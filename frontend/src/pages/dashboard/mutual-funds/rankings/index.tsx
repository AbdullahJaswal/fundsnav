import DashboardHeader from "@/components/headers/dashboardHeader";

export default function FundRankings() {
  return (
    <>
      <DashboardHeader
        title={`Fund Rankings`}
        subtitle="View and analyze the top performing funds."
        showBreadcrumbs={true}
        showLinks={false}
      />
    </>
  )
}
