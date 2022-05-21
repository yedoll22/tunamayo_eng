import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DrawerHeader from "../components/DrawerHeader";
import Report from "../components/Report";
import { customAxios } from "../lib/customAxios";

interface IReport {
  id: number;
  reportTitle: string;
  reportContent: string;
  reportType: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
}

interface User {
  createdAt: string;
  email: string;
  nickname: string;
  oAuthProvider: string;
  oAuthProviderId: string;
  updatedAt: string;
}

const ReportList = () => {
  const location = useLocation();
  const queryString: string = location.search;
  const reportType: string = queryString.split("=")[1];
  const [reportList, setReportList] = useState<IReport[]>([]);
  const [renderList, setRenderList] = useState<IReport[]>([]);
  const [renderIndex, setRenderIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(Math.floor(renderIndex / 5));
  }, [renderIndex]);

  const reportListRequest = async () => {
    const request = await customAxios.get("/reports");
    const list = request.data.reportList;
    const reports = list.filter(
      (report: IReport) => report.reportType === reportType
    );
    setReportList(reports);
    setRenderList(reports.slice(0, 7));
  };

  const updateRenderList = (index: number) => {
    setRenderList(reportList.slice(index * 7, index * 7 + 7));
  };
  const indexClass = (index: number) => {
    if (index === renderIndex)
      return "cursor-pointer pt-2 pb-[9px] px-[10px] text-base font-normal leading-[26px] text-tnBlack";
    else
      return "cursor-pointer pt-2 pb-[9px] px-[10px] text-base font-normal leading-[26px] text-gray20";
  };

  const nextPageIconAction = () => {
    if (renderIndex === Math.ceil(reportList.length / 7) - 1) return;
    else {
      setRenderIndex(renderIndex + 1);
      updateRenderList(renderIndex + 1);
    }
    console.log("renderIndex : ", renderIndex);
  };

  const prevPageIconAction = () => {
    if (renderIndex === 0) return;
    else {
      updateRenderList(renderIndex - 1);
      setRenderIndex(renderIndex - 1);
    }
  };

  useEffect(() => {
    reportListRequest();
  }, []);

  return (
    <>
      <DrawerHeader
        title={reportType === "report" ? "제보리스트" : "문의리스트"}
        isAdmin={true}
      />

      <div className="min-h-[600px]">
        {renderList.map((report: IReport) => {
          return <Report key={report.id} report={report} />;
        })}
      </div>
      <div className="px-20 py-[17px] flex justify-center items-center h-full">
        <img
          className="w-6 h-6 cursor-pointer"
          onClick={prevPageIconAction}
          src={
            renderIndex === 0
              ? "/images/report/prev-icon-gray.svg"
              : "/images/report/prev-icon-black.svg"
          }
          alt="prev"
        />

        <div className="flex">
          {reportList.map((_, i) => {
            if (
              i >= pageIndex * 5 &&
              i <= pageIndex * 5 + 4 &&
              i * 7 <= reportList.length
            ) {
              return (
                <div
                  key={i}
                  onClick={() => {
                    updateRenderList(i);
                    setRenderIndex(i);
                  }}
                  className={indexClass(i)}
                >
                  {i + 1}
                </div>
              );
            }
          })}
        </div>
        <img
          className="w-6 h-6 cursor-pointer"
          onClick={nextPageIconAction}
          src={
            renderIndex === Math.ceil(reportList.length / 7) - 1
              ? "/images/report/next-icon-gray.svg"
              : "/images/report/next-icon-black.svg"
          }
          alt="next"
        />
      </div>
    </>
  );
};

export default ReportList;
