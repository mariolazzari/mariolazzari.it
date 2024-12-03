import { Certification } from "@/types/Certification";
import { Comparator } from "@/types/Comparator";

const certifications: Certification[] = [
  {
    title: "Beginner's TypeScript",
    date: "2024-03-21T00:00:00.000Z",
    url: "https://res.cloudinary.com/total-typescript/image/upload/v1710970757/certificate/881432f4-b588-4e9d-b47b-0eec6f3220d7/beginners-typescript.png",
    imagePath: "/certifications/begin-ts.png",
  },
  {
    title: "React with TypeScript",
    date: "2024-03-20T00:00:00.000Z",
    url: "https://res.cloudinary.com/total-typescript/image/upload/v1710883347/certificate/881432f4-b588-4e9d-b47b-0eec6f3220d7/react-with-typescript.png",
    imagePath: "/certifications/react-with-ts.png",
  },
  {
    title: "Solving TypeScript errors",
    date: "2024-03-17T00:00:00.000Z",
    url: "https://res.cloudinary.com/total-typescript/image/upload/v1710679571/certificate/881432f4-b588-4e9d-b47b-0eec6f3220d7/solving-typescript-errors.png",
    imagePath: "/certifications/solving-ts-errors.png",
  },
  {
    title: "Zod",
    date: "2024-03-15T00:00:00.000Z",
    url: "https://res.cloudinary.com/total-typescript/image/upload/v1710511491/certificate/881432f4-b588-4e9d-b47b-0eec6f3220d7/zod.png",
    imagePath: "/certifications/zod.png",
  },
  {
    title: "Foundational C# with Microsoft",
    date: "2024-02-27T00:00:00.000Z",
    url: "https://www.freecodecamp.org/certification/mariolazzari/foundational-c-sharp-with-microsoft",
    imagePath: "/certifications/cs-fcc.png",
  },
  {
    title: "NextJS: the complete guide",
    date: "2024-02-13T00:00:00.000Z",
    url: "https://www.udemy.com/certificate/UC-767b8032-2840-4c94-8a92-831453f31ba3/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com",
    imagePath: "/certifications/nextjs-sg.jpg",
  },
  {
    title: "MongoDB Aggregation pipeline",
    date: "2024-01-31T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/1013cc2a1edd4e591658bacacb18778e3524304701c992100b8301685f5ff52b",
    imagePath: "/certifications/mongo-agg-linkedin.png",
  },
  {
    title: "Using MongoDB with Node.js",
    date: "2024-01-28T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/768b50a721cbb3232a4557b463dcafd459afd042769cfc0c614b7f64349125c1",
    imagePath: "/certifications/mongo-node-linkedin.png",
  },
  {
    title: "Faster NodeJS APIs",
    date: "2024-01-15T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/0b260ad4121d8c41368a2f0ec6e6da7d893f5e2d163622718697f3d3c4ec9438",
    imagePath: "/certifications/node-api-ts-linkedin.png",
  },
  {
    title: "PostgreSQL: advanced queries",
    date: "2024-01-14T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/f29a034e5a7a4312b0c51c2e342b8cd0cf032dfe62c8ed704a78dc87c99fd2b2",
    imagePath: "/certifications/pg-advanced-linkedin.png",
  },
  {
    title: "PostgreSQL essential training",
    date: "2024-01-11T00:00:00.000Z",
    url: "",
    imagePath: "/certifications/pg-essential-linkedin.png",
  },
  {
    title: "Redis essential training",
    date: "2024-01-08T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/3013f49f45946662cbfe823ceea0b21d4b49fb830d0aef32b2bf9f7ab2f97ff7",
    imagePath: "/certifications/redis-essential-linkedin.png",
  },
  {
    title: "Design patterns in NodeJS",
    date: "2024-01-06T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/3c2ef889de05f32b499c3b44739b9e9f83e07f0d20d9eb000476302229e8b949",
    imagePath: "/certifications/dp-node-linkedin.png",
  },
  {
    title: "Advanced NodeJS",
    date: "2024-01-04T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/9d28f48d8454a52410215f9fdd2f27288c3333debacdaf021934277202ae69cb",
    imagePath: "/certifications/adv-node-linkedin.png",
  },
  {
    title: "Rust for JavaScript developers",
    date: "2024-01-03T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/b0032105be912adf6420366167472cd8688b91cf9042b27765a7e1b5178efc26",
    imagePath: "/certifications/linkedin-rust-js-dev.png",
  },
  {
    title: "TSQL introduction",
    date: "2023-11-11T00:00:00.000Z",
    url: "https://learn.microsoft.com/api/achievements/share/it-it/MarioLazzari-9041/X2P3EF5Y?sharingId=D7AF38F33D961213",
    imagePath: "/certifications/tsql-mslearn.jpg",
  },
  {
    title: "JavaScript with NodeJs",
    date: "2023-11-05T00:00:00.000Z",
    url: "https://learn.microsoft.com/api/achievements/share/it-it/MarioLazzari-9041/X2PBDA2Y?sharingId=D7AF38F33D961213",
    imagePath: "/certifications/nodejs-mslearn.jpg",
  },
  {
    title: "JavaScript with TypeScript",
    date: "2023-11-05T00:00:00.000Z",
    url: "https://learn.microsoft.com/api/achievements/share/it-it/MarioLazzari-9041/YVPW3MBR?sharingId=D7AF38F33D961213",
    imagePath: "/certifications/ts-mslearn.jpg",
  },
  {
    title: "Back End dev & API",
    date: "2023-09-20T00:00:00.000Z",
    url: "https://www.freecodecamp.org/certification/mariolazzari/back-end-development-and-apis",
    imagePath: "/certifications/fcc-backend.png",
  },
  {
    title: "Front End libraries",
    date: "2023-09-15T00:00:00.000Z",
    url: "https://www.freecodecamp.org/certification/mariolazzari/front-end-development-libraries",
    imagePath: "/certifications/fcc-frontend.png",
  },
  {
    title: "Algorithms & Data Structure",
    date: "2023-09-07T00:00:00.000Z",
    url: "https://www.freecodecamp.org/certification/mariolazzari/javascript-algorithms-and-data-structures",
    imagePath: "/certifications/fcc-algo.png",
  },
  {
    title: "Responsive Web Design",
    date: "2023-09-05T00:00:00.000Z",
    url: "https://www.freecodecamp.org/certification/mariolazzari/responsive-web-design",
    imagePath: "/certifications/fcc-responsive.png",
  },
  {
    title: "Complete React Native ZTM",
    date: "2023-08-05T00:00:00.000Z",
    url: "https://www.udemy.com/course/complete-react-native-mobile-development-zero-to-mastery-with-hooks/",
    imagePath: "/certifications/react-native-ztm.jpeg",
  },
  {
    title: "Full stack developer",
    date: "2023-01-28T00:00:00.000Z",
    url: "https://www.linkedin.com/posts/mario-lazzari_become-a-full-stack-web-developer-learning-activity-7025158079772012544--6Fr?utm_source=share&utm_medium=member_desktop",
    imagePath: "/certifications/fullstack.jpg",
  },
  {
    title: "DevOps foundations",
    date: "2023-01-28T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/49c2677b15aac433d2a99600a91d22f351dc930d139052e365edc549bc2a27eb",
    imagePath: "/certifications/devops.jpg",
  },
  {
    title: "SQL essential training",
    date: "2023-01-26T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/ff22af15d96d51e9a76dea5e60784f77e78ba6864e6e9b29270ff80b939b0960",
    imagePath: "/certifications/sql-essential.jpg",
  },
  {
    title: "Learning REST",
    date: "2023-01-24T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/e9c233a5cb4cf98fee68d7b3a76fc6a2e4ba44cf6a7c622abcf2413d18f04239",
    imagePath: "/certifications/learning-rest.jpg",
  },
  {
    title: "NoSQL essential training",
    date: "2023-01-23T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/e9c7040338c46b1b61a1e2db1130168330874f70c01f951d0e32e47fad264e4c",
    imagePath: "/certifications/nosql-essential.jpg",
  },
  {
    title: "NodeJS essential training",
    date: "2023-01-21T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/adb6226b8d16c432ad8d86d6c4a8b2093854d5c83f63431550bfbf888b8c6445",
    imagePath: "/certifications/node-essential.jpg",
  },
  {
    title: "React essential training",
    date: "2023-01-21T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/1c60df5061e70e3957ab0989827ce4138fe027ed4faca408727df79b9d777481",
    imagePath: "/certifications/react-essential.jpg",
  },
  {
    title: "Git essential training",
    date: "2023-01-20T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/c9981f1d36a45b8686652b806c440b547caf4919632c0d0c657926f22633933a",
    imagePath: "/certifications/git-essential.jpg",
  },
  {
    title: "Learnig ES6",
    date: "2023-01-17T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/87a6ff43d90c4ff019c9cfe0b1368f68dd07cb322892458370c481460a73c322",
    imagePath: "/certifications/es6.jpg",
  },
  {
    title: "Search tech for web",
    date: "2023-01-16T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/cf105b3f5d2d29177a37f5033fd9018105e4f2a974efa709fe6467d44c7b5806",
    imagePath: "/certifications/search.jpg",
  },
  {
    title: "JavaScript essential training",
    date: "2023-01-15T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/a5e90aaccda7bc2b94606a83273b81c89a3c7a7af00357447c6349e8f976443f",
    imagePath: "/certifications/js-essential.jpg",
  },
  {
    title: "CSS essential training",
    date: "2023-01-10T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/22f02e935e1d91c2b73b5376e21052d73a48f512740adbe98983165d694b5445",
    imagePath: "/certifications/css-essential.jpg",
  },
  {
    title: "Docker for developers",
    date: "2023-01-04T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/24f40491b57c6a1cc3526246420d67a801d21f41c00f00d2d9621c5eb81bcf59",
    imagePath: "/certifications/docker-dev.jpg",
  },
  {
    title: "HTML essential training",
    date: "2023-01-02T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/70d9dae4dcdddd24ca2f9920ee8ce8878fa9f1716da925c6aebd9f2ce0416888",
    imagePath: "/certifications/html-essential.jpg",
  },
  {
    title: "Learning Redux Toolkit",
    date: "2023-01-01T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/c340e746343b24b022478edb2bd324eade36d1056bb194c3f672b9891bc76c92",
    imagePath: "/certifications/Learning-Redux-Toolkit.jpg",
  },
  {
    title: "TypeScript essential training",
    date: "2022-12-31T00:00:00.000Z",
    url: "https://www.linkedin.com/learning/certificates/6ef64cdb6b283f9f8490ed4bf07f27ee99c3dc400e826aabd2d307464c00cf0e",
    imagePath: "/certifications/ts-essential.jpg",
  },
  {
    title: "Complete React ZeroToMastery",
    date: "2022-09-12T00:00:00.000Z",
    url: "https://www.udemy.com/course/complete-react-developer-zero-to-mastery/",
    imagePath: "/certifications/react-ztm.jpeg",
  },
  {
    title: "Valutazione Linkedin MongoDB",
    date: "2022-09-05T00:00:00.000Z",
    url: "https://www.linkedin.com/skill-assessments/MongoDB/report/",
    imagePath: "/certifications/linkedin-mongo.jpeg",
  },
  {
    title: "Valutazione LinkedIn HTML",
    date: "2022-09-05T00:00:00.000Z",
    url: "https://www.linkedin.com/skill-assessments/HTML/report/",
    imagePath: "/certifications/linkedin-html.png",
  },
  {
    title: "Valutazione Linkedin NodeJS",
    date: "2022-08-28T00:00:00.000Z",
    url: "https://www.linkedin.com/skill-assessments/Node.js/report/",
    imagePath: "/certifications/node-linkedin.jpeg",
  },
  {
    title: "Valutazione Linkedin FrontEnd",
    date: "2022-08-27T00:00:00.000Z",
    url: "https://www.linkedin.com/skill-assessments/Sviluppo%20front-end/report/",
    imagePath: "/certifications/node-linkedin.jpeg",
  },
  {
    title: "JavaScript Unit Testing - The Practical Guide",
    date: "2022-05-15T00:00:00.000Z",
    url: "https://www.udemy.com/course/javascript-unit-testing-the-practical-guide/l",
    imagePath: "/certifications/practical-unit.jpeg",
  },
  {
    title: "LinkedIn CSS Test",
    date: "2022-03-14T00:00:00.000Z",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6909141781993410560/",
    imagePath: "/certifications/linkedin-css.png",
  },
  {
    title: "LinkedIn React Test",
    date: "2022-03-07T00:00:00.000Z",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:6905183181050306561/",
    imagePath: "/certifications/linkedin-react.png",
  },
  {
    title: "Modern Angular Bootcamp",
    date: "2022-01-30T00:00:00.000Z",
    url: "https://www.udemy.com/course/the-modern-angular-bootcamp/learn/lecture/17884260?start=1#overview",
    imagePath: "/certifications/modern-angular-bootcamp.jpeg",
  },
  {
    title: "Data Structures + Algorithms",
    date: "2022-01-22T00:00:00.000Z",
    url: "https://www.udemy.com/course/master-the-coding-interview-data-structures-algorithms/",
    imagePath: "/certifications/code-ztm.jpg",
  },
  {
    title: "Complete NodeJS Dev 2022 GraphQL, MongoDB",
    date: "2022-01-12T00:00:00.000Z",
    url: "https://www.udemy.com/course/complete-nodejs-developer-zero-to-mastery/",
    imagePath: "/certifications/nodejs-ztm.jpeg",
  },
  {
    date: "2021-10-28T00:00:00.000Z",
    imagePath: "/certifications/ts-portfolio.jpeg",
    title: "React and Typescript: Build a Portfolio",
    url: "https://www.udemy.com/course/react-and-typescript-build-a-portfolio-project/learn/lecture/24835582?start=1#overview",
  },
  {
    date: "2021-07-06T00:00:00.000Z",
    imagePath: "/certifications/rn-pratical.jpg",
    title: "React Native pratical guide",
    url: "https://www.udemy.com/course/react-native-the-practical-guide",
  },
  {
    date: "2021-04-29T00:00:00.000Z",
    imagePath: "/certifications/next-dev.jpg",
    title: "Next.js Dev to Deployment",
    url: "https://www.udemy.com/course/nextjs-dev-to-deployment/learn/lecture/26055712?start=0#overview",
  },
  {
    date: "2021-04-13T00:00:00.000Z",
    imagePath: "/certifications/node-red.jpg",
    title: "Full stack Node-Red",
    url: "https://www.udemy.com/course/node-red-1/learn/lecture/14931324?start=0#overview",
  },
  {
    date: "2021-03-21T00:00:00.000Z",
    imagePath: "/certifications/nextjs-complete.jpg",
    title: "Next.js & React - The Complete Guide",
    url: "https://www.udemy.com/course/nextjs-react-the-complete-guide/",
  },
  {
    date: "2020-12-12T00:00:00.000Z",
    imagePath: "/certifications/material-ui.jpg",
    title: "Implement high fidelity design with Materil UI",
    url: "https://www.udemy.com/course/implement-high-fidelity-designs-with-material-ui-and-reactjs",
  },
  {
    date: "2020-12-05T00:00:00.000Z",
    imagePath: "/certifications/pratical-docker.jpg",
    title: "Docker & Kubernates: the pratical guide",
    url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide",
  },
  {
    date: "2020-10-27T00:00:00.000Z",
    imagePath: "/certifications/mern-ecom.jpg",
    title: "MERN eCommerce from scratch",
    url: "https://www.udemy.com/certificate/UC-f4a3a950-cdc6-42b4-9aa7-8f75f6e76b2f/",
  },
  {
    date: "2020-06-15T00:00:00.000Z",
    imagePath: "/certifications/modern-js.jpg",
    title: "Modern JavaScript from the beginning",
    url: "https://www.udemy.com/course/modern-javascript-from-the-beginning/",
  },
  {
    date: "2020-05-27T00:00:00.000Z",
    imagePath: "/certifications/electron.jpg",
    title: "Electron from scratch",
    url: "https://www.udemy.com/course/electron-from-scratch/learn/lecture/20050728#overview",
  },
  {
    date: "2020-05-16T00:00:00.000Z",
    imagePath: "/certifications/modern-html.jpg",
    title: "Modern HTML & CSS",
    url: "https://www.udemy.com/course/modern-html-css-from-the-beginning/learn/lecture/13285438?start=0#overview",
  },
  {
    date: "2020-01-11T00:00:00.000Z",
    imagePath: "/certifications/mern-fullstack.jpg",
    title: "MERN fullstack guide",
    url: "https://www.udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide",
  },
  {
    date: "2019-12-26T00:00:00.000Z",
    imagePath: "/certifications/ts-intro.jpg",
    title: "TypeScript intro",
    url: "https://www.udemy.com/course/typescript/learn/lecture/2718294?start=0#overview",
  },
  {
    date: "2019-12-13T00:00:00.000Z",
    imagePath: "/certifications/react-front.jpg",
    title: "React front to back",
    url: "https://www.udemy.com/course/modern-react-front-to-back",
  },
  {
    date: "2019-12-04T00:00:00.000Z",
    imagePath: "/certifications/node-api.jpg",
    title: "NodeJS API with Express & MongoDB",
    url: "https://www.udemy.com/course/nodejs-api-masterclass",
  },
];

const comparator = (a: Certification, b: Certification): Comparator => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  const diff = dateA.getTime() - dateB.getTime();

  switch (true) {
    case diff < 0:
      return -1;

    case diff > 0:
      return 1;

    default:
      return 0;
  }
};

export const getLastCertifications = (last = 6) =>
  certifications.sort(comparator).reverse().slice(0, last);
