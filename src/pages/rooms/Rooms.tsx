import LayoutComponent from '../../layout/LayoutComponent';
import styles from './Rooms.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SpinButton } from "@fluentui/react";
import { Button, CustomDatePicker } from '../../components';

interface IImagesRoom {
    roomname: string;
    url: string[]
}

export const Rooms = () => {
    const { control, handleSubmit } = useForm();
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);



    useEffect(() => {
        const imgUrl: IImagesRoom[] = [
            {
                roomname: '',
                url: []
            }
        ]
        const res = [
            {
                roomname: 'Deluxe',
                urlimg1: './../../src/assets/deluxroom/deluxe-room-king-1-2000px.jpg',
                urlimg2: './../../src/assets/deluxroom/deluxe-room-king-bathroom-2000px_wide.jpg',
                urlimg3: './../../src/assets/deluxroom/deluxe-room-twin-2-2000px_wide.jpg',
                urlimg4: './../../src/assets/deluxroom/maxresdefault.jpg',
            },
            {
                roomname: 'Standard',
                urlimg1: './../../src/assets/deluxroom/deluxe-room-king-1-2000px.jpg',
                urlimg2: './../../src/assets/deluxroom/deluxe-room-king-bathroom-2000px_wide.jpg',
                urlimg3: './../../src/assets/deluxroom/deluxe-room-twin-2-2000px_wide.jpg',
                urlimg4: './../../src/assets/deluxroom/maxresdefault.jpg',
            },
            {
                roomname: 'Deluxe',
                urlimg1: './../../src/assets/deluxroom/deluxe-room-king-1-2000px.jpg',
                urlimg2: './../../src/assets/deluxroom/deluxe-room-king-bathroom-2000px_wide.jpg',
                urlimg3: './../../src/assets/deluxroom/deluxe-room-twin-2-2000px_wide.jpg',
                urlimg4: './../../src/assets/deluxroom/maxresdefault.jpg',
            },
            {
                roomname: 'Deluxe',
                urlimg1: './../../src/assets/deluxroom/deluxe-room-king-1-2000px.jpg',
                urlimg2: './../../src/assets/deluxroom/deluxe-room-king-bathroom-2000px_wide.jpg',
                urlimg3: './../../src/assets/deluxroom/deluxe-room-twin-2-2000px_wide.jpg',
                urlimg4: './../../src/assets/deluxroom/maxresdefault.jpg',
            },
        ]

        res.forEach((item, index) => {
            imgUrl[index].roomname = item.roomname
            imgUrl[index].url.push(item.urlimg1, item.urlimg2, item.urlimg3, item.urlimg4)
        })
    }, [])

    const onSubmit = () => {

    }
    return (
        <LayoutComponent>
            {imgUrl.map(
                (item) => {
                    return (
                        <>
                            <div className={styles.slider}>
                                <Swiper
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    navigation          // Bật tính năng điều hướng
                                    pagination={{ clickable: true }} // Hiển thị các dấu chấm phân trang
                                    autoplay={{ delay: 5000 }} // Tự động chuyển slide sau 3 giây>
                                >
                                    {item.url.map((item, index) => {
                                        return (
                                            <SwiperSlide key={index}>
                                                <img src={item} alt="img" style={{ width: '100%', height: '400px', borderRadius: '8px' }} />
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                            </div>
                            <div className={styles.bodyContent}>
                                <div className={styles.detail}>
                                    <div className={styles.title}>
                                        <h2>
                                            Deluxe Room
                                        </h2>
                                        <p><span>199$</span>/per night</p>
                                    </div>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique pariatur ducimus
                                        dolore doloribus quaerat ad labore voluptas, atque quos fugit! Doloribus odio illum natus
                                        accusamus debitis necessitatibus repellendus quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique pariatur ducimus
                                        dolore doloribus quaerat ad labore voluptas, atque quos fugit! Doloribus odio illum natus
                                        accusamus debitis necessitatibus repellendus quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique pariatur ducimus
                                        dolore doloribus quaerat ad labore voluptas, atque quos fugit! Doloribus odio illum natus
                                        accusamus debitis necessitatibus repellendus quae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique pariatur ducimus
                                        dolore doloribus quaerat ad labore voluptas, atque quos fugit! Doloribus odio illum natus
                                        accusamus debitis necessitatibus repellendus quae.
                                    </p>
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
                                                    display: 'flex'
                                                }
                                            }}
                                        />
                                        <Button text="CHECK AVAILABILITY" styles={{
                                            root: {
                                                fontFamily: 'Ubuntu, sans-serif'
                                            },
                                            rootHovered: {
                                                backgroundColor: "#DFAA5B",
                                            },
                                        }} />
                                    </form>
                                </div>
                            </div>
                        </>
                    )
                }
            )}
        </LayoutComponent >
    )
}