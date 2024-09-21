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

interface Booking {
  id: number;
  room: Room;
  user: any;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

interface User {
  id: string;
  username: string;
  bookings: Booking[];
  password: string;
  email: string;
  role: string;
  address: string | null;
  phone: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState<Omit<User, "id" | "bookings">>({
    username: "",
    email: "",
    role: "",
    phone: "",
    address: null,
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>("http://localhost:8080/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = useCallback(async () => {
    setOperationLoading(true);
    try {
      const res = await axios.post<User>("http://localhost:8080/users", {
        ...newUser,
        password: newUser.password,
      });
      if (res) {
        fetchUsers();
        setNewUser({
          username: "",
          email: "",
          role: "",
          phone: "",
          address: null,
          password: "",
        }); // Reset form
        alert("Added a new user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setOperationLoading(false);
    }
  }, [newUser, fetchUsers]);

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      const confirmation = window.confirm("Are you sure to delete this user?");
      if (confirmation) {
        setOperationLoading(true);
        try {
          let res = await axios.delete(`http://localhost:8080/users/${userId}`);
          if (res) {
            setUsers(users.filter((user) => user.id !== userId));
            alert("Delete success");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
        } finally {
          setOperationLoading(false);
        }
      }
    },
    [users]
  );

  const handleEditUser = useCallback(async () => {
    if (editingUser) {
      setOperationLoading(true);
      try {
        const res = await axios.put<User>(
          `http://localhost:8080/users/${editingUser.id}`,
          editingUser
        );
        if (res) {
          setUsers(
            users.map((user) => (user.id === editingUser.id ? res.data : user))
          );
          setIsModalOpen(false);
          setEditingUser(null); // Reset form after saving
          alert("User updated successfully");
        }
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        setOperationLoading(false);
      }
    }
  }, [editingUser, users]);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Username",
      fieldName: "username",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
    },
    {
      key: "column2",
      name: "Email",
      fieldName: "email",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
    },
    {
      key: "column3",
      name: "Phone",
      fieldName: "phone",
      minWidth: 100,
      maxWidth: 200,
      isMultiline: true,
    },
    {
      key: "column4",
      name: "Role",
      fieldName: "role",
      minWidth: 50,
      maxWidth: 150,
      isMultiline: true,
    },
    {
      key: "column5",
      name: "Actions",
      fieldName: "actions",
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: User) => (
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          <PrimaryButton
            text="Edit"
            onClick={() => {
              setEditingUser(item);
              setIsModalOpen(true);
            }}
          />
          <PrimaryButton
            text="Delete"
            onClick={() => handleDeleteUser(item.id)}
          />
        </Stack>
      ),
    },
  ];

  return (
    <div>
      <Stack horizontalAlign="center">
        <Stack tokens={{ childrenGap: 8 }} style={{ width: "50%" }}>
          <h2>Add User</h2>
          <TextField
            label="Username"
            value={newUser.username}
            onChange={(_, newValue) =>
              setNewUser({ ...newUser, username: newValue || "" })
            }
          />
          <TextField
            label="Email"
            value={newUser.email}
            onChange={(_, newValue) =>
              setNewUser({ ...newUser, email: newValue || "" })
            }
          />
          <TextField
            label="Phone"
            value={newUser.phone}
            onChange={(_, newValue) =>
              setNewUser({ ...newUser, phone: newValue || "" })
            }
          />
          <TextField
            label="Role"
            value={newUser.role}
            onChange={(_, newValue) =>
              setNewUser({ ...newUser, role: newValue || "" })
            }
          />
          <TextField
            label="Password"
            type="password"
            value={newUser.password}
            onChange={(_, newValue) =>
              setNewUser({ ...newUser, password: newValue || "" })
            }
          />
          <PrimaryButton
            text="Add User"
            onClick={handleAddUser}
            disabled={operationLoading}
          />
        </Stack>
      </Stack>

      <h2>User List</h2>
      {loading ? (
        <Spinner />
      ) : (
        <DetailsList
          items={users}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          isHeaderVisible={true}
          checkboxVisibility={CheckboxVisibility.hidden}
        />
      )}

      {/* Modal for editing user */}
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => {
          setIsModalOpen(false);
          setEditingUser(null); // Reset editing user on close
        }}
        isBlocking={false}
      >
        <div style={{ padding: "20px" }}>
          <h2>Edit User</h2>
          {editingUser && (
            <>
              <TextField
                label="Username"
                value={editingUser.username}
                onChange={(_, newValue) =>
                  setEditingUser({ ...editingUser, username: newValue || "" })
                }
              />
              <TextField
                label="Email"
                value={editingUser.email}
                onChange={(_, newValue) =>
                  setEditingUser({ ...editingUser, email: newValue || "" })
                }
              />
              <TextField
                label="Phone"
                value={editingUser.phone}
                onChange={(_, newValue) =>
                  setEditingUser({ ...editingUser, phone: newValue || "" })
                }
              />
              <TextField
                label="Role"
                value={editingUser.role}
                onChange={(_, newValue) =>
                  setEditingUser({ ...editingUser, role: newValue || "" })
                }
              />
              <PrimaryButton
                text="Save"
                onClick={handleEditUser}
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

export default UserTable;
