import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPsychologistsInfo } from "../../redux/psychologists/operations.js";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import css from "./PsychologistList.module.css";

const PsychologistList = () => {
  const dispatch = useDispatch();
  const {
    items: psychologists,
    isLoading,
    lastKey,
  } = useSelector((state) => state.psychologists);

  useEffect(() => {
    dispatch(fetchPsychologistsInfo({ limit: 4 }));
  }, [dispatch]);

  const loadMore = () => {
    if (lastKey) {
      dispatch(fetchPsychologistsInfo({ limit: 3, startKey: lastKey }));
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={css.containerList}>
      <div className={css.filterBar}>
        <button className={css.filterButton}>A to Z</button>
      </div>

      <div className={css.psychologistList}>
        {psychologists?.length > 0 ? (
          psychologists.map((psychologist) => (
            <PsychologistCard
              key={psychologist.id}
              psychologist={psychologist}
            />
          ))
        ) : (
          <p>No psychologists found.</p>
        )}
      </div>

      {lastKey && (
        <button className={css.loadMore} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default PsychologistList;
