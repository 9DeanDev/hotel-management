import React, { useEffect, useState, useCallback } from "react";
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  PrimaryButton,
  TextField,
  IconButton,
  Spinner,
  Stack,
  CheckboxVisibility,
  Panel,
  PanelType,
  Dropdown,
  IDropdownOption,
  DatePicker,
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

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  phone: string;
  address: string | null;
}

interface Booking {
  id: number;
  room: Room;
  user: User;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

const BookingTable: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBooking, setNewBooking] = useState<Omit<Booking, "id">>({
    check_in_date: "",
    check_out_date: "",
    status: "",
    room: {} as Room,
    user: {} as User,
  });
  const [showForm, setShowForm] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Fetch rooms and users data
  const fetchRoomsAndUsers = useCallback(async () => {
    try {
      const [roomsResponse, usersResponse] = await Promise.all([
        axios.get<Room[]>("http://localhost:8080/rooms"),
        axios.get<User[]>("http://localhost:8080/users"),
      ]);
      setRooms(roomsResponse.data);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error("Error fetching rooms or users:", error);
    }
  }, []);

  // Fetch bookings data
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<Booking[]>("http://localhost:8080/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoomsAndUsers();
    fetchBookings();
  }, [fetchRoomsAndUsers, fetchBookings]);

  // Add booking
  const handleAddBooking = useCallback(async () => {
    setOperationLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/bookings", {
        check_in_date: newBooking.check_in_date,
        check_out_date: newBooking.check_out_date,
        room_id: newBooking.room.id, // room_id từ room
        user_id: newBooking.user.id, // user_id từ user
        status: newBooking.status,
      });
      if (res) {
        fetchBookings();
        setNewBooking({
          check_in_date: "",
          check_out_date: "",
          status: "",
          room: {} as Room,
          user: {} as User,
        });
        alert("Added a new booking");
      }
    } catch (error) {
      console.error("Error adding booking:", error);
    } finally {
      setOperationLoading(false);
    }
  }, [newBooking, fetchBookings]);

  // Delete booking by ID
  const handleDeleteBooking = useCallback(
    async (bookingId: number) => {
      const confirmation = window.confirm("Are you sure to delete this booking?");
      if (confirmation) {
        setOperationLoading(true);
        try {
          let res = await axios.delete(`http://localhost:8080/bookings/${bookingId}`);
          if (res) {
            setBookings(bookings.filter((booking) => booking.id !== bookingId));
            alert("Booking deleted successfully");
          }
        } catch (error) {
          console.error("Error deleting booking:", error);
        } finally {
          setOperationLoading(false);
        }
      }
    },
    [bookings]
  );

  // Edit booking
  const handleEditBooking = useCallback(async () => {
    if (editingBooking) {
      setOperationLoading(true);
      try {
        const res = await axios.put<Booking>(
          `http://localhost:8080/bookings/${editingBooking.id}`,
          {
            check_in_date: editingBooking.check_in_date,
            check_out_date: editingBooking.check_out_date,
            room_id: editingBooking.room.id,
            user_id: editingBooking.user.id,
            status: editingBooking.status,
          }
        );
        if (res) {
          setBookings(
            bookings.map((booking) =>
              booking.id === editingBooking.id ? res.data : booking
            )
          );
          setEditingBooking(null); // Reset form after saving
          alert("Booking updated successfully");
        }
      } catch (error) {
        console.error("Error updating booking:", error);
      } finally {
        setOperationLoading(false);
      }
    }
  }, [editingBooking, bookings]);

  // Convert room and user data to dropdown options
  const roomOptions: IDropdownOption[] = rooms.map((room) => ({
    key: room.id,
    text: room.roomname,
  }));

  const userOptions: IDropdownOption[] = users.map((user) => ({
    key: user.id,
    text: user.username,
  }));

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Room",
      fieldName: "roomname",
      minWidth: 100,
      maxWidth: 150,
      onRender: (item: Booking) => item.room.roomname,
    },
    {
      key: "column2",
      name: "User",
      fieldName: "username",
      minWidth: 100,
      maxWidth: 150,
      onRender: (item: Booking) => item.user.username,
    },
    {
      key: "column3",
      name: "Check-in Date",
      fieldName: "check_in_date",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "column4",
      name: "Check-out Date",
      fieldName: "check_out_date",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "column5",
      name: "Status",
      fieldName: "status",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      key: "column6",
      name: "Actions",
      fieldName: "actions",
      minWidth: 100,
      maxWidth: 150,
      onRender: (item: Booking) => (
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <PrimaryButton
            text="Edit"
            onClick={() => {
              setEditingBooking(item);
              setIsPanelOpen(true); // Open the panel
            }}
          />
          <PrimaryButton
            text="Delete"
            onClick={() => handleDeleteBooking(item.id)}
          />
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Stack>
        <Stack tokens={{ childrenGap: 8 }} style={{ width: "50%" }}>
          <h2>Booking List</h2>
          <IconButton
            iconProps={{ iconName: showForm ? "Cancel" : "Add" }}
            ariaLabel="Toggle Add Booking"
            onClick={() => setShowForm(!showForm)}
          />
          {showForm && (
            <div>
              <Dropdown
                label="Room"
                options={roomOptions}
                selectedKey={newBooking.room?.id}
                onChange={(_, option) =>
                  setNewBooking({
                    ...newBooking,
                    room: rooms.find((room) => room.id === option?.key) || ({} as Room),
                  })
                }
              />
              <Dropdown
                label="User"
                options={userOptions}
                selectedKey={newBooking.user?.id}
                onChange={(_, option) =>
                  setNewBooking({
                    ...newBooking,
                    user: users.find((user) => user.id === option?.key) || ({} as User),
                  })
                }
              />
             <DatePicker
  label="Check-in Date"
  value={newBooking.check_in_date ? new Date(newBooking.check_in_date) : undefined} // Hiển thị giá trị nếu đã có ngày
  onSelectDate={(date) => {
    if (date) {
      setNewBooking({
        ...newBooking,
        check_in_date: date.toISOString().split("T")[0], // Chuyển đổi thành chuỗi 'YYYY-MM-DD'
      });
    }
  }}
/>

<DatePicker
  label="Check-out Date"
  value={newBooking.check_out_date ? new Date(newBooking.check_out_date) : undefined}
  onSelectDate={(date) => {
    if (date) {
      setNewBooking({
        ...newBooking,
        check_out_date: date.toISOString().split("T")[0],
      });
    }
  }}
/>

              <TextField
                label="Status"
                value={newBooking.status}
                onChange={(_, newValue) =>
                  setNewBooking({ ...newBooking, status: newValue || "" })
                }
              />
              <PrimaryButton
                text="Add Booking"
                onClick={handleAddBooking}
                disabled={operationLoading}
              />
            </div>
          )}
        </Stack>

        {loading ? (
          <Spinner label="Loading..." />
        ) : (
          <DetailsList
            items={bookings}
            columns={columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            checkboxVisibility={CheckboxVisibility.hidden}
          />
        )}
      </Stack>

      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.medium}
        headerText="Edit Booking"
        closeButtonAriaLabel="Close"
      >
        {editingBooking && (
          <div>
            <Dropdown
              label="Room"
              options={roomOptions}
              selectedKey={editingBooking.room?.id}
              onChange={(_, option) =>
                setEditingBooking({
                  ...editingBooking,
                  room: rooms.find((room) => room.id === option?.key) || ({} as Room),
                })
              }
            />
            <Dropdown
              label="User"
              options={userOptions}
              selectedKey={editingBooking.user?.id}
              onChange={(_, option) =>
                setEditingBooking({
                  ...editingBooking,
                  user: users.find((user) => user.id === option?.key) || ({} as User),
                })
              }
            />
            <DatePicker
  label="Check-in Date"
  value={newBooking.check_in_date ? new Date(newBooking.check_in_date) : new Date(editingBooking.check_in_date)} // Hiển thị giá trị nếu đã có ngày
  onSelectDate={(date) => {
    if (date) {
      setNewBooking({
        ...newBooking,
        check_in_date: date.toISOString().split("T")[0], // Chuyển đổi thành chuỗi 'YYYY-MM-DD'
      });
    }
  }}
/>

<DatePicker
  label="Check-out Date"
  value={newBooking.check_out_date ? new Date(newBooking.check_out_date) : new Date(editingBooking.check_out_date)}
  onSelectDate={(date) => {
    if (date) {
      setNewBooking({
        ...newBooking,
        check_out_date: date.toISOString().split("T")[0],
      });
    }
  }}
/>
            <TextField
              label="Status"
              value={editingBooking.status}
              onChange={(_, newValue) =>
                setEditingBooking({
                  ...editingBooking,
                  status: newValue || "",
                })
              }
            />
            <PrimaryButton
              text="Save"
              onClick={handleEditBooking}
              disabled={operationLoading}
            />
          </div>
        )}
      </Panel>
    </div>
  );
};

export default BookingTable;



