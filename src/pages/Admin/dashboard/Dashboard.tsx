import { useLocation } from "react-router";
import LayoutComponent from "../../../layout/LayoutComponent";
import { useEffect, useState } from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import UserTable from "./UserTable/UserTable";
import RoomTable from "./RoomTable/RoomTable";
import BookingTable from "./BookingTable/BookingTable";


export const Dashboard = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const styles = {
    container: {
      display: "flex", // Dùng flexbox để đặt tab và nội dung nằm cạnh nhau
      height: "100%", // Chiều cao toàn màn hình
    },
    tabs: {
      display: "flex",
      flexDirection: "column",
      width: "200px", // Chiều rộng của tab dọc
      borderRight: "1px solid #ddd", // Đường viền ngăn cách tab và nội dung
    },
    content: {
      flex: 1, // Nội dung chiếm hết không gian còn lại
      padding: "20px", // Thêm khoảng cách cho nội dung
    },
  };
  const [selectedTab, setSelectedTab] = useState<string>("Users"); // Trạng thái cho tab được chọn

  // Hàm xử lý khi tab được chọn
  const handleTabChange = (item: any) => {
    setSelectedTab(item.props.headerText); // Cập nhật tab được chọn
  };

  return (
    <LayoutComponent>
      <div style={styles.container}>
        {/* Tab dọc nằm bên trái */}
        <Pivot
          aria-label="Vertical Tabs Example"
          styles={{ root: styles.tabs }}
          linkFormat="tabs" // Định dạng tab dưới dạng tab
          linkSize="large" // Đặt kích thước tab
          onLinkClick={handleTabChange} // Gọi hàm xử lý khi tab được chọn
        >
          <PivotItem headerText="Users">
            {/* Nội dung không cần ở đây */}
          </PivotItem>

          <PivotItem headerText="Rooms">
            {/* Nội dung không cần ở đây */}
          </PivotItem>

          <PivotItem headerText="Bookings">
            {/* Nội dung không cần ở đây */}
          </PivotItem>

          {/* <PivotItem headerText="Payments">
            Nội dung không cần ở đây
          </PivotItem> */}
        </Pivot>

        {/* Nội dung hiển thị bên phải dựa trên tab được chọn */}
        <div style={styles.content}>
          {selectedTab === "Users" && <UserTable/>}
          {selectedTab === "Rooms" && <RoomTable/>}
          {selectedTab === "Bookings" && <BookingTable/>}
          {/* {selectedTab === "Payments" && <div>Nội dung cho Tab 3</div>} */}
        </div>
      </div>
    </LayoutComponent>
  );
};
