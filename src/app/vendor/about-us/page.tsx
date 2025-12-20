import SubTitle from "@/components/reusable/title";
import React from "react";

const aboutData = [
  {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet consectetur. Malesuada aliquet lectus tempus nunc eu netus ac. ",
    description:
      "Laoreet orci molestie dui quis mi est. Maecenas ullamcorper enim aliquet in cras. Sem a aenean cursus tincidunt mauris etiam elit integer. Aliquet venenatis vitae velit non. Suspendisse ac aliquet nascetur sem tristique neque sit fringilla. Eros malesuada tempor volutpat et vitae arcu proin sollicitudin. Pellentesque habitant malesuada tortor justo non cum ligula. Non et cras nibh donec. Facilisis duis sed non egestas lectus scelerisque sed blandit nibh. Fermentum blandit convallis fringilla nisl. Fermentum commodo tellus eu a adipiscing nisl. In pellentesque scelerisque tristique tempor massa. Consectetur vehicula ut suspendisse urna a sed est purus facilisi. Tempor ipsum ut viverra nec diam fusce ipsum varius senectus. Non suspendisse mauris proin sed enim ultrices. Pellentesque feugiat mattis risus id egestas leo cras. Tincidunt dictum nunc et quam. Nunc id pulvinar fermentum posuere ullamcorper blandit mi tempus magna. Nunc rhoncus nibh lorem mattis. Consectetur eget arcu viverra blandit tincidunt interdum in ullamcorper. Orci convallis rhoncus arcu accumsan. ",
  },
  {
    id: 2,
    title: "Malesuada in dolor faucibus ultrices bibendum leo semper.",
    description:
      "Et ornare viverra ornare egestas bibendum sed id arcu. Urna ut vestibulum in non dolor fusce. Risus duis cras sit placerat vitae interdum semper. Arcu phasellus nunc lectus elit. Tellus viverra vestibulum lobortis habitant viverra tellus leo condimentum. Tincidunt morbi odio aliquam tempus amet quis magna. Molestie amet ultrices nulla consequat praesent habitant sed auctor. Rhoncus amet ut sodales ut. Quam purus enim lectus augue. Ultrices ipsum lacus pulvinar mauris nunc. Facilisis euismod elit amet adipiscing accumsan. Cras tristique pharetra purus consequat. Nibh pellentesque arcu id platea. Quis quis tristique blandit ornare congue pretium. Fusce amet est et erat. Commodo in urna posuere mauris. Blandit mauris ut quisque eget. Facilisi odio sit mi aliquet. Integer elementum et leo molestie. Volutpat adipiscing sem diam suspendisse nisi eros ullamcorper venenatis. Ornare viverra fusce ullamcorper in nascetur. Ac eget aenean gravida diam tempus. In felis hendrerit diam et libero mi. Nunc adipiscing enim non ut imperdiet nulla lacus. Quis faucibus ut aliquam eget amet cras. Cursus orci sit vitae id ut. Iaculis ut amet risus sed condimentum porttitor turpis mattis ac. Penatibus porta id proin egestas nulla. Posuere donec elementum arcu fringilla et suscipit cras.",
  },
  {
    id: 3,
    title:
      " Sit tellus faucibus pharetra aliquam suscipit ut suspendisse arcu.",
    description:
      "In sagittis amet tristique tristique elementum. Tincidunt nibh mauris tincidunt nibh varius fames massa amet nec. Nulla a sed ac magna arcu ligula pretium scelerisque. Elit proin dignissim urna pharetra tortor arcu senectus. Neque amet maecenas hendrerit amet commodo. Mauris donec tristique in in mattis facilisi neque curabitur. Maecenas eros fermentum sapien a senectus. Orci viverra sagittis nulla consectetur dolor. Imperdiet tellus volutpat fusce tristique pharetra turpis commodo. Vivamus nulla elementum quisque faucibus enim ipsum semper platea. Morbi rhoncus bibendum rhoncus ut. Mattis justo pretium nulla consectetur hendrerit posuere facilisis sit a. Elementum scelerisque rutrum integer quis bibendum. A massa ultricies aliquet sollicitudin. Maecenas donec pharetra mauris ultricies amet ac at. Odio facilisis id aliquet pharetra vel.",
  },
];

const AboutUs = () => {
  return (
    <div className="container px-4 pt-[35px] xl:pt-[48px] pb-10">
      <div className="pb-8">
        <SubTitle svg={false} text="About us" />
      </div>

      <div className="space-y-8">
        {aboutData?.map((item) => (
          <div key={item.id}>
            <h1 className="text-[20px] xl:text-[28px] font-bold">
              {item.title}
            </h1>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
