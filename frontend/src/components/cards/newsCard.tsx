import NewsType from "@/common/types/news/newsType";

type Props = {
  news: NewsType[];
  setSelectedNews: (news: NewsType) => void;
};

export default function NewsCard({ news, setSelectedNews }: Props) {
  return (
    <div className="card card-compact card-side min-h-[28rem] border bg-base-200/25 border-base-300 rounded-lg">
      <div className="card-body w-full">
        <h2 className="card-title font-bold text-gradient-primary flex flex-col md:flex-row w-full">
          <span className="w-full">Latest Market News</span>
          <span className="md:text-end text-xs text-muted w-full">last updated 4h ago</span>
        </h2>

        <div className="flex flex-col gap-2">
          {news.map((item, index) => {
            return (
              <div key={index} tabIndex={index} className="collapse collapse-plus design-temp-2">
                <input type="checkbox" className="peer" />

                <div className="collapse-title font-bold flex items-center">{item.title}</div>

                <div className="collapse-content text-muted flex flex-col gap-2">
                  <p>{item.description}</p>

                  <div className="flex justify-end">
                    <span
                      className="text-end link-primary hover:link hover:cursor-pointer"
                      onClick={() => {
                        const dialog: any = document.getElementById("news_modal");

                        if (dialog) {
                          setSelectedNews(item);
                          dialog.showModal();
                        }
                      }}
                    >
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
