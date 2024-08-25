import LayoutComponent from "../../../layout/LayoutComponent";
import styles from "./RoomDetails.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CustomDatePicker } from "../../../components";
import { SpinButton } from "@fluentui/react";
import axios from "axios";

export const RoomDetails = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { control, handleSubmit } = useForm();
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [detailsData, setDetailsData] = useState<any>([]);
  const params = useParams();

  useEffect(() => {
    getImagesData();
    getDetailsData();
  }, []);

  const getImagesData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/roomImage/${params.roomname}`
      );
      if (res) {
        let data = res.data;
        setImgUrl([data.urlimg1, data.urlimg2, data.urlimg3, data.urlimg4]);
      }
    } catch (error) {
      console.error("Error fetching images data:", error);
    }
  };

  const getDetailsData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/rooms/${params.roomname}`
      );
      if (res) {
        setDetailsData(res.data);
      }
    } catch (error) {
      console.error("Error fetching details data:", error);
    }
  };

  const onSubmit = () => {};

  const renderSlide = () => {
    return (
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation // Bật tính năng điều hướng
        pagination={{ clickable: true }} // Hiển thị các dấu chấm phân trang
        autoplay={{ delay: 5000 }} // Tự động chuyển slide sau 3 giây>
      >
        {imgUrl.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={item}
                alt="img"
                style={{ width: "100%", height: "400px", borderRadius: "8px" }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  };

  return (
    <LayoutComponent>
      <div className={styles.slider}>{renderSlide()}</div>
      <div className={styles.bodyContent}>
        <div className={styles.detail}>
                <div className={styles.title}>
                  <h2>{detailsData.roomname} Room</h2>
                  <p>
                    <span>{detailsData.price}VNĐ</span>/per night
                  </p>
                </div>
                <p>{detailsData.description}</p> 
        </div>
        <div className={styles.bookForm}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2>Book Your Room</h2>
            <CustomDatePicker
              name="Check In"
              control={control}
              placeholder="Check In"
              rules={{
                required: "This field is required",
              }}
            />
            <CustomDatePicker
              name="Check Out"
              control={control}
              placeholder="Check Out"
              rules={{
                required: "This field is required",
              }}
            />
            <SpinButton
              label="Guests"
              min={1}
              defaultValue="1"
              step={1}
              styles={{
                root: {
                  display: "flex",
                  flexDirection: "column",
                },
              }}
            />
            <Button
              text="CHECK AVAILABILITY"
              styles={{
                root: {
                  fontFamily: "Ubuntu, sans-serif",
                },
                rootHovered: {
                  backgroundColor: "#DFAA5B",
                },
              }}
            />
          </form>
        </div>
      </div>
    </LayoutComponent>
  );
};
