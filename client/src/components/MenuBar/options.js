// MUI icons
import HomeIcon from "@mui/icons-material/Museum";
import SkillIcon from "@mui/icons-material/LocalLibrary";
import CertificationIcon from "@mui/icons-material/School";
import HobbyIcon from "@mui/icons-material/Star";
import ContactIcon from "@mui/icons-material/ContactMail";

const menuOptions = [
  {
    label: "menu.home",
    path: "/",
    icon: <HomeIcon color="secondary" />,
  },
  {
    label: "menu.skills",
    path: "/skills",
    icon: <SkillIcon color="secondary" />,
  },
  {
    label: "menu.certifications",
    path: "/certifications",
    icon: <CertificationIcon color="secondary" />,
  },
  {
    label: "menu.jobs",
    path: "/jobs",
    icon: <HobbyIcon color="secondary" />,
  },
  {
    label: "menu.hobbies",
    path: "/hobbies",
    icon: <HobbyIcon color="secondary" />,
  },
  {
    label: "menu.contacts",
    path: "/contacts",
    icon: <ContactIcon color="secondary" />,
  },
];

export default menuOptions;
