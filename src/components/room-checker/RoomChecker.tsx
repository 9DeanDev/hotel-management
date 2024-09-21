import { useState } from "react";
import { Button } from "../../components";
import {
  CheckboxVisibility,
  DetailsList,
  DetailsListLayoutMode,
  Dropdown,
  IColumn,
  IDropdownOption,
} from "@fluentui/react";
import { BookModal } from "../modal/BookModal/Modal";

export const RoomChecker = (props: any) => {
  const [selectedValues, setSelectedValues] = useState<Record<number, number>>(
    {}
  );
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookClick = (room: any) => {
    let checkAuth = localStorage.getItem("email");
    if (!checkAuth) {
      window.confirm("You need to login first.");
    } else {
      setSelectedRoom(room); // Lưu thông tin phòng được chọn
      setIsModalOpen(true); // Mở Modal
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed for", selectedRoom);
    setIsModalOpen(false);
  };

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "ID",
      fieldName: "id",
      minWidth: 50,
      maxWidth: 50,
      onRender: (item) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {item.id}
        </div>
      ),
    },
    {
      key: "column2",
      name: "Room Name",
      fieldName: "roomname",
      minWidth: 100,
      maxWidth: 150,
      onRender: (item) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {item.roomname}
        </div>
      ),
    },
    {
      key: "column3",
      name: "Description",
      fieldName: "description",
      minWidth: 150,
      maxWidth: 250,
      isMultiline: true,
      onRender: (item) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {item.description}
        </div>
      ),
    },
    {
      key: "column4",
      name: "Price",
      fieldName: "price",
      minWidth: 80,
      maxWidth: 120,
      onRender: (item) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {item.price} VNĐ
        </div>
      ),
    },
    {
      key: "column5",
      name: "Remaining Rooms",
      fieldName: "remainrooms",
      minWidth: 120,
      maxWidth: 150,
      onRender: (item) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          {item.remainrooms}
        </div>
      ),
    },
    {
      key: "column6",
      name: "Select Quantity",
      fieldName: "selectQuantity",
      minWidth: 150,
      maxWidth: 200,
      onRender: (item: any) => {
        const quantityOptions: IDropdownOption[] = Array.from(
          { length: item.remainrooms + 1 },
          (_, i) => ({
            key: i,
            text: `${i.toString()} Rooms`,
          })
        );

        return (
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Dropdown
              selectedKey={selectedValues[item.id] || 0}
              defaultChecked={true}
              options={quantityOptions}
              onChange={(_event, option: any) => {
                setSelectedValues((prev) => ({
                  ...prev,
                  [item.id]: option.key || 1,
                }));
              }}
            />
          </div>
        );
      },
    },
    {
      key: "column7",
      name: "Action",
      fieldName: "action",
      minWidth: 80,
      maxWidth: 120,
      onRender: (item: any) => (
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <Button
            text="Book"
            onClick={() => handleBookClick(item)}
            disabled={!selectedValues[item.id]}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <DetailsList
        items={props.rooms}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.fixedColumns}
        checkboxVisibility={CheckboxVisibility.hidden}
      />
      {isModalOpen && (
        <BookModal
          isOpen={isModalOpen}
          selectedRoom={selectedRoom}
          selectedValues={selectedValues}
          handleCloseModal={handleCloseModal}
          handleConfirmBooking={handleConfirmBooking}
        />
      )}
    </>
  );
};
