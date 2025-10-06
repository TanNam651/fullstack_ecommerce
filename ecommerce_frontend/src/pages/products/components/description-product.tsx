import React, {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Minus, Plus} from "lucide-react";

interface DescriptionProductProps {
  title: string;
  content: string;
}

export const DescriptionProduct: React.FC<DescriptionProductProps> = ({
                                                                        title,
                                                                        content
                                                                      }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  return (
    <>
      <div className="uppercase font-bold text-base mb-4">
        <h2>{title}</h2>
      </div>
      <div className="">
        <div className={cn("description-content block overflow-hidden", showMore ? "h-auto" : "h-[525px]")}
             dangerouslySetInnerHTML={{__html: content}}
        >
          {/*{content}*/}
          {/*<div>*/}
          {/*  <h2>Laptop Gaming Lenovo LOQ 15ARP9 83JC00HXVN – Laptop chuẩn màn hình 100% sRGB</h2>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      Hiệu năng ấn tượng với CPU AMD Ryzen R5 7235HS + GPU RTX 3050 6GB cân các tác vụ văn phòng, chiến game*/}
          {/*      mượt mà*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      Thiết kế thanh lịch và mạnh mẽ, các đường góc cạnh được gia công tỉ mỉ*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      Màn hình 15.6 inch FHD cùng tần số quét 144Hz chuẩn 100% sRGB tuyệt đẹp, bắt kịp mọi thao tác của đối*/}
          {/*      thủ*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      Dung lượng RAM 12GB, bạn có thể nâng cấp tối đa Up to 32GB DDR5-4800 để chạy mượt mà hơn*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      Thời lượng pin trung bình với mức dung lượng 60Whr*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      Bàn phím keyboard tích hợp đèn White Backlit, dễ dàng làm việc và giải trí*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      Giá bán 18,890,000₫*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*  <p>*/}
          {/*    <strong>*/}
          {/*      Laptop Gaming Lenovo LOQ 15ARP9 83JC00HXVN*/}
          {/*    </strong>*/}
          {/*    là mẫu laptop gaming sở hữu hiệu năng mạnh mẽ, được tối ưu để mang tới trải nghiệm chơi game tốt nhất cho*/}
          {/*    người dùng. Đi kèm là khả năng xử lý đồ họa xuất sắc, chất lượng hình ảnh vượt trội để phục vụ cho game*/}
          {/*    thủ*/}
          {/*    và nhà sáng tạo. Thiết kế thân thiện với concept cùng giá bán 18,890,000₫ sẽ phù hợp với cả người dùng phổ*/}
          {/*    thông thay vì chỉ game thủ.*/}
          {/*  </p>*/}
          {/*  <h2>*/}
          {/*    Thiết kế đầy tinh tế và thanh lịch*/}
          {/*  </h2>*/}
          {/*  <ul>*/}
          {/*    <li>*/}
          {/*      <strong>*/}
          {/*        Kiểu dáng cuốn mắt:*/}
          {/*      </strong>*/}
          {/*      Máy được hoàn thiện với các góc cạnh được làm bo tròn một cách tỉ mỉ, tạo nên một vẻ ngoài đẹp mắt và*/}
          {/*      sang*/}
          {/*      trọng. Mặt A được phủ lớp sơn màu Storm Grey độc đáo, tạo nên một sự thu hút mạnh mẽ từ cái nhìn đầu*/}
          {/*      tiên.*/}
          {/*      Điểm nhấn của thiết kế là logo mới được đặt ở góc cạnh, không chỉ làm tăng tính nhận diện thương hiệu mà*/}
          {/*      còn tạo nên một điểm nhấn độc đáo trên máy tính*/}
          {/*    </li>*/}
          {/*    <li>*/}
          {/*      <strong>*/}
          {/*        Hệ thống tản nhiệt thông minh*/}
          {/*      </strong>*/}
          {/*      <ul>*/}
          {/*        <li>*/}
          {/*          Tản nhiệt mát mẻ với sự hiện diện của 4 ống dẫn nhiệt, mang đến khả năng tản nhiệt nhanh chóng và*/}
          {/*          hiệu*/}
          {/*          quả cao cho các thành phần bên trong máy*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          Hệ thống tản nhiệt được thiết kế với quạt kép bố trí theo hướng ngược nhau, ngăn chặn hiệu ứng của*/}
          {/*          luồng khí nóng thổi vào vùng làm việc của người dùng. Đồng thời đưa khí mát vào bên trong và không*/}
          {/*          khí*/}
          {/*          nóng được trực tiếp thổi ra ngoài, giúp giảm nhiệt độ của laptop xuống thấp hơn khoảng 2 độ C và*/}
          {/*          giảm*/}
          {/*          độ ồn lên đến 2dB so với thế hệ trước*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </li>*/}
          {/*  </ul>*/}
          {/*</div>*/}
        </div>
        <div
          className={cn("relative mt-4", !showMore ? "before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-full before:h-32 before:bg-[linear-gradient(180deg,_rgba(255,255,255,0)_17%,_#fff_93.12%)]" : "")}>
          <Button
            variant="secondary"
            className="w-full cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? (
              <>
                <Minus className="h-4 w-4" strokeWidth={3}/>
                Ẩn bớt
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" strokeWidth={3}/>
                Xem thêm
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  )
}