import SubTitle from "@/components/reusable/title";
import { Button } from "@/components/ui";
import { ArrowBlackRightIcon } from "@/icon";
import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import news1 from "@/assets/news1.png";
import news2 from "@/assets/news2.png";
import news3 from "@/assets/news3.png";
import news4 from "@/assets/news4.png";
import news5 from "@/assets/news5.png";

interface NewDataProps {
  id: number;
  image: StaticImageData;
  title: string;
  postData: string;
}

// Sample service data
const NewData: NewDataProps[] = [
  {
    id: 1,
    title: "News title goes here",
    postData: "20th November, 2025",
    image: news1,
  },
  {
    id: 2,
    title: "News title goes here",
    postData: "20th November, 2025",

    image: news2,
  },
  {
    id: 3,
    title: "News title goes here",
    postData: "20th November, 2025",

    image: news3,
  },
  {
    id: 4,
    title: "News title goes here",
    postData: "20th November, 2025",

    image: news4,
  },
  {
    id: 5,
    title: "News title goes here",
    postData: "20th November, 2025",

    image: news5,
  },
  {
    id: 6,
    title: "News title goes here",
    postData: "20th November, 2025",

    image: news2,
  },
];

const BlogPage = () => {
  return (
    <div className="container px-4 pt-[35px] xl:pt-[48px] pb-10">
      <div className="pb-8">
        <SubTitle svg={false} text="Blogs" />
      </div>

      <main className="">
        {/* NewData Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {NewData.map((item) => (
            <div
              key={item.id}
              className="bg-secondary p-4 rounded-figma-sm! overflow-hidden  "
            >
              {/* Service Image */}
              <div className="relative w-full xl:h-[390px] bg-secondary overflow-hidden">
                <Image
                  src={item.image}
                  alt={"photo"}
                  fill
                  className="object-cover rounded-figma-sm! transition duration-300"
                />
              </div>

              {/* Service Info */}
              <div className="p-4">
                {/* Category */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className=" ">Posted on: {item.postData}</p>
                  </div>

                  <span className="text-[#000000] font-bold text-[16px] xl:text-[20px]">
                    <Link href={`/blogs/${item.id}`}>
                      <Button
                        className=" bg-transparent border border-primary text-black font-bold"
                        size={"lg"}
                        icon={false}
                      >
                        Read now
                        <ArrowBlackRightIcon className="text-black" />
                      </Button>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
