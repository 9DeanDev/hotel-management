import {
  DefaultButton,
  Modal,
  PrimaryButton,
  TextField,
} from "@fluentui/react";
import styles from "./Modal.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export const BookModal = (props: any) => {
  const [formData, setFormData] = useState<any>({
    username: "",
    email: "",
    phone: "",
    roomname: props.selectedRoom.roomname,
    price: props.selectedRoom.price,
    selectedRooms: props.selectedValues[props.selectedRoom.id] || 1,
    totalPrice:
      (props.selectedValues[props.selectedRoom.id] || 1) *
      props.selectedRoom.price,
    creditCard: "",
    expirationDate: "",
    cvv: "",
  });

  const getUserData = async () => {
    const email = localStorage.getItem("email"); // Lấy email từ localStorage
    if (!email) {
      console.error("No email found in localStorage");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8080/users/${email}`);
      return response.data; // Trả về thông tin người dùng
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserData = async () => {
    const user = await getUserData(); // Gọi hàm lấy thông tin user
    if (user) {
      setFormData((prevData: any) => ({
        ...prevData,
        username: user.username,
        email: user.email,
        phone: user.phone,
      }));
    }
  };

  // Khi modal mở ra, gọi hàm lấy thông tin người dùng
  useEffect(() => {
    fetchUserData();
  }, []);

  // Hàm xử lý khi người dùng chỉnh sửa các trường
  const handleInputChange = (event: any, field: string) => {
    const newValue = event.target.value;
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: newValue,
      // Tự động tính lại tổng giá khi số lượng phòng thay đổi
      totalPrice:
        field === "selectedRooms"
          ? newValue * prevData.price
          : prevData.totalPrice,
    }));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      containerClassName={styles.modalContainer}
    >
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <h2>Booking Information</h2>
          <DefaultButton onClick={props.handleCloseModal}>Close</DefaultButton>
        </div>

        <div className={styles.modalContent}>
          <h3>Customer Information</h3>
          <TextField
            label="Full Name"
            value={formData.username}
            onChange={(e) => handleInputChange(e, "username")}
            readOnly
          />
          <TextField
            label="Email"
            value={formData.email}
            readOnly
            onChange={(e) => handleInputChange(e, "email")}
          />
          <TextField
            label="Phone"
            value={formData.phone}
            readOnly
            onChange={(e) => handleInputChange(e, "phone")}
          />

          <h3>Room Information</h3>
          <TextField
            label="Room Name"
            value={formData.roomname}
            readOnly
          />
          <TextField
            label="Price per Room (VNĐ)"
            value={formData.price.toString()}
            readOnly
          />
          <TextField
            label="Selected Rooms"
            value={formData.selectedRooms.toString()}
            onChange={(e) => handleInputChange(e, "selectedRooms")}
            type="number"
            min={1}
            max={props.selectedRoom.remainingRooms} // Giới hạn số lượng phòng
          />
          <TextField
            label="Total Price (VNĐ)"
            value={formData.totalPrice.toString()}
            readOnly
          />

          <h3>Payment Information</h3>
          <TextField
            label="Credit Card Number"
            placeholder="Enter your credit card number"
            value={formData.creditCard}
            onChange={(e) => handleInputChange(e, "creditCard")}
            required
          />
          <TextField
            label="Expiration Date"
            placeholder="MM/YY"
            value={formData.expirationDate}
            onChange={(e) => handleInputChange(e, "expirationDate")}
            required
          />
          <TextField
            label="CVV"
            placeholder="Enter CVV"
            value={formData.cvv}
            onChange={(e) => handleInputChange(e, "cvv")}
            required
          />

          <DefaultButton onClick={props.handleCloseModal}>Cancel</DefaultButton>
          <PrimaryButton
            text="Confirm Booking"
            onClick={() => props.handleConfirmBooking(formData)} // Truyền dữ liệu form khi xác nhận đặt phòng
            style={{ marginTop: "20px" }}
          />
        </div>
      </div>
    </Modal>
  );
};
