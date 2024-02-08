import { Layout } from "./Layout";
import { useEffect } from "react";
import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { ARCHIVED_NOTES } from "./noteActionTypes";
import { getCall } from "./resuableFunctions";

export const ArchivePage = () => {
  const { state, dispatch } = useNote();

  useEffect(async () => {
    const data = await getCall("/api/archives");
    dispatch({ type: ARCHIVED_NOTES, payload: data.archives });
  }, []);

  const searchNoteFunction = (data, meter) => {
    if (meter && meter.length > 0) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(meter.toLowerCase())
      );
    } else {
      return data;
    }
  };
  const filteredArchive = searchNoteFunction(state.archive, state.searchQuery);
  return (
    <Layout>
      <div className="archive-page-body">
        <h2>Archived notes</h2>
        {filteredArchive &&
          filteredArchive.map((item) => {
            return <NoteCard type="archived" item={item} key={item._id} />;
          })}
      </div>
    </Layout>
  );
};
