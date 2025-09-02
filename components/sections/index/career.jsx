// Core packages
import Image from "next/image";

import Badges from "../../utils/badge.list.util";

// Section structure
import Section from "../../structure/section";
import Container from "../../structure/container";

// Section general blocks
import SectionTitle from "../../blocks/section.title.block";
import SectionGridBg from "../../blocks/section.grid.block";

// Career scss
import career from "../../../styles/sections/index/career.module.scss";

/**
 * Section: Career
 *
 * @returns {jsx} <Career />
 */
export default function Career() {
  return (
    <Section classProp={`${career.section} borderBottom`}>
      <Container spacing={["verticalXXXLrg"]}>
        <SectionTitle title="Experience" preTitle="Career" subTitle="" />
        <section className={career.area}>
          <article className={career.companyPositions}>
            <div className={career.position}>
              <div className={career.positionContent}>
                <span className={career.positionHeader}>
                  <h3>Full Stack Developer Intern at Prometi</h3>
                  <h4>Full-time</h4>
                  <h4>May 2025 - July 2025</h4>
                  <h5>Morocco, Casablanca</h5>
                </span>
                <p>
                  As a full stack developer intern at Prometi, I contributed to
                  the development of a project management system using Laravel for backend development
                  and Blade for frontend development. My responsibilities
                  included implementing features, and ensuring
                  the applications met functional requirements and design
                  specifications.
                </p>
                <p>
                  During this internship, I gained practical experience in
                  software development lifecycle processes, including testing. I
                  collaborated with team members to identify and address
                  technical challenges, contributing to the enhancement of user
                  experience and operational efficiency within the applications.
                </p>
                <p>Some key contributions during my internship include:</p>
                <ul className={career.list}>
                  <li>
                    Implemented backend features for user authentication and data
                    management
                    <span className={career.subList}>
                      <span className={career.bullet}></span>Enhanced security
                      and data integrity
                    </span>
                  </li>
                  <li>
                    Developed frontend components for customer-facing features
                    <span className={career.subList}>
                      <span className={career.bullet}></span>Improved user
                      interface responsiveness
                    </span>
                  </li>
                </ul>
                <Badges
                  list={foodeals}
                  block="stack"
                  fullContainer="fullContainer"
                />
              </div>
              <div className={career.positionAlt}></div>
            </div>
          </article>

          <article className={career.companyPositions}>
            <div className={career.position}>
              <div className={career.positionContent}>
                <span className={career.positionHeader}>
                  <h3>
                    Full Stack Developer Freelancer
                  </h3>
                  <h4>Full-time</h4>
                  <h4>May 2019 - Present</h4>
                  <h5>On many platforms</h5>
                </span>
                <p>
                  As a Full Stack Developer freelancer,
                  I contributed to building solutions for client companies,
                  including applications and websites. My role involved both
                  frontend and backend development tasks. On the frontend, I
                  utilized technologies like HTML, CSS, JavaScript, and Blade
                  CSS to create responsive and user-friendly interfaces. For
                  backend development, I worked extensively with Laravel and
                  PHP, django and flask integrating Postgres or MySQL/sqlite databases to ensure efficient data
                  handling and management.
                </p>
                <p>
                  Throughout this freelancing, I actively participated in agile
                  development processes, collaborating closely with frontend
                  developers and designers to integrate frontend components with
                  backend functionalities. This experience enhanced my skills in
                  full stack development, API development, and database
                  optimization.
                </p>
                <Badges
                  list={icf}
                  block="stack"
                  fullContainer="fullContainer"
                />
              </div>
              <div className={career.positionAlt}></div>
            </div>
          </article>
        </section>
      </Container>
    </Section>
  );
}

const foodeals = [
  { key: "java", name: "Java", type: "devicon" },
  { key: "typescript", name: "TypeScript", type: "devicon" },
  { key: "javascript", name: "JavaScript", type: "devicon" },
  { key: "spirngboot", name: "Spring-boot", type: "devicon" },
  { key: "nodejs", name: "NodeJS", type: "devicon" },
  { key: "angular", name: "Angular", type: "devicon" },
  { key: "git", name: "Git", type: "devicon" },
  { key: "mysql", name: "MySQL", type: "devicon" },
  { key: "postgres", name: "Postgres", type: "devicon" },
  { key: "docker", name: "Docker", type: "devicon" },
];

const icf = [
	{ key: "php", name: "Php", type: "devicon" },
	{ key: "laravel", name: "Laravel", type: "devicon" },
	{ key: "django", name: "Django", type: "devicon" },
	{ key: "flask", name: "Flask", type: "devicon" },
	{ key: "vuejs", name: "VueJS", type: "devicon" },
	{ key: "html5", name: "Html", type: "devicon" },
	{ key: "css3", name: "CSS 3", type: "devicon" },
	{ key: "mysql", name: "MySQL", type: "devicon" },
	{ key: "git", name: "Git", type: "devicon" },
    ];
    
