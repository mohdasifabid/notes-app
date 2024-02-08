import "./NoteCard.css";
import { useState } from "react";
import { useNote } from "../useNote";
import { deleteCall, postCall } from "./resuableFunctions";
import {
  ARCHIVED_NOTES,
  GET_NOTES,
  GET_TRASH,
  PINNED_NOTES,
} from "./noteActionTypes";

export const NoteCard = ({ item, type }) => {
  const { state, dispatch } = useNote();
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const [updatedNote, setUpdatedNote] = useState(item.note);
  const [updatedBgColor, setUpdatedBgColor] = useState(item.bgColor);
  const [updatedLabel, setUpdatedLabel] = useState(item.tag);

  const moveToTrashHandler = async (id) => {
    const trashData = await postCall(`/api/notes/trash/${id}`, {});
    dispatch({ type: GET_TRASH, payload: trashData.trash });
    dispatch({ type: GET_NOTES, payload: trashData.notes });
  };
  const archiveNoteHandler = async (item) => {
    const data = await postCall(`/api/notes/archives/${item._id}`, {
      item,
    });
    dispatch({ type: ARCHIVED_NOTES, payload: data.archives });
    dispatch({ type: GET_NOTES, payload: data.notes });
  };
  const deleteFromArchiveHandler = async (id) => {
    const data = await deleteCall(`/api/archives/delete/${item._id}`);
    dispatch({ type: ARCHIVED_NOTES, payload: data.archives });
  };

  const updateNoteHandler = async (notesId) => {
    const data = await postCall(`/api/notes/${notesId}`, {
      note: {
        ...item,
        title: updatedTitle,
        note: updatedNote,
        tag: updatedLabel,
        bgColor: updatedBgColor,
      },
    });
    dispatch({ type: GET_NOTES, payload: data.notes });
  };

  const inArchive = state.archive.some((note) => note._id === item._id);

  const restoreArchivedNoteHandler = async (id) => {
    const data = await postCall(`/api/archives/restore/${id}`, {});
    dispatch({ type: ARCHIVED_NOTES, payload: data.archives });
    dispatch({ type: GET_NOTES, payload: data.notes });
  };

  const inTrash = state.trash.some((note) => note._id === item._id);
  const restoreFromTrashHandler = async (id) => {
    const data = await postCall(`/api/trash/restore/${id}`, {});
    dispatch({ type: GET_TRASH, payload: data.trash });
    dispatch({ type: GET_NOTES, payload: data.notes });
  };

  const deleteFromTrashHandler = async (id) => {
    const data = await deleteCall(`/api/trash/delete/${id}`);
    dispatch({ type: GET_TRASH, payload: data.trash });
  };

  const addToPinnedHandler = (item) => {
    dispatch({ type: PINNED_NOTES, payload: item });
  };
  const isPinned = state.pinned.some((note) => note._id === item._id);


  const deleteFromPinnedHandler = (item) => {
    let index = state.pinned.findIndex((note) => note._id === item._id);
    state.pinned.splice(index, 1);
    dispatch({ type: PINNED_NOTES, payload: state.pinned });
  };
  return (
    <div
      className="note-card-container"
      style={{ backgroundColor: updatedBgColor }}
    >
      <div className="note-card-inputs-container">
        <input
          style={{ backgroundColor: updatedBgColor }}
          className="note-card-items"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          onBlur={() => {
            updateNoteHandler(item._id);
          }}
        />
        <input
          style={{ backgroundColor: updatedBgColor }}
          className="note-card-items"
          value={updatedNote}
          onChange={(e) => setUpdatedNote(e.target.value)}
          onBlur={() => updateNoteHandler(item._id)}
        />
        <input
          style={{ backgroundColor: updatedBgColor }}
          className="note-card-items"
          value={updatedLabel}
          onChange={(e) => setUpdatedLabel(e.target.value)}
          onBlur={() => updateNoteHandler(item._id)}
        />
      </div>

      <div className="note-card-bottom">
        <p className="bottom-left-side">
          {new Date(item.createdAt).getHours()}:
          {new Date(item.createdAt).getMinutes()}
        </p>
        <div className="bottom-right-side">
          <input
            className="bottom-right-side-color-input"
            value={updatedBgColor}
            type="color"
            onChange={(e) => setUpdatedBgColor(e.target.value)}
            onBlur={() => {
              updateNoteHandler(item._id);
            }}
          />

          {inArchive ? (
            <i
              className="note-card-icons fa-solid fa-box-archive"
              onClick={() => {
                restoreArchivedNoteHandler(item._id);
              }}
            ></i>
          ) : (
            <i
              style={{ color: "gray" }}
              className="note-card-icons fa-solid fa-box-archive"
              onClick={() => {
                archiveNoteHandler(item);
              }}
            ></i>
          )}
          {inTrash ? (
            <i
              className="note-card-icons fa-solid fa-trash-arrow-up"
              onClick={() => restoreFromTrashHandler(item._id)}
            ></i>
          ) : null}
          {inTrash ? (
            <i
              className="note-card-icons fa-solid fa-trash-can"
              onClick={() => deleteFromTrashHandler(item._id)}
            ></i>
          ) : (
            <i
              style={{ color: "gray" }}
              className="note-card-icons fa-solid fa-trash-can"
              onClick={() => {
                moveToTrashHandler(item._id);
                deleteFromArchiveHandler(item._id);
              }}
            ></i>
          )}
          {isPinned && type === "pinned"? (
            <i
              style={{ color: "gray" }}
              className="fa-solid fa-thumbtack"
              // onClick={() => deleteFromPinnedHandler(item)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-thumbtack"
              onClick={() => addToPinnedHandler(item)}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};
