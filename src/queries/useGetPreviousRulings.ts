import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { database } from "@/firebase";
import { ref, onValue } from "firebase/database";

export type PreviousRullingType = {
  id: string;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: {
    negative: number;
    positive: number;
  };
}[];

const fetchFromFirebase = async () => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database, "data");
    onValue(
      dbRef,
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        reject(error);
      }
    );
  }) as Promise<PreviousRullingType>;
};

export const useGetPreviousRullings = (
  options?: Partial<UseQueryOptions<PreviousRullingType>>
) => {
  return useQuery({
    queryKey: ["previousRullings"],
    queryFn: fetchFromFirebase,
    ...options,
  });
};
