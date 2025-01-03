import Card from "../Resuable/Card";
import pr2 from "/pr2.png";
import pr3 from "/pr3.png";
import pr4 from "/pr4.png";

const ProjectGallery = () => {
  const d = [
    {
      index: 1,
      title: "Farm Financer",
      img: "/bg.jpg",
      desc: `A one stop solution to deal with all the financial hassales for farmers`,
    },
    {
      index: 2,
      title: "Athena Data Analytics",
      img: "/pr2.png",
      desc: `Leveraging machine learning to transform big data into actionable insights for businesses`,
    },
    {
      index: 3,
      title: "Green Horizon Energy",
      img: "/pr3.png",
      desc: `Developing sustainable, renewable energy solutions to combat climate change`,
    },
    {
      index: 4,
      title: "Urban Agriculture Revolution",
      img: "/pr4.png",
      desc: `Implementing vertical farming techniques to create food security in urban environments`,
    },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {d.map((e) => {
        return <Card key={e.index} title={e.title} img={e.img} desc={e.desc} />;
      })}
    </div>
  );
};

export default ProjectGallery;
