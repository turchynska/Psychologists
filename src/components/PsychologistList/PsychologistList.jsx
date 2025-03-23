import { useEffect, useState } from "react";
import { database } from "../../firebase";
import {
  getDatabase,
  ref,
  get,
  query,
  limitToFirst,
  startAfter,
} from "firebase/database"; 
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import toast from "react-hot-toast";
import css from './PsychologistList.module.css';

const PsychologistList = () => {
    const [psychologists, setPsychologist] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        fetchData();
    }, []);

   const fetchData = async () => {
     setLoading(true);
     const db = getDatabase();
     const psychologistRef = ref(db, "psychologists");

     try {
       const snapshot = await get(psychologistRef);

       if (snapshot.exists()) {
         const data = snapshot.val();
         const formattedData = Object.keys(data).map((key) => ({
           id: key,
           ...data[key],
         }));

         setPsychologist(formattedData);
         setLastKey(Object.keys(data)[Object.keys(data).length - 1]); // Оновлюємо lastKey
         setHasMore(true); // Якщо є більше даних для завантаження
       } else {
         console.log("No data found");
         setHasMore(false);
       }
     } catch (error) {
       console.error("Error fetching data:", error);
     } finally {
       setLoading(false);
     }
   };

  const loadMore = async () => {
    if (!lastKey) return;
    setLoadingMore(true);

    const db = getDatabase();
    const psychologistRef = ref(db, "psychologists");

    try {
      const snapshot = await get(
        query(psychologistRef, startAfter(lastKey), limitToFirst(3))
      );

      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setPsychologist((prev) => [...prev, ...formattedData]);
        setLastKey(Object.keys(data)[Object.keys(data).length - 1]); // Оновлюємо lastKey
        setHasMore(Object.keys(data).length === 3);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      toast.error(`Error fetching data: ${error.message}`);
    } finally {
      setLoadingMore(false);
    }
  };

    if (loading) {
        return <p>Loading...</p>
    }

    return (
      <div className={css.containerList}>
        <div className={css.filterBar}>
          <button className={css.filterButton}>A to Z</button>
        </div>

        <div className={css.psychologistList}>
          {psychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
            />
          ))}
        </div>

        {hasMore && (
          <button
            className={css.loadMore}
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    );
}

export default PsychologistList