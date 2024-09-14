import { Button } from "../../components";
import {
  CheckboxVisibility,
  DetailsList,
  DetailsListLayoutMode,
  Dropdown,
  IColumn,
  IDropdownOption,
} from "@fluentui/react";

export const RoomChecker = (props: any) => {
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
              selectedKey={0}
              options={quantityOptions}
              onChange={(_event, option) => {
                console.log(
                  `Selected quantity for room ${item.id}: ${option?.key}`
                );
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
            onClick={() => {
              console.log(`Booking room ${item.id}`);
              // Xử lý đặt phòng tại đây (có thể gọi API hoặc cập nhật state)
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DetailsList
      items={props.rooms}
      columns={columns}
      setKey="set"
      layoutMode={DetailsListLayoutMode.fixedColumns}
      checkboxVisibility={CheckboxVisibility.hidden}
    />
  );
};
