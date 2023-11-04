import NewsType from "@/common/types/news/newsType";
import { Merriweather as NewsFont } from "next/font/google";

const newsFont = NewsFont({
  subsets: ["latin"],
  weight: "400",
});

type Props = {
  news: NewsType | null;
  setSelectedNews: (news: NewsType | null) => void;
};

export default function NewsModal({ news, setSelectedNews }: Props) {
  return (
    <dialog id="news_modal" className="modal px-2 md:px-4 modal-bottom">
      <div
        className={`${newsFont.className} modal-box flex flex-col gap-2 bg-base-100 background-glow-low-primary border-t border-x border-base-300`}
      >
        <h3 className="font-extrabold text-xl lg:text-2xl text-primary text-center">{news?.title}</h3>
        <p className="text-muted text-sm text-justify">{news?.description}</p>

        <div className="divider h-0 m-0 py-2" />

        <ul className="list-disc list-outside px-2 md:px-4 text-base-content text-justify font-bold flex flex-col gap-3">
          {news?.points.map((point, index) => {
            return <li key={index}>{point.text}</li>;
          })}
        </ul>
      </div>

      <form method="dialog" className="modal-backdrop backdrop-blur-[1px]">
        <button onClick={() => setSelectedNews(null)}>close</button>
      </form>
    </dialog>
  );
}
