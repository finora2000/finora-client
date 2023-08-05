import { AppState } from "@/store/store";
import {
  Avatar,
  Box,
  Button,
  Flex,
  NavLink,
  Navbar,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const AppNavbar = () => {
  const router = useRouter();
  return (
    <Navbar
      height={"max"}
      p="xs"
      width={{ base: "80", md: "300" }}
      // sx={{
      //   "@media (max-width: 40em)": {
      //     width: "12vh",
      //   },
      // }}
    >
      <Flex direction={"column"} gap="md">
        {[
          { text: "Portfolio", link: "/portfolio" },
          { text: "My Investments", link: "/investments" },
          { text: "Goals", link: "/goals" },
          { text: "Deposits", link: "/deposits" },
        ].map((i) => (
          <Link href={i.link} style={{ width: "100%" }}>
            <Button
              w="100%"
              variant="light"
              color={"green"}
              bg={
                router.pathname.includes(i.link)
                  ? "green"
                  : "rgba(203, 220, 203,0.25)"
              }
              sx={{
                height: "50px",

                boxShadow: "2px 2px 5px rgba(0, 0, 0,0.15)",
                color: router.pathname.includes(i.link) ? "#fff" : "",
                "&:hover": {
                  backgroundColor: router.pathname.includes(i.link)
                    ? "#3eab51"
                    : "",
                },
                "@media (max-width: 980px)": {
                  // boxShadow: "0px 0px 0px rgba(0, 0, 0,0)",
                  // backgroundColor: "white",
                  // color: "green",
                },
              }}
            >
              <Text
                sx={{
                  "@media (max-width: 980px)": {
                    display: "none",
                  },
                }}
              >
                {i.text}
              </Text>
              <Text
                display={"none"}
                sx={{
                  "@media (max-width: 980px)": {
                    display: "block",
                  },
                }}
              >
                {i.text[0]}
              </Text>
            </Button>
          </Link>
        ))}
      </Flex>
    </Navbar>
  );
};

export default AppNavbar;
