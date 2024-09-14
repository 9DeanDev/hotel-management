import LayoutComponent from "../../../layout/LayoutComponent";
import { AuthBtn, Button } from "../../../components";
import styles from "./Home.module.scss";
import { FontIcon, IButtonStyles, mergeStyles } from "@fluentui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const user =  localStorage.getItem("username");
  const token = localStorage.getItem("token")
  const [openLogin, setOpenLogin] = useState(false);

  const iconList = [
    {
      iconName: "TimeSheet",
      text: "Kitchen",
    },
    {
      iconName: "InternetSharing",
      text: "Wifi",
    },
    {
      iconName: "Car",
      text: "Taxi",
    },
    {
      iconName: "Emoji",
      text: "Friendly",
    },
    {
      iconName: "Hotel",
      text: "Bed",
    },
  ];

  const iconStyles = mergeStyles({
    color: "rgb(219 194 140)",
    width: 60,
    height: 60,
    fontSize: 60,
    margin: "8px 0px",
  });

  const renderIcon = () => {
    return (
      <>
        {iconList.map((item, index) => {
          return (
            <div key={index}>
              <FontIcon iconName={item.iconName} className={iconStyles} />
              <p style={{ textAlign: "center" }}>{item.text}</p>
            </div>
          );
        })}
      </>
    );
  };

  const gridItemList = [
    {
      url: "./../../src/assets/anh-ks-thumb.jpeg",
      text: "Standard Twin Room",
      path: "StandardTwin",
    },
    {
      url: "./../../src/assets/StandardRoom.jpg",
      text: "Standard Room",
      path: "Standard",
    },
    {
      url: "./../../src/assets/StandardViewRoom.webp",
      text: "Superior Room",
      path: "Superior",
    },
    {
      url: "./../../src/assets/ciputra-deluxe-room.jpeg",
      text: "Deluxe Room",
      path: "Deluxe",
    },
  ];

  const handleClickForDetailsRoom = (item: any) => {
    if (token) {
      navigate(`/Room/${item.path}`);
      console.log(item.path);
      
    } else {
      window.confirm("You need to log in first");
      setOpenLogin(true);
    }
  };

  const renderGridItem = () => {
    const btnStyles: IButtonStyles = {
      root: {
        width: 244,
        height: 76,
        borderRadius: 10,
        fontSize: 24,
        fontWeight: 500,
        fontFamily: "Ubuntu sans-serif",
      },
      rootHovered: {
        backgroundColor: "#DFAA5B",
      },
    };

    return (
      <>
        {gridItemList.map((item, index) => {
          return (
            <div
              key={index}
              className={styles.griditem}
              style={{
                backgroundImage: `url(${item.url})`,
              }}
            >
              <div className={styles.overlay}></div>
              <p style={{ textAlign: "center" }}>{item.text}</p>
              <Button
                styles={btnStyles}
                text="Check for details"
                onClick={() => handleClickForDetailsRoom(item)}
              />
            </div>
          );
        })}
      </>
    );
  };

  return (
    <LayoutComponent>
      <div className={styles.header}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          {user ? (
            <p>
              WELCOM,<> {user}</>
            </p>
          ) : (
            <p>WELCOM TO DAEMON HOTEL</p>
          )}
          <p style={{ margin: "25px 0 41px 0", fontSize: 24, fontWeight: 400 }}>
            Good people. Good thinking. Good feeling.
          </p>
          {!token && <AuthBtn text="EXPLORE" isOpen={openLogin} />}
        </div>
      </div>
      <div className={styles.body}>
        <h3>Service</h3>
        <div className={styles.iconcontainer}>{renderIcon()}</div>
        <h3>Rooms & Rates</h3>
        <div className={styles.gridcontainer}>{renderGridItem()}</div>
      </div>
    </LayoutComponent>
  );
};
