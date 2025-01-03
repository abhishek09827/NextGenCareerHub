import Card from "../Resuable/Card";

const JobGallery = () => {
  const d = [
    {
      index: 1,
      title: "Project 1",
      img: "/bg.jpg",
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
        pariatur, nihil ea exercitationem, repellat nulla deleniti, tempore
        accusamus voluptatum impedit voluptatibus cupiditate? Ea magnam
        officiis expedita a incidunt autem maxime amet saepe corporis
        distinctio!`,
    },
    {
      index: 2,
      title: "Project 2",
      img: "/bg.jpg",
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
        pariatur, nihil ea exercitationem, repellat nulla deleniti, tempore
        accusamus voluptatum impedit voluptatibus cupiditate? Ea magnam
        officiis expedita a incidunt autem maxime amet saepe corporis
        distinctio!`,
    },
    {
      index: 3,
      title: "Project 3",
      img: "/bg.jpg",
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
        pariatur, nihil ea exercitationem, repellat nulla deleniti, tempore
        accusamus voluptatum impedit voluptatibus cupiditate? Ea magnam
        officiis expedita a incidunt autem maxime amet saepe corporis
        distinctio!`,
    },
    {
      index: 4,
      title: "Project 4",
      img: "/bg.jpg",
      desc: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
          pariatur, nihil ea exercitationem, repellat nulla deleniti, tempore
          accusamus voluptatum impedit voluptatibus cupiditate? Ea magnam
          officiis expedita a incidunt autem maxime amet saepe corporis
          distinctio!`,
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      {d.map((e) => {
        return <Card key={e.index} title={e.title} desc={e.desc} />;
      })}
    </div>
  );
};

export default JobGallery;
