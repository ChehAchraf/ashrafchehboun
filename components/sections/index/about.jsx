import Image from "next/image";
import Section from "../../structure/section";
import Container from "../../structure/container";
import SectionTitle from "../../blocks/section.title.block";
import BadgesBlock from "../../blocks/about.badges.block";
import CopyBlock from "../../blocks/about.copy.block";
import about from "../../../styles/sections/index/about.module.scss";

export default function About() {
  return (
    <Section classProp={about.section}>
      <Container spacing={["verticalXXXLrg"]}>
        <SectionTitle
          title="About Me"
          preTitle="Synopsis"
          subTitle="Aspiring Full Stack Developer with a Backend Focus: Architecting robust systems and scalable solutions. Passionate about innovating server-side technologies and crafting efficient data flows. Committed to continuous learning in software architecture and performance optimization. As a student at YouCode, a web development school where we learn by doing and teaching, I've gained practical experience and deepened my understanding of web development through hands-on projects and peer collaboration."
        />
        <section className={about.content}>
          <div className={about.image}>
            <img src="/img/me.png" alt="Ayman el maini photo" />
          </div>
          <div className={about.copy}>
            <CopyBlock
              title="Softskills and Planning Expertise"
              containerClass={about.container}
              iconClass={about.icon}
              icon={["fat", "ear-listen"]}
              copy="As an aspiring Full Stack Developer with a backend focus, I am passionate about creating robust architectures and implementing efficient, scalable solutions. I thrive in team collaborations, excel in time management, and continuously innovate to optimize performance and user experience."
            />
            <BadgesBlock
              title="Methodologies and Strategies"
              containerClass={about.container}
              list={methods}
              fullContainer="fullContainer"
              block="methods"
              icon="fingerprint"
              copy="Research and planning are integral parts of my development process. I enjoy crafting meticulous database designs, architecting scalable server solutions, and implementing secure and efficient API development practices. My approach integrates agile methodologies and version control to ensure streamlined project execution and delivery."
              headerIcon={`${about.icon}`}
            />
          </div>
        </section>
      </Container>
    </Section>
  );
}

const methods = [
  { key: "database", name: "Database Design", type: "fas" },
  { key: "server", name: "Server Architecture", type: "fas" },
  { key: "code", name: "API Development", type: "fas" },
  { key: "project-diagram", name: "System Design", type: "fas" },
  { key: "shield-alt", name: "Security Implementation", type: "fas" },
  { key: "tachometer-alt", name: "Performance Optimization", type: "fas" },
  { key: "microchip", name: "Microservices", type: "fas" },
  { key: "cubes", name: "Scalable Solutions", type: "fas" },
  { key: "sync", name: "Agile Methodologies", type: "fas" },
  { key: "code-branch", name: "Version Control", type: "fas" },
];
