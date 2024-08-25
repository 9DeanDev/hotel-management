import LayoutComponent from "../../layout/LayoutComponent";
import styles from "./Rooms.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SpinButton } from "@fluentui/react";
import { Button, CustomDatePicker } from "../../components";
import axios from "axios";

export const Rooms = () => {
  const { control, handleSubmit } = useForm();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [data,setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const ImageRes = await axios.get(`http://localhost:8080/roomImage`);
      const DetailsRes = await axios.get(`http://localhost:8080/rooms`);
      let imageUrl: any;
      let detailsData = [];

      if (ImageRes) {
        imageUrl = ImageRes.data.map((item: any) => {
          return [item.urlimg1, item.urlimg2, item.urlimg3, item.urlimg4];
        });
      }

      if (DetailsRes) {
        detailsData = DetailsRes.data;
      }

      setData(detailsData.map((item: any, index: number) => {
        return {...item, 'imageUrl': imageUrl[index]};
      }));
    } catch (error) {
      console.error("Error fetching images data:", error);
    }
  };
  const onSubmit = () => {
    console.log(data);
    
  };

  return (
    <LayoutComponent>
      {data.map((item: any) => {
        return (
          <>
            <div className={styles.slider}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation // Bật tính năng điều hướng
                pagination={{ clickable: true }} // Hiển thị các dấu chấm phân trang
                autoplay={{ delay: 5000 }} // Tự động chuyển slide sau 3 giây>
              >
                {item.imageUrl.map((item: any, index: number) => {
                  return (
                    <SwiperSlide key={index}>
                      <img
                        src={item}
                        alt="img"
                        style={{
                          width: "100%",
                          height: "400px",
                          borderRadius: "8px",
                        }}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className={styles.bodyContent}>
              <div className={styles.detail}>
                <div className={styles.title}>
                  <h2>{item.roomname} Room</h2>
                  <p>
                    <span>{item.price}VNĐ</span>/per night
                  </p>
                </div>
                <p>{item.description}</p>
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
          </>
        );
      })}
    </LayoutComponent>
  );
};
