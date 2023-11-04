import Hero from "@/components/pages/landing/hero";
import Section1 from "@/components/pages/landing/section1";
import { GetServerSidePropsContext } from "next";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

type Props = {
  session: Session | null;
}

export default function Home(props: Props) {
  return (
    <div className="flex flex-col gap-10">
      <Hero session={props.session} />

      <Section1 />
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const session: Session | null = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: session,
    },
  }
}
