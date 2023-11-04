import { APIResponse } from "@/common/types/APIResponse";
import { Fund } from "@/common/types/mutual_funds/mutualFunds";
import DashboardHeader from "@/components/headers/dashboardHeader";
import FundsTable from "@/components/tables/fundsTable";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import getAllFunds from "@/pages/api/mutual-funds/fund/getAllFunds";
import { GetServerSidePropsContext } from "next";
import { Session, getServerSession } from "next-auth";

type Props = {
  funds: APIResponse<Fund>;
  search: string;
  current_page: number;
}

export default function FundLookup(props: Props) {
  return (
    <>
      <DashboardHeader
        title={`Fund Lookup${props.search && `: ${props.search}`}`}
        subtitle="Search for funds and view their details."
        showBreadcrumbs={true}
        showLinks={false}
      />

      <div className="flex flex-col gap-2">
        {props.funds.count > 0 ? (
          <FundsTable funds={props.funds} />
        ) : (
          <div className="text-center text-muted flex h-[20vh]">
            <span className="m-auto">
              No results found.
            </span>
          </div>
        )}
      </div >
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const session: Session | null = await getServerSession(context.req, context.res, authOptions);

  const page = Number(context.query.page) ?? 1
  const search = typeof context.query.search === 'string' ? context.query.search : "";

  const funds = await getAllFunds(session?.access!, search, page, 1000)

  return {
    props: {
      funds: funds,
      search: search,
      current_page: page,
    },
  }
}
