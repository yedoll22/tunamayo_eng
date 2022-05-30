import { useMutation, useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";
// useQuery(쿼리고유키값, axios함수)
const getAllReports = () => {
  return customAxios.get("/reports");
};

export const useAllReportsQuery = () =>
  useQuery("allReports", getAllReports, {
    select: (res) => {
      return res.data.reportList;
    },
  });
