import React, { useEffect, useState, useCallback } from "react";
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  PrimaryButton,
  TextField,
  Spinner,
  Stack,
  CheckboxVisibility,
  IconButton,
  Panel,
  PanelType,
} from "@fluentui/react";
import axios from "axios";

interface Room {
  id: number;
  roomname: string;
  description: string;
  price: number;
  facilities: string;
  totalrooms: number;
}

const RoomTable: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRoom, setNewRoom] = useState<Omit<Room, "id">>({
    roomname: "",
    description: "",
    price: 0,
    facilities: "",
    totalrooms: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State to handle panel open/close

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Room[]>("http://localhost:8080/rooms");
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  const handleAddRoom = useCallback(async () => {
    setOperationLoading(true);
    try {
      const res = await axios.post<Room>(
        "http://localhost:8080/rooms",
        newRoom
      );
      if (res) {
        fetchRooms();
        setNewRoom({
          roomname: "",
          description: "",
          price: 0,
          facilities: "",
          totalrooms: 0,
        }); // Reset form
        alert("Added a new room");
      }
    } catch (error) {
      console.error("Error adding room:", error);
    } finally {
      setOperationLoading(false);
    }
  }, [newRoom, fetchRooms]);

  const handleDeleteRoom = useCallback(
    async (roomname: string) => {
      const confirmation = window.confirm(
        `Are you sure to delete the room: ${roomname}?`
      );
      if (confirmation) {
        setOperationLoading(true);
        try {
          let res = await axios.delete(
            `http://localhost:8080/rooms/${roomname}`
          );
          if (res) {
            setRooms(rooms.filter((room) => room.roomname !== roomname));
            alert("Room deleted successfully");
          }
        } catch (error) {
          console.error("Error deleting room:", error);
        } finally {
          setOperationLoading(false);
        }
      }
    },
    [rooms]
  );

  const handleEditRoom = useCallback(async () => {
    if (editingRoom) {
      setOperationLoading(true);
      try {
        const res = await axios.put<Room>(
          `http://localhost:8080/rooms/${editingRoom.id}`,
          editingRoom
        );
        if (res) {
          setRooms(
            rooms.map((room) => (room.id === editingRoom.id ? res.data : room))
          );
          setEditingRoom(null); // Reset form after saving
          setIsPanelOpen(false); // Close panel after saving
          alert("Room updated successfully");
        }
      } catch (error) {
        console.error("Error updating room:", error);
      } finally {
        setOperationLoading(false);
      }
    }
  }, [editingRoom, rooms]);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Room Name",
      fieldName: "roomname",
      minWidth: 100,
      maxWidth: 100,
      isMultiline: true,
    },
    {
      key: "column2",
      name: "Description",
      fieldName: "description",
      minWidth: 200,
      maxWidth: 200,
      isMultiline: true,
    },
    {
      key: "column3",
      name: "Price",
      fieldName: "price",
      minWidth: 50,
      maxWidth: 50,
    },
    {
      key: "column4",
      name: "Facilities",
      fieldName: "facilities",
      minWidth: 150,
      maxWidth: 200,
      isMultiline: true,
    },
    {
      key: "column5",
      name: "Total Rooms",
      fieldName: "totalrooms",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "column6",
      name: "Actions",
      fieldName: "actions",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: Room) => (
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <PrimaryButton
            text="Edit"
            onClick={() => {
              setEditingRoom(item);
              setIsPanelOpen(true); // Open panel when editing
            }}
          />
          <PrimaryButton
            text="Delete"
            onClick={() => handleDeleteRoom(item.roomname)}
          />
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Stack>
        <Stack tokens={{ childrenGap: 8 }} style={{ width: "50%" }}>
          <h2>Room List</h2>
          <IconButton
            iconProps={{ iconName: showForm ? "Cancel" : "Add" }}
            ariaLabel="Toggle Add Room"
            onClick={() => setShowForm(!showForm)}
          />
          {showForm && (
            <div>
              <TextField
                label="Room Name"
                value={newRoom.roomname}
                onChange={(_, newValue) =>
                  setNewRoom({ ...newRoom, roomname: newValue || "" })
                }
              />
              <TextField
                label="Description"
                value={newRoom.description}
                onChange={(_, newValue) =>
                  setNewRoom({ ...newRoom, description: newValue || "" })
                }
              />
              <TextField
                label="Price"
                type="number"
                value={newRoom.price.toString()}
                onChange={(_, newValue) =>
                  setNewRoom({ ...newRoom, price: parseFloat(newValue || "0") })
                }
              />
              <TextField
                label="Facilities"
                value={newRoom.facilities}
                onChange={(_, newValue) =>
                  setNewRoom({ ...newRoom, facilities: newValue || "" })
                }
              />
              <TextField
                label="Total Rooms"
                type="number"
                value={newRoom.totalrooms.toString()}
                onChange={(_, newValue) =>
                  setNewRoom({
                    ...newRoom,
                    totalrooms: parseInt(newValue || "0"),
                  })
                }
              />
              <PrimaryButton
                text="Add Room"
                onClick={handleAddRoom}
                disabled={operationLoading}
              />
            </div>
          )}
        </Stack>
      </Stack>

      {loading ? (
        <Spinner />
      ) : (
        <DetailsList
          items={rooms}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          isHeaderVisible={true}
          checkboxVisibility={CheckboxVisibility.hidden}
        />
      )}

      {/* Panel for editing room */}
      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.smallFixedFar}
        headerText="Edit Room"
      >
        {editingRoom && (
          <>
            <TextField
              label="Room Name"
              value={editingRoom.roomname}
              onChange={(_, newValue) =>
                setEditingRoom({ ...editingRoom, roomname: newValue || "" })
              }
            />
            <TextField
              label="Description"
              value={editingRoom.description}
              onChange={(_, newValue) =>
                setEditingRoom({
                  ...editingRoom,
                  description: newValue || "",
                })
              }
            />
            <TextField
              label="Price"
              type="number"
              value={editingRoom.price.toString()}
              onChange={(_, newValue) =>
                setEditingRoom({
                  ...editingRoom,
                  price: parseFloat(newValue || "0"),
                })
              }
            />
            <TextField
              label="Facilities"
              value={editingRoom.facilities}
              onChange={(_, newValue) =>
                setEditingRoom({
                  ...editingRoom,
                  facilities: newValue || "",
                })
              }
            />
            <TextField
              label="Total Rooms"
              type="number"
              value={editingRoom.totalrooms.toString()}
              onChange={(_, newValue) =>
                setEditingRoom({
                  ...editingRoom,
                  totalrooms: parseInt(newValue || "0"),
                })
              }
            />
            <PrimaryButton
              text="Save"
              onClick={handleEditRoom}
              disabled={operationLoading}
            />
          </>
        )}
      </Panel>
    </div>
  );
};

export default RoomTable;

