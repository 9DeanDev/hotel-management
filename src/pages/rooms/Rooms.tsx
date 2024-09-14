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
import { Button, CustomDatePicker } from "../../components";
import axios from "axios";
import { RoomChecker } from "../../components/room-checker/RoomChecker";

export const Rooms = () => {
  const { control, handleSubmit, setValue } = useForm();
  const [availableRooms, setAvailableRooms] = useState(null);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [data, setData] = useState([]);

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

      setData(
        detailsData.map((item: any, index: number) => {
          return { ...item, imageUrl: imageUrl[index] };
        })
      );
    } catch (error) {
      console.error("Error fetching images data:", error);
    }
  };

  const formatDateToYYYYMMDD = (date: Date | null) => {
    return date ? date.toISOString().split("T")[0] : "";
  };

  const onSubmit = async (data: any) => {
    const startDateFormatted = formatDateToYYYYMMDD(data.startDate);
    const endDateFormatted = formatDateToYYYYMMDD(data.endDate);

    console.log("Formatted Dates:", {
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    });

    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/checkAvailabilities`,
        {
          params: {
            startDate: startDateFormatted,
            endDate: endDateFormatted,
          },
        }
      );
      console.log("API Response:", response.data);
      setAvailableRooms(response.data);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  return (
    <LayoutComponent>
      {data.map((item: any, index) => {
        return (
          <div key={index}>
            <div className={styles.slider}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
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
                <a
                  href={`/Room/${item.roomname}`}
                  style={{ width: "100%", textAlign: "end" }}
                >
                  See more
                </a>
              </div>
            </div>
          </div>
        );
      })}
      <div className={styles.caContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2>Check Available</h2>
          <CustomDatePicker
            name="startDate"
            control={control}
            placeholder="Check In"
            setValue={setValue}
            rules={{
              required: "This field is required",
            }}
          />
          <CustomDatePicker
            name="endDate"
            control={control}
            setValue={setValue}
            placeholder="Check Out"
            defaultValue={""}
            rules={{
              required: "This field is required",
            }}
          />

          <Button
            type="submit"
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
        {availableRooms && <RoomChecker rooms={availableRooms} />}
      </div>
    </LayoutComponent>
  );
};
