import { useNewsModalStore } from "@/lib/store";
import NewsModal from "./components/newsModal";

export default function DashboardModals() {
  const { selectedNews, setSelectedNews } = useNewsModalStore();

  return (
    <>
      <NewsModal news={selectedNews} setSelectedNews={setSelectedNews} />
    </>
  );
}
