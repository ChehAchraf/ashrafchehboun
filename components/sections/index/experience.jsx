// Core packages
import Image from "next/image";

// Section structure
import Section from "../../structure/section";
import Container from "../../structure/container";

// Section general blocks
import SectionTitle from "../../blocks/section.title.block";
import SectionGridBg from "../../blocks/section.grid.block";

// Section specific blocks
import BadgesBlock from "../../blocks/about.badges.block";
import CopyBlock from "../../blocks/about.copy.block";

// Section scss
import about from "../../../styles/sections/index/about.module.scss";

/**
 * Section: Technical
 * Highlight your technical skills with a short blurb about you,
 * Then display the programs you are proficient with and the technologies you use if applicable.
 *
 * @returns {jsx} <Technical />
 */
export default function Technical() {
  return (
    <Section classProp={`${about.section} borderBottom`}>
      <Container spacing={["verticalXXXLrg"]}>
        <SectionTitle
          title="Technical"
          preTitle="Hardskills"
          subTitle="As an aspiring full-stack developer with a backend focus, I architect robust and scalable digital solutions using a diverse set of languages and frameworks."
        />
        <section className={`${about.content} ${about.container}`}>
          <div className={about.copy}>
            <BadgesBlock
              title="Languages I master and use"
              copy="I'm enthusiastic about solving complex problems through code, with a particular focus on backend technologies. From database design to API development and system architecture, I'm eager to tackle challenging projects and continuously improve my skills."
              list={languages}
              block="languages"
              fullContainer="fullContainer"
              icon="server"
              containerClass={about.container}
              headerIcon={about.icon}
            />

            <BadgesBlock
              title="Frameworks I'm mastering"
              copy="As a student developer, I'm constantly expanding my toolkit. I'm familiarizing myself with industry-standard technologies and best practices, focusing on robust backend frameworks and efficient development tools. This list represents the core technologies I'm currently working with and excited to master."
              list={frameworks}
              block="frameworks"
              fullContainer="fullContainer"
              icon="code-branch"
              containerClass={about.container}
              headerIcon={about.icon}
            />

            <BadgesBlock
              title="Tools I use"
              copy="To ensure efficient and effective development, I use a variety of tools that help streamline my workflow and improve productivity."
              list={tools}
              block="tools"
              fullContainer="fullContainer"
              icon="toolbox"
              containerClass={about.container}
              headerIcon={about.icon}
            />

            <CopyBlock
              title="Full-stack foundation with backend passion"
              icon={["fat", "database"]}
              copy="While I'm building a comprehensive full-stack skill set, my true passion lies in backend development. I'm dedicated to creating efficient, scalable, and secure server-side solutions. I'm constantly learning and adapting to stay current with the latest backend technologies and architectural patterns."
              iconClass={about.icon}
              containerClass={about.container}
            />
          </div>
          <div className={`${about.image} ${about.technicalSvg}`}>
            <Image
              src="/img/dataism-24.svg"
              width={477}
              height={1111}
              alt="Data Strings 01 by Colorpong: https://ywft.us/2177b695b"
            />
          </div>
        </section>
      </Container>
      {/* <SectionGridBg gridSize={4}/> */}
    </Section>
  );
}

const languages = [
  { key: "java", name: "Java", type: "devicon" },
  { key: "go", name: "Go", type: "devicon" },
  { key: "c", name: "C", type: "devicon" },
  { key: "python", name: "Python", type: "devicon" },
  { key: "php", name: "PHP", type: "devicon" },
  { key: "typescript", name: "TypeScript", type: "devicon" },
  { key: "javascript", name: "JavaScript", type: "devicon" },
  { key: "mysql", name: "MySQL", type: "devicon" },
  { key: "postgres", name: "Postgres", type: "devicon" },
];

const frameworks = [
  { key: "springboot", name: "Spring Boot", type: "devicon" },
  { key: "laravel", name: "Laravel", type: "devicon" },
  { key: "symfony", name: "Symfony", type: "devicon" },
  { key: "nodejs", name: "NodeJS", type: "devicon" },
  { key: "nextjs", name: "NextJS", type: "devicon" },
  { key: "react", name: "React", type: "devicon" },
  { key: "angular", name: "Angular", type: "devicon" },
];

const tools = [
  { key: "neovim", name: "Neovim", type: "devicon" },
  { key: "vscode", name: "VSCode", type: "devicon" },
  { key: "intellij", name: "IntelliJ", type: "devicon" },
  { key: "lazygit", name: "Lazygit", type: "devicon" },
  { key: "docker", name: "Docker", type: "devicon" },
  { key: "linux", name: "Linux", type: "devicon" },
  { key: "git", name: "Git", type: "devicon" },
  { key: "notion", name: "Notion", type: "devicon" },
  { key: "jira", name: "Jira", type: "devicon" },
  { key: "postman", name: "Postman", type: "devicon" },
];
