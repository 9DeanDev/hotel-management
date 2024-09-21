import React, { useEffect, useState, useCallback } from "react";
import {
  DetailsList,
  IColumn,
  DetailsListLayoutMode,
  PrimaryButton,
  TextField,
  Modal,
  IconButton,
  Spinner,
  Stack,
  CheckboxVisibility,
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
  const [newBooking, setNewBooking] = useState<Omit<Booking, "id" | "room" | "user">>({
    check_in_date: "",
    check_out_date: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);

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
    fetchBookings();
  }, [fetchBookings]);

  // Add booking
  const handleAddBooking = useCallback(async () => {
    setOperationLoading(true);
    try {
      const res = await axios.post<Booking>("http://localhost:8080/bookings", newBooking);
      if (res) {
        fetchBookings();
        setNewBooking({
          check_in_date: "",
          check_out_date: "",
          status: "",
        }); // Reset form
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
          editingBooking
        );
        if (res) {
          setBookings(
            bookings.map((booking) =>
              booking.id === editingBooking.id ? res.data : booking
            )
          );
          setIsModalOpen(false);
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
              setIsModalOpen(true);
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
      <Stack horizontalAlign="center">
        <Stack tokens={{ childrenGap: 8 }} style={{ width: "50%" }}>
          <h2>Add Booking</h2>
          <TextField
            label="Check-in Date"
            value={newBooking.check_in_date}
            onChange={(_, newValue) =>
              setNewBooking({ ...newBooking, check_in_date: newValue || "" })
            }
          />
          <TextField
            label="Check-out Date"
            value={newBooking.check_out_date}
            onChange={(_, newValue) =>
              setNewBooking({ ...newBooking, check_out_date: newValue || "" })
            }
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
        </Stack>
      </Stack>

      <h2>Booking List</h2>
      {loading ? (
        <Spinner />
      ) : (
        <DetailsList
          items={bookings}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          isHeaderVisible={true}
          checkboxVisibility={CheckboxVisibility.hidden}
        />
      )}

      {/* Modal for editing booking */}
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => {
          setIsModalOpen(false);
          setEditingBooking(null); // Reset editing booking on close
        }}
        isBlocking={false}
      >
        <div style={{ padding: "20px" }}>
          <h2>Edit Booking</h2>
          {editingBooking && (
            <>
              <TextField
                label="Check-in Date"
                value={editingBooking.check_in_date}
                onChange={(_, newValue) =>
                  setEditingBooking({
                    ...editingBooking,
                    check_in_date: newValue || "",
                  })
                }
              />
              <TextField
                label="Check-out Date"
                value={editingBooking.check_out_date}
                onChange={(_, newValue) =>
                  setEditingBooking({
                    ...editingBooking,
                    check_out_date: newValue || "",
                  })
                }
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
              <IconButton
                iconProps={{ iconName: "Cancel" }}
                ariaLabel="Close popup modal"
                onClick={() => setIsModalOpen(false)}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BookingTable;
