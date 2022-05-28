import { useQuery } from "react-query";
import { customAxios } from "../lib/customAxios";
import { MapToiletList } from "../types/map";
import { ToiletList } from "../types/toilet";

const getAllToilets = async () => {
  return customAxios.get(`/toilets`).then((res) => {
    const { toiletList } = res.data;
    const newData = toiletList.map((el: MapToiletList) => {
      return {
        id: el.id,
        title: el.toiletName,
        latlng: { lat: el.latitude, lng: el.longitude },
        roadName: el.roadName,
      };
    });
    return newData;
  });
};

export const useAllToiletsQuery = () =>
  useQuery<ToiletList[]>("allToilets", getAllToilets);
