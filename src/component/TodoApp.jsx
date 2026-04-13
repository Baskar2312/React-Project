import React, { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import { MdAddCircleOutline } from "react-icons/md";

const Content = () => {
  let [items, setItems] = useState([
    { id: 1, label: "HTML&CSS", checked: true },
    { id: 2, label: "JAVASCRIPT", checked: true },
    { id: 3, label: "REACTJS", checked: false },
  ]);

  let [newItem, setNewItem] = useState("");
  let [isEditing, setIsEditing] = useState(false);
  let [currentEleId, setCurrentEleId] = useState(null);

  let handleChecked = (id) => {
    let newListItems = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(newListItems);
  };

  let handleUpdate = (id) => {
    let listItem = items.find((item) => item.id === id);
    setNewItem(listItem.label);
    setIsEditing(true);
    setCurrentEleId(id);
  };

  let handleDelete = (id) => {
    let newItems = items
      .filter((item) => {
        return item.id !== id;
      })
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setItems(newItems);
  };

  let handleAddorSaveItem = () => {
    if (isEditing) {
      let newListItems = items.map((item) => {
        return item.id === currentEleId ? { ...item, label: newItem } : item;
      });
      setItems(newListItems);
      setCurrentEleId(null);
      setNewItem("");
      setIsEditing(false);
    } else {
      setItems([
        ...items,
        { id: items.length + 1, label: newItem, checked: false },
      ]);
      setNewItem("");
    }
  };

  return (
    <main>
      {/* <Shop/>  */}
      <div>
        <input
          value={newItem}
          placeholder="Add new Item"
          type="text"
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
        />
        <button onClick={handleAddorSaveItem}>
          {isEditing ? <MdOutlineSaveAlt /> : <MdAddCircleOutline /> }
        </button>
      </div>
      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {
                  handleChecked(item.id);
                }}
              ></input>
              <label>{item.label}</label>
              <FaEdit
                id="edit"
                role="button"
                tabIndex={0}
                onClick={() => handleUpdate(item.id)}
              />
              <FaTrashCan
                id="delete"
                role="button"
                tabIndex={0}
                onClick={() => {
                  handleDelete(item.id);
                }}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Content;
