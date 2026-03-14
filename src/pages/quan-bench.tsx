import QuanBench from "@/components/QuanBench";
import { Seo } from "@/seo/Seo";

const QuanBenchPage = () => {
  return (
    <>
      <Seo
        title="Quan Bench — Intelligence Observatory | QuanSynd"
        description="QuanSynd's proprietary AI model intelligence index. We benchmark leading models across reasoning, accuracy, creativity and more."
        canonicalPath="/quan-bench"
        ogType="website"
      />
      <QuanBench />
    </>
  );
};

export default QuanBenchPage;
